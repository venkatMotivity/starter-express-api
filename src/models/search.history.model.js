const mongoose = require('mongoose');
const {
    toJSON
} = require('./plugins');
const {
    tokenTypes
} = require('../../config/tokens');

const seachHistorySchema = mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    input: {
        type: mongoose.SchemaTypes.String,
    },
    output: {
        type: mongoose.SchemaTypes.String,
    }
}, {
    timestamps: true,
});

// add plugin that converts mongoose to json
seachHistorySchema.plugin(toJSON);

/**
 * @typedef Token
 */
const seachHistory = mongoose.model('searchHistory', seachHistorySchema);

module.exports = seachHistory;