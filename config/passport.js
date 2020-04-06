const keys = require("./dev_keys").secredOrKey;
const mongoose = require("mongoose");
const User = mongoose.model("User");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.secretOrKey = keys;

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
