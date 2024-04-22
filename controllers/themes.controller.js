const Theme = require('../models/themes.model')
const Content = require('../models/contents.model')

const addTheme = async (req, res) => {
    try {
        const theme = await Theme.create(req.body)
        const updatedTheme = await Theme.findById(theme._id).populate('contentTypes').populate('author')
        res.status(200).json(updatedTheme)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const listThemes = async (req, res) => {
    try {

        let pipeline = [];

        const searchTerm = req.query.name;
        if (searchTerm) {
            pipeline.push({
                $match: {
                    $or: [
                        {
                            name: { $regex: ".*" + searchTerm + ".*", $options: "i" }
                        }
                    ]
                }
            });
        }

        pipeline.push({
            $lookup: {
                from: 'contenttypes',
                localField: 'contentTypes',
                foreignField: '_id',
                as: 'contentTypes'
            }
        },
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'author',
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    createdAt: 1,
                    image: 1,
                    contentTypes: {
                        $map: {
                            input: '$contentTypes',
                            as: 'contentType',
                            in: {
                                _id: '$$contentType._id',
                                name: '$$contentType.name',
                            }
                        }
                    },
                    author: {
                        $map: {
                            input: '$author',
                            as: 'author',
                            in: {
                                _id: '$$author._id',
                                name: '$$author.name'
                            }
                        }
                    }
                }
            })


        const themes = await Theme.aggregate(pipeline);

        res.status(200).json(themes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const GetThemeDetail = async (req, res) => {
    try {
        const { id } = req.params
        const theme = await Theme.findById(id).populate('contentTypes').populate('author')

        res.status(200).json(theme)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateTheme = async (req, res) => {
    try {
        const { id } = req.params
        const theme = await Theme.findByIdAndUpdate(id, req.body)

        if (!theme) return res.status(404).json({ message: 'Theme not found' })

        const updatedTheme = await Theme.findById(id).populate('contentTypes')
        res.status(200).json(updatedTheme)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    addTheme,
    listThemes,
    GetThemeDetail,
    updateTheme
}