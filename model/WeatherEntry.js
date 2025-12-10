const express = require('express');
const axios = require('axios');
const Entry = require('./model/WeatherEntry');
const router = express.Router();

router.get('/',  async (req, res) => {
    res.render('index')
});
router.post('/weather', async (req, res) => {
    const city = req.body.city;
    try{
        const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${city}`;
        const out = await axios.get(url);
        const data = out.data;
        const entry = new Entry({
            city: data.location.name, temperature: data.current.temperature, description: data.current.weather_descriptions[0]
        });
        await entry.save();
        res.render('results', {weather: entry})
    }catch(err){
        res.send("Error getting weather data");
    }
})

module.exports = router;
