const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

var corsOptions ={
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./models')
db.sequelize.sync().then(() => {
    console.log('Drop and re-sync db.')
}).catch(err => console.log('sequlize connection error', err))

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to react app' })
})
app.use('/api/options-summary', require('./controllers/optionssummary'))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
