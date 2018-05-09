const express = require('express');
const passport = require('passport');
const account = require('../authentication/account');
const router = express.Router();

router.get('/', function (req, res) {
    res.render('index', { user: req.user });
});

router.get('/register', function (req, res) {
    res.render('register', { });
});

router.get('/dashboard', function (req, res) {
    res.render('dashboard', { user: req.user });
});

/**
 * Register username and password.
 */
router.post('/register', function( req, res) {
    account.ProducerAccount.register(
        new account.ProducerAccount({ username: req.body.username }),
        req.body.password,
        function (err, account) {
            if (err) {
                return res.render('register', { error: err.message });
            }
            passport.authenticate('local')(req, res, function() {
                req.session.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/dashboard');
                });
            });
        }
    );
});

router.get('/login', function (req, res) {
    res.render('login', { user: req.user });
});

/**
 * Log in to producer dashboard.
 */
router.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/dashboard');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.status(200).send('pong!');
});

module.exports = router;
