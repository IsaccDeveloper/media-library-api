const Content = require('../models/contents.model')
const Theme = require('../models/themes.model')
const contentType = require('../models/contentTypes.model')

const addContent = async (req, res) => {
    try {
        const content = await Content.create(req.body)
        res.status(200).json(content)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const listContents = async (req, res) => {
    try {
        let pipeline = [];

        const searchTerm = req.query.title;
        if (searchTerm) {
            pipeline.push({
                $match: {
                    $or: [
                        {
                            title: { $regex: ".*" + searchTerm + ".*", $options: "i" }
                        }
                    ]
                }
            });
        }

        pipeline.push(
            {
                $group: {
                    _id: '$theme',
                    contents: {
                        $push: '$$ROOT'
                    }
                }
            },
            {
                $lookup: {
                    from: 'themes',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'themeDetails'
                }
            },
            { $unwind: '$themeDetails' },
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'contents.author',
                    foreignField: '_id',
                    as: 'authorDetails'
                }
            },
            { $unwind: '$authorDetails' },
            {
                $lookup: {
                    from: 'contenttypes',
                    localField: 'contents.contentType',
                    foreignField: '_id',
                    as: 'contentTypeDetails'
                }
            },
            { $unwind: '$contentTypeDetails' },
            {
                $project: {
                    'contents': 1,
                    'themeDetails': {
                        _id: 1,
                        name: 1
                    },
                    'authorDetails': 1,
                    'contentTypeDetails': 1
                }
            },
            {
                $sort: {
                    'contents.createdDate': -1 // Ordena por createdDate en orden descendente
                }
            },
        );
        const contents = await Content.aggregate(pipeline);

        const formattedContents = contents.map(group => ({
            theme: group.themeDetails,
            contents: group.contents.map(content => ({
                ...content,
                author: group.authorDetails,
                contentType: group.contentTypeDetails
            }))
        }));

        res.status(200).json(formattedContents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    addContent,
    listContents
}