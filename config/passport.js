const fs = require("fs");
const { join } = require("path");
const { PrismaClient } = require("@prisma/client");
const jwtStrategy = require("passport-jwt").Strategy;
const jwtExtract = require("passport-jwt").ExtractJwt;

// the public key we use to decrypt the token
const pubKeyPath = join(__dirname, "..", "/keys/rsa_id_pub.pem");
const PUB_KEY = fs.readFileSync(pubKeyPath, "utf8");

// get the user model
const { users } = new PrismaClient();

// passport jwt options
options = {
  jwtFromRequest: jwtExtract.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
  passReqToCallback: true,
};

const strategy = new jwtStrategy(options, async (req, payload, done) => {
  const user = await users.findUnique({
    where: { id: payload.sub },
  });
  try {
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, null);
  }
});

module.exports = (passport) => {
  passport.use("user", strategy);
};
