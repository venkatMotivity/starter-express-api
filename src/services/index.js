'use strict';

const fs = require('fs');
const path = require('path');
const services = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
        const fileOrder = file.split('.')
        return (file.indexOf('.') !== 0) && (fileOrder[1] === 'service' && fileOrder[2] == 'js');
    })
    .forEach(file => {
        console.log("service file", file);
        const model = require(path.join(__dirname, file))
        services[file.split('.')[0] + "Service"] = model;
    });
console.log("Services", services);
module.exports = services;
