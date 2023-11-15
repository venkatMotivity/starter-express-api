const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const {
  toJSON,
  paginate
} = require('./plugins');
const {
  userProviders,
  userGender,
  userStatus
} = require('../../config/user-config');


const userSchema = mongoose.Schema({
  image: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Assets',
    default: null,
  },
  autho_userid: {
    type: String,
    trim: true,
    default: null,
  },
  profile_url: {
    type: String,
    trim: true,
    default: null,
  },
  name: {
    type: String,
    trim: true,
    default: null,
  },
  slug: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  password: {
    type: String,
    required: false,
    trim: true,
    minlength: 5,
    default: null,
    private: true, // used by the toJSON plugin
  },
  number: {
    type: String,
    trim: true,
    default: null,
  },
  dob: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    enum: [userGender.NONE, userGender.MALE, userGender.FEMALE, userGender.OTHERS],
    default: userGender.NONE,
    trim: true,
  },
  accept_terms: {
    type: Boolean,
    default: false
  },
  provider: {
    type: String,
    enum: [userProviders.NUMBER, userProviders.EMAIL, userProviders.GOOGLE, userProviders.FACEBOOK, userProviders.AUTH0],
    default: userProviders.AUTH0
  },
  user_status: {
    type: String,
    enum: [userStatus.ACTIVE, userStatus.PENDING, userStatus.BLOCKED],
    default: userStatus.ACTIVE
  },
  otp: {
    type: String,
    default: null
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isNumberVerified: {
    type: Boolean,
    default: false
  },
  email_verified_at: {
    type: Date,
  },
  number_verified_at: {
    type: Date
  },
}, {
  timestamps: true,
});

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({
    email,
    _id: {
      $ne: excludeUserId
    }
  });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
// userSchema.virtual('password').get(function() {
//   return this.password; // or day.js/moment.js 
// });

// userSchema.virtual('Name').get(function () {
//   return `${this.first_name} ${this.last_name}`; // or day.js/moment.js 
// });


// userSchema.virtual('image_path').get(function () {
//   return this.image == '' ? gravatarUrl(this.email, { size: 200 }) : ''// or day.js/moment.js 
// });

// userSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;