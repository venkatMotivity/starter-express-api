
const {
    commonResponse
} = require('../utils/Response.utils');
function hasModulePermissions(allowed) {
    // const isUndefinedRole = (allowed.filter(x => !possibleMasterAdminRoles.includes(x)).length > 0);
    // if (isUndefinedRole) {
    //     throw new Error('Undefined Admin Role used in permissions middleware');
    // }
    // const isAllowed = roles => allowed.filter(x => roles.includes(x)).length > 0;
    // return a middleware
    return (req, res, next) => {
        console.log("req", req.auth.permissions);
        // console.log());
        // if(Object(req.auth.permissions))
        // if (req.auth?.permissions != undefined) {
        //     const hasAccess = getPermissionValue(allowed.split('.'), req.auth.permissions);
        // role is allowed, so continue on the next middleware
        // if (req.auth && hasAccess) {
        next();
        // } else {
        //     return res.status(401).send({
        //         message: "Unauthorized! You Dont have permissions to access this route!"
        //     });
        // }
        // } else {
        //     return res.status(401).send({
        //         message: "Unauthorized! You Dont have permissions to access this route!"
        //     });
        // }
    };
}
function getPermissionValue(selectionArray, obj) {
    // console.log("obj");
    // console.log("selectionArray",selectionArray);
    selectionArray.forEach(key => {
        obj = obj[key];
    });
    return obj;
}

module.exports = {
    hasModulePermissions,
};
