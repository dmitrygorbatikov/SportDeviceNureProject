const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express()

app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use(express.json({extended: true}))
app.use(cors());

const PORT = config.get('port')

app.use(express.static('public'));

app.use('/api/auth', require('./auth/auth.routes'))
app.use('/api/team', require('./team/team.routes'))
app.use('/api/sensors', require('./sensors/sensors.routes'))
app.use('/api/stats', require('./stats/stats.routes'))
app.use('/api/products', require('./products/products.routes'))

function start(){
    try{
        mongoose.connect(config.get('mongoUri'), {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true
            },
            () => console.log('MongoDB connected')
        )
        app.listen(PORT, () => {
            console.log('Server started')
        })
    }
    catch (e) {
        console.log(e);
    }
}
start()