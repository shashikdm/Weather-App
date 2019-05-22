const request = require('request')

const geoCode = (searchString, callback) => {
    const mapUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(searchString)+'.json?access_token=pk.eyJ1Ijoic2hhc2hpa2RtIiwiYSI6ImNqdnl4OTZ5aTBrbTUzem1qMHlmMGpqZ2UifQ.u5fb-8DvolHui_NPhATDdg'
    request({ url: mapUrl, json: true}, (error, response) => {
        if(error) {
            const errMsg = 'Unable to connect to maps service'
            callback(errMsg)
        } else if(response.body.error) {
            const errMsg = response.body.error
            callback(errMsg)
        } else if(response.body.features.length == 0) {
            const errMsg = 'Unable to find Location: '+searchString
            callback(errMsg)
        } else {
            const info = response.body.features[0]
            callback(undefined, {
                location: info.place_name,
                longitude: info.center[0],
                latitude: info.center[1]
            })
        }
    })
}

module.exports = geoCode