const geoCode = require('./utils/geocode.js')
const weatherCode = require('./utils/weathercode.js')
const searchString = 'Kapoli'

geoCode(searchString, (error, data) => {
    if(error) {
        console.log(error)
    } else {
        console.log('Location: '+data.location)
        console.log('Latitude: '+data.latitude+','+' Longitude: '+data.longitude)
        weatherCode(data.latitude, data.longitude, (error, data) => {
            if(error) {
                console.log(error)
            } else {
                console.log('Temperature: '+ data.temperature +'C')
                console.log('Rain chance: '+ data.rainprob*100 +'%')
                console.log('Summary: '+ data.summary)
            }
        })
    }
})
