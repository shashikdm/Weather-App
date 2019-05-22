const request = require('request')

const weatherCode = (latitude, longitude, callback) => {
    const queries = '?units=si&exclude=minutely,hourly,alerts,flags'
    const url = 'https://api.darksky.net/forecast/76ab85f36cc84e3b4db6c6e378d38b8c/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+queries
    request({ url, json: true}, (error, {body}) => {
        if(error) {
            const errMsg = 'Unable to connect to weather service'
            callback(errMsg)
        } else if(body.error) {
            const errMsg = body.error
            callback(errMsg)
        } else {
            callback(undefined, {
                temperature: body.currently.temperature,
                rainprob: body.currently.precipProbability,
                summary: body.daily.data[0].summary
            })
        }
    })
}

module.exports = weatherCode