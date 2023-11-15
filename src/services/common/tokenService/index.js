const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../../../../config/config');
const
    UserAuthTokens
        = require('../../../models/user.auth.token.model');
const {
    tokenTypes
} = require('../../../../config/tokens');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false, ip = '', device = '') => {
    const tokenDoc = await UserAuthTokens.create({
        token:token,
        "user": userId,
        expires: expires.toDate(),
        type:type,
        blacklisted:blacklisted,
        ip_address: ip,
        device:device
    });
    return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
    try {
        const payload = await jwt.verify(token, config.jwt.secret);
        const tokenDoc = await UserAuthTokens.findOne({
            "token": token,
            "type": type,
            "user": payload.sub.toString(),
            "blacklisted": false
        });
        if (!tokenDoc) {
            return 'Token not found';
        }
        return tokenDoc;
    } catch (error) { }

};

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user, ip, device) => {
    try {
        const foundItem = await UserAuthTokens.findOne({
            user: user._id.toString(),
            ip_address: ip,
            device: device,
            blacklisted: 0
        });
        if (!foundItem) {
            const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
            const accessToken = generateToken(user._id.toString(), accessTokenExpires, tokenTypes.ACCESS);
            const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
            const refreshToken = generateToken(user._id.toString(), refreshTokenExpires, tokenTypes.REFRESH);
            const tokenData = await saveToken(refreshToken, user._id.toString(), refreshTokenExpires, tokenTypes.REFRESH, false, ip, device);
            return {
                "authId": tokenData.id,
                access: {
                    token: accessToken,
                    expires: accessTokenExpires.toDate(),
                },
                refresh: {
                    token: refreshToken,
                    expires: refreshTokenExpires.toDate(),
                },
            };
        } else {
            return {
                "authId": foundItem.id,
                refresh: {
                    token: foundItem.token,
                    expires: foundItem.expires,
                },
            }
        }
    } catch (error) {
        console.log(error);
    }

};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email) => {
    // const user = await userService.getUserByEmail(email);
    // if (!user) {
    //   throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
    // }
    // const expires = moment().add(config.jwt.resetPasswordExpirationMinutes, 'minutes');
    // const resetPasswordToken = generateToken(user._id.toString(), expires, tokenTypes.RESET_PASSWORD);
    // await saveToken(resetPasswordToken, user._id.toString(), expires, tokenTypes.RESET_PASSWORD);
    // return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {User} user
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (user) => {
    const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
    const verifyEmailToken = generateToken(user._id.toString(), expires, tokenTypes.VERIFY_EMAIL);
    await saveToken(verifyEmailToken, user._id.toString(), expires, tokenTypes.VERIFY_EMAIL);
    return verifyEmailToken;
};

module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
    generateResetPasswordToken,
    generateVerifyEmailToken,
};