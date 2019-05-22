const request = require('request')

const searchString = 'ponda goa'
const geoCode = (searchString, callback) => {
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+searchString+'.json?access_token=pk.eyJ1Ijoic2hhc2hpa2RtIiwiYSI6ImNqdnl4OTZ5aTBrbTUzem1qMHlmMGpqZ2UifQ.u5fb-8DvolHui_NPhATDdg'
    request({ url: mapUrl, json: true}, (error, response) => {
        if(error) {
            const errMsg = 'Unable to connect to maps service'
            console.log(errMsg)
        } else if(response.body.error) {
            const errMsg = response.body.error
            console.log(errMsg)
        } else if(response.body.features.length == 0) {
            const errMsg = 'Unable to find Location: '+searchString
            console.log(errMsg)
        } else {
            const info = response.body
            const longitude = info.features[0].center[0]
            const latitude = info.features[0].center[1]
            callback(latitude, longitude)
        }
    })
}
const WeatherCode = (latitude, longitude) => {
    console.log('Latitude: '+latitude+','+' Longitude: '+longitude)
    const queries = '?units=si&exclude=minutely,hourly,alerts,flags'
    const weatherUrl = 'https://api.darksky.net/forecast/76ab85f36cc84e3b4db6c6e378d38b8c/'+latitude+','+longitude+queries
    request({ url: weatherUrl, json: true}, (error, response) => {
        if(error) {
            const errMsg = 'Unable to connect to weather service'
            console.log(errMsg)
        } else if(response.body.error) {
            const errMsg = response.body.error
            console.log(errMsg)
        } else {
            const info = response.body
            console.log('Temperature: '+ info.currently.temperature +'C')
            console.log('Rain chance: '+ info.currently.precipProbability*100 +'%')
            console.log('Summary: '+info.daily.data[0].summary)
        }
    })
}
console.log(searchString)
geoCode(searchString, WeatherCode)
