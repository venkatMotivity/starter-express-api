const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3000),
        MONGODB_URI: Joi.string().required().description('MongoDb Connection String is required'),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('minutes after which reset password token expires'),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('minutes after which verify email token expires'),
        SMTP_HOST: Joi.string().description('server that will send the emails'),
        SMTP_PORT: Joi.number().description('port to connect to the email server'),
        SMTP_USERNAME: Joi.string().description('username for email server'),
        SMTP_PASSWORD: Joi.string().description('password for email server'),
        EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    database: {
        devdatabase: {
            username: envVars.DBUSER,
            password: process.env.PASSWORD,
            database: envVars.DEVLOPMENT_DATABASE,
            host: envVars.HOST,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            underscored: true,
            freezeTableName: true,
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            createdBy: "created_by",
            updatedBy: "updated_by"
        },
        testingdatabase: {
            host: envVars.HOST,
            username: envVars.DBUSER,
            password: process.env.PASSWORD,
            database: envVars.TESTING_DATABASE,
            dialect: "mysql",
        },
        productiondatabase: {
            host: envVars.HOST,
            username: envVars.DBUSER,
            password: process.env.PRODUCTION_DATABASE_PASSWORD,
            database: envVars.PRODUCTION_DATABASE,
            dialect: "mysql",
        },
    },
    s3Config: {
        endpoint: process.env.DO_SPACES_ENDPOINT,
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET,
        sslEnabled: false,
        s3ForcePathStyle: true,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD,
            },
        },
        from: envVars.EMAIL_FROM,
    },
    domain: {
        site: {
            name: process.env.NAME,
            url: process.env.URL
        },
        media: {
            baseFolder: envVars.NODE_ENV != 'production' ? process.env.DEVLOPMENT_ASSETS_PATH : process.env.PRODUCTION_ASSETS_PATH,
            basePath: envVars.NODE_ENV != 'production' ? process.env.DEVLOPMENT_ASSETS_FULL_PATH : process.env.PRODUCTION_ASSETS_FULL_PATH,
            cdnBasePath: process.env.DO_BASE_PATH,
            assetBasePath: process.env.DO_CDN_PATH
        }
    },
    languages: {
        en: '01af4923-bee7-481c-8394-d4c60fed9748',
        te: '0000fc6a-1992-480e-aab3-24de8111df64'
    },
    permissionObj: {
        categories: {
            'view': 'catlog.categories.views'
        }
    }
};
