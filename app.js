const geoCode = require('./utils/geocode.js')
const weatherCode = require('./utils/weathercode.js')
const searchString = process.argv[2]

if(!searchString) {
    return console.log('Please provide a command line argument')
}

geoCode(process.argv[2], (error, {location, latitude, longitude}) => {
    if(error) {
        return console.log(error)
    }
    console.log('Location: '+location)
    console.log('Latitude: '+latitude+','+' Longitude: '+longitude)
    weatherCode(latitude, longitude, (error, {temperature, rainprob, summary}) => {
        if(error) {
            return console.log(error)
        }
        console.log('Temperature: '+ temperature +'C')
        console.log('Rain chance: '+ rainprob*100 +'%')
        console.log('Summary: '+ summary)
    })
})
