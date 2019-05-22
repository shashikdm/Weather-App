const request = require('request')

const url = 'https://api.darksky.net/forecast/76ab85f36cc84e3b4db6c6e378d38b8c/37.8267,-122.4233?units=si&exclude=minutely,hourly,alerts,flags'

request({ url: url, json: true}, (error, response) => {
    info = response.body
    console.log('Temperature: '+ info.currently.temperature +'C')
    console.log('Rain chance: '+ info.currently.precipProbability*100 +'%')
    console.log('Summary: '+info.daily.data[0].summary)
})