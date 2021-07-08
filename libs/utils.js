const fs = require("fs");
const { join } = require("path");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// private key path
const privateKeyPath = join(__dirname, "..", "/keys/rsa_id_priv.pem");
// store the private key in veriable to use it to encrypt our data
const PRIV_KEY = fs.readFileSync(privateKeyPath, "utf8");

// function to generate hashed password to our user
function generateHashedPassword(password) {
  // generate the salt we use to hash the password
  const salt = crypto.randomBytes(32).toString("hex");
  // make the hash password
  const hashPassword = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return {
    salt,
    hashPassword,
  };
}

// function to validate the entered password when user logged in
function ValidatePassword(password, salt, hash) {
  // hash the passwrod the user enter
  const verifyPassword = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  // compare the hash store in the db and the one user entered
  return hash === verifyPassword;
}

// function to generate the token when the user sign in
function issueJwt(user) {
  // get the user id
  const id = user.id;
  // the expirations on the token
  const expiresIn = "1d";
  // create the payload object
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  // sign the token to the current user
  const signedToken = jwt.sign(payload, PRIV_KEY, {
    algorithm: "RS256",
    expiresIn: expiresIn,
  });
  // return the token (bearer)
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

// the public key we use to decrypt the token
const pubKeyPath = join(__dirname, "..", "/keys/rsa_id_pub.pem");
const PUB_KEY = fs.readFileSync(pubKeyPath, "utf8");

// function to create user object
function isAuth(req, res, next) {
  // get the token from the headers
  const fullToken = req.headers.authorization.split(" ");
  // get the token without the (Bearer)
  const token = fullToken[1];
  if (fullToken[0] == "Bearer" && token.match(/\S*.S*.S*/)) {
    jwt.verify(token, PUB_KEY, { algorithms: ["RS256"] }, (err, decoded) => {
      if (err) {
        return res.json("You'r not Authorize");
      } else {
        next();
      }
    });
  } else {
    res.json({
      error: "Invalid Token",
    });
  }
}

module.exports = {
  generateHashedPassword,
  ValidatePassword,
  issueJwt,
  isAuth,
};
