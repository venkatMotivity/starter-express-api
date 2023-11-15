const mongoose = require('mongoose');
const {
    toJSON
} = require('./plugins');

const userLoginActivitySchema = mongoose.Schema({
    token: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Token',
        required: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    logged_out: {
        type: Boolean,
        default: false
    },
    logged_in_at: {
        type: Date,
        default: Date.now()
    },
    logged_out_at: {
        type: Date,
    },
}, {
    timestamps: true,
});

// add plugin that converts mongoose to json
userLoginActivitySchema.plugin(toJSON);

/**
 * @typedef Token
 */
const userLoginActivity = mongoose.model('userLoginActivity', userLoginActivitySchema);

module.exports = userLoginActivity;