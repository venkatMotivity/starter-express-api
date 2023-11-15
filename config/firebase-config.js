var admin = require("firebase-admin");

var serviceAccount = require("./neelias-c7f37-firebase-adminsdk-axjcl-428017c965.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://neelias-c7f37.firebaseio.com"
});


module.exports.admin = admin