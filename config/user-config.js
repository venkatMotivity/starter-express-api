const userProviders = {
  NUMBER: 'number',
  GOOGLE: 'google',
  FACEBOOK: 'facebook',
  EMAIL: 'email',
  AUTH0: "autho",
};

const userRoles = [
  'Super Admin',
  'Admin'
]

const userStatus = {
  ACTIVE: 'active',
  PENDING: 'pending',
  BLOCKED: 'blocked',
}

const userGender = {
  MALE: 'male',
  FEMALE: 'female',
  OTHERS: 'others',
}

module.exports = {
  userRoles,
  userProviders,
  userStatus,
  userGender
};