const mongoose = require('mongoose');
const { mediaTypes } = require('../../config/media');
const { toJSON, paginate } = require('./plugins');

const assetsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    path: {
        type: String,
        allowNull: false
    },
    mediatype: {
        type: String,
        enum: [
            mediaTypes.IMAGE, mediaTypes.VIDEO, mediaTypes.DOC, mediaTypes.PDF, mediaTypes.OTHERS
        ],
        required: true,
        trim: true,
        default: mediaTypes.DOC
    },
    originalname: {
        type: String,
        allowNull: false
    },
    alttext: {
        type: String
    },
    filedata: {
        type: Object
    },
    mimetype: {
        type: Object
    },
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: false
    },
    updator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    }
}, { timestamps: false })

// add plugin that converts mongoose to json
assetsSchema.plugin(toJSON);
assetsSchema.plugin(paginate);

/**
 * @typedef Categories
 */
const Assets = mongoose.model('Assets', assetsSchema);

module.exports = Assets;