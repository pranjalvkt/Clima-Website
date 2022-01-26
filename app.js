const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
const port = 80;

app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');
    
      

});
app.post('/',(req, res)=>{
    const cityQuery = req.body.cityName;
    const apiKey = '71e1771889506857f5179142aeff75d5'
    const units = 'metric'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityQuery +'&appid=' + apiKey + '&units=' + units;

    https.get(url, (response)=>{
        console.log(response.statusCode);

        response.on('data', (data)=>{
            const weatherData = JSON.parse(data);
            
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = 'http://openweathermap.org/img/wn/' + icon +'@2x.png';
            const windSpeed = weatherData.wind.speed;
            const humidity = weatherData.main.humidity;
            const pressure = weatherData.main.pressure;
            
            res.write('<h1>The temperature in ' + cityQuery + ' is ' + temp + ' degree Celcius.</h1>');
            res.write('<p> The weather is currently ' + weatherDescription + '.</p>');
            res.write('<img src='+ imageURL + '>');
            res.write('<h3>Wind: ' + windSpeed + ' m/s.</h3>');
            res.write('<h3>Humidity: ' + humidity + ' %.</h3>');
            res.write('<h3>Pressure: ' + pressure + ' hPa.</h3>');

            res.send();
        });
    });
});


app.listen(process.env.PORT || port, () => {
    console.log("Server started on port" + port);
});