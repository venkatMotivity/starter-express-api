// const bcrypt = require('bcryptjs');
// const {
//     UserModel,
//     UserLoginActivityModel,
//     UserRoleMappingModel,
// } = require('../../../models')
// const { generateAuthTokens } = require('../tokenService')
// class authService {
//     authUser = async (req, authUserBody) => {
//         try {
//             const account = await UserModel.findOne({
//                 'email': authUserBody.email,
//                 'provider': authUserBody.provider
//             })
//             if (account) {
//                 const passwordCheck = await bcrypt.compare(authUserBody.password, account.password);
//                 console.log(passwordCheck);
//                 if (passwordCheck) {
//                     var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
//                         req.connection.remoteAddress ||
//                         req.socket.remoteAddress ||
//                         req.connection.socket.remoteAddress;
//                     var device = req.headers["user-agent"];
//                     const tokens = await generateAuthTokens(account, ip, device);
//                     console.log("token", tokens);
//                     const checkLoginActivityActivity = await UserLoginActivityModel.findOne({
//                         token: tokens.authId
//                     })
//                     if (!checkLoginActivityActivity) {
//                         await UserLoginActivityModel.create({
//                             "token": tokens.authId,
//                             "user": account._id.toString(),
//                             "logged_in_at": Date.now()
//                         })
//                     }
//                     const userRolesMappingData = await UserRoleMappingModel.find({ user: account._id.toString() })
//                         .populate('role')
//                         .exec();
//                     return {
//                         status: true,
//                         data: {
//                             tokens,
//                             "userData": account,
//                             "rolepermission": userRolesMappingData
//                         }
//                     }
//                 } else {
//                     return {
//                         status: false,
//                         data: "Invalid Password"
//                     }
//                 }
//             } else {
//                 return {
//                     status: false,
//                     data: "Invalid User"
//                 }
//             }
//         } catch (error) {

//             return {
//                 status: false,
//                 data: error
//             }
//         }
//     }
//     getProfile = async (req) => {
//         try {
//             if (req.auth.userData.id) {
//                 const user = await UserModel
//                     .findById(req.auth.userData.id);
//                 const userRolesMappingData = await UserRoleMappingModel.find({ user: req.auth.userData.id.toString() })
//                     .populate('role')
//                     .exec();
//                 const activeRole = userRolesMappingData.filter(function (freelancer) {
//                     return freelancer.role.id == req.headers.rolesessionid;
//                 });

//                 // return { data: { "userData": user, "rolepermission": userRolesMappingData, activeRole } };

//                 // console.log(userData);
//                 if (user) {
//                     var string = JSON.stringify(user);
//                     var json = JSON.parse(string);
//                     const data = await AssetsModel.findById(json.image)
//                     json.imageData = data
//                     return { data: { "userData": json, "rolepermission": userRolesMappingData, activeRole } };
//                 } else {
//                     return { data: { userData, "rolepermission": userRolesMappingData, activeRole } };
//                 }

//             }
//         } catch (error) {
//             console.log("err", error);
//             return {
//                 error
//             }
//         }
//     }
// }

// module.exports = new authService;