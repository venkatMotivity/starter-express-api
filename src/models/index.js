'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const mongoose = require('mongoose');
const db = {};
return new Promise((resolve) => {
    mongoose.connect(process.env.MONGODB_URI, {
        serverApi: '1',
        maxPoolSize: 2000,
        wtimeoutMS: 2500,
    }).then(connected => {
        fs
            .readdirSync(__dirname)
            .filter(file => {
                return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
            })
            .forEach(file => {
                const model = require(path.join(__dirname, file));
                console.log("model", { model });
                db[model.name] = model;
            });
        resolve('DB CONNECTED!');
    },
        err => {
            console.log(`DB Connecting error :`, err)
            resolve('DB Connecting error :')
        }
    )
});




module.exports = db;
