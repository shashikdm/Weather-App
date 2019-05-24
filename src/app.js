const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const weatherCode = require('./utils/weathercode.js')

//define path for static public assets
const publicPath = path.join(__dirname, '/../public')

//define path for express config
const viewsPath = path.join(__dirname, '/../templates/views')
const partialsPath = path.join(__dirname, '/../templates/partials')
const app = express()

const port = process.env.PORT || 3000

//configure handlebar engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        pagetitle: 'Weather App | Home',
        title: 'Weather App',
        author: 'shashikdm'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        pagetitle: 'Weather App | About',
        title: 'About',
        author: 'Shashi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        pagetitle: 'Weather App | Help',
        title: 'Help',
        author: 'shashikdm',
    })
})

app.get('/weather', (req, res) => {
    searchString = req.query.address
    if(!searchString) {
        res.send({error: 'Address field is required'})
        return
    }
    geoCode(searchString, (error, {location, latitude, longitude} = {}) => {
        if(error) {
            res.send({error})
            return
        }
        weatherCode(latitude, longitude, (error, {temperature, rainprob, summary} = {}) => {
            if(error) {
                res.send({error})
                return
            }
            res.send({
                location,
                latitude,
                longitude,
                temperature,
                rainprob,
                summary
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        pagetitle: 'Weather App | Error',
        title: 'Error',
        errMsg: '404 page not found',
        author: 'shashikdm'
    })
})

app.listen(port, () => {
    console.log('Server is on on port' + port)
})