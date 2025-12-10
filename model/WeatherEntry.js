const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        city: String, temperature: Number, description: String, data: {type: Date, default: Date.now}
    }
)

module.exports = mongoose.model('WeatherEntry', schema);
