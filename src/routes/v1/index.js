const express = require('express');
const router = express.Router();

const routeFiles = [
    {
        path: '/user',
        route: require('./user.route.js')
    },
    {
        path: '/trip',
        route: require('./trip.route.js')
    },
]

const adminRoutesFiles = [
]

const webhookRoutesFiles = [

]


adminRoutesFiles.forEach((route) => {
    router.use(`/admin${route.path}`, route.route);
});

webhookRoutesFiles.forEach((route) => {
    router.use(`/webhook${route.path}`, route.route);
});

routeFiles.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;