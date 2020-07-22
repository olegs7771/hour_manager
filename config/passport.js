// const keys = require("./keys").secredOrKey;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const key = process.env.SECRED_KEY;
opts.secretOrKey = key;

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
