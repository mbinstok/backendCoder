import { isValidPassword, createHash } from "../utils/validate.js"
import { Strategy } from "passport-local";
import { User } from "../models/usuario.js"
import passport from 'passport'

passport.serializeUser((user, done) => done(null, user._id))
passport.deserializeUser((id, done) => User.findById(id, done))

export const objStrategy = new Strategy(
    (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false);
            if (!isValidPassword(user, password)) return done(null, false);
   
            return done(null, user);
    });
})

export const objStrategySignup = new Strategy(
    {
        passReqToCallback: true
    },
    (req, username, password, done) => {
        User.findOne({ 'username': username }, function (err, user) {
   
            if (err) return done(err)
            if (user) return done(null, false)
    
            const newUser = {
                name: req.body.name,
                username: req.body.username,
                password: createHash(password),
            }

            User.create(newUser, (err, userWithId) => {
                if (err) return done(err);
                return done(null, userWithId);
            });
        });
    }
)