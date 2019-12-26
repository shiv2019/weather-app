const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/16562fd65e6944937723ad9d2d5ae78d/${latitude},${longitude}?units=si`;
    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to Connect to location services',undefined)
        }else if(response.body.error) {
            callback('Unable to Find Location ... :(  try again', undefined);
        }else {
            callback(undefined, 
                // tempreture: response.body.currently.temperature, 
                // summary: response.body.daily.data[0].summary,
                response.body.daily.data[0].summary +  ' It is currently ' + response.body.currently.temperature + ' degree celcius tempreture.\n There is ' + response.body.currently.precipProbability + '% chances of rain.'
            )
        }

    });
};

module.exports = forecast