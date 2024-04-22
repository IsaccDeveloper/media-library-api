const express = require('express')
const mongoose = require('mongoose')
const app = express()
const accountRoute = require('./routes/accounts.route')
const themeRoute = require('./routes/themes.route')
const contentRoute = require('./routes/contents.route')
const contentTypeRoute = require('./routes/contentTypes.route')
const cors = require('cors');


app.use(cors())

app.use(express.json())
app.use('/api/accounts', accountRoute)
app.use('/api/themes', themeRoute)
app.use('/api/contents', contentRoute)
app.use('/api/contentTypes', contentTypeRoute)



mongoose.connect('mongodb+srv://isaccdeveloper:OvdPZatxJGwRvmfb@medialibrary.uv4bmuu.mongodb.net/')
    .then(() => {
        console.log('Connected to mongo database')
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })

    })
    .catch(() => {
        console.log('Connection failed')
    })


