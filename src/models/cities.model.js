const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const citiesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: false })

// add plugin that converts mongoose to json
citiesSchema.plugin(toJSON);
citiesSchema.plugin(paginate);

/**
 * @typedef Categories
 */
const Cities = mongoose.model('cities', citiesSchema);

module.exports = Cities;