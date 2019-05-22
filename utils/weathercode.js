const request = require('request')

const weatherCode = (latitude, longitude, callback) => {
    const queries = '?units=si&exclude=minutely,hourly,alerts,flags'
    const weatherUrl = 'https://api.darksky.net/forecast/76ab85f36cc84e3b4db6c6e378d38b8c/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+queries
    request({ url: weatherUrl, json: true}, (error, response) => {
        if(error) {
            const errMsg = 'Unable to connect to weather service'
            callback(errMsg)
        } else if(response.body.error) {
            const errMsg = response.body.error
            callback(errMsg)
        } else {
            const info = response.body
            callback(undefined, {
                temperature: info.currently.temperature,
                rainprob: info.currently.precipProbability,
                summary: info.daily.data[0].summary
            })
        }
    })
}

module.exports = weatherCode