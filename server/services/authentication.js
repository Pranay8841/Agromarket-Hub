const JWT = require("jsonwebtoken");

const secret = "$SecureOne@456";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    password: user.password,
    roles: user.roles,
    address: user.address,
    contact: user.contact,
    profileImageURL: user.profileImageURL,
  };
  console.log(payload);
  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
