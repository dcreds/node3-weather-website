const request = require('request')

// const url = 'http://api.weatherstack.com/current?access_key=2f5e8dd990adb5f06af73399cd4ba294&query=37.8267,-122.4233&units=f'

// request({ url: url, json: true }, (error, response) => {
//     console.log(error)
//     if (error) {
//         console.log('unable to connect to weather service')
//     } else if (response.body.error) {
//         console.log('unable to find location')
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + ".  It is currently " + response.body.current.temperature + " degrees out.  It feels like " + response.body.current.feelslike + " degrees out.")
//     }

// })

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2f5e8dd990adb5f06af73399cd4ba294&query=' + latitude + ',' + longitude + ''
    // console.log(url)
    request({ url, json: true }, (error, { body }={}) => {
        console.log(body)
        if (error) {
            callback("Unable to connect to weather service")
        } else if (body.error) {
            // console.log('unable to find location')
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                currentTemp: body.current.temperature,
                feelsLike: body.current.feelslike,
                UV_index: body.current.uv_index
            })
            // console.log(response.body.current.weather_descriptions[0] + ".  It is currently " + response.body.current.temperature + " degrees out.  It feels like " + response.body.current.feelslike + " degrees out.")
        }

    })


}



module.exports = forecast