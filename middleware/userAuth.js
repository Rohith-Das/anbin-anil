const User = require('../model/userModel');

const isLogin = (req, res, next) => {
    try {
        if (req.session.user_id) {
            return next();
        } else {
            return res.redirect('/login');
        }
    } catch (error) {
        console.error('Error in isLogin middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};

const isLogout = (req, res, next) => {
    try {
        if (req.session.user_id) {
            return res.redirect('/');
        } else {
            return next();
        }
    } catch (error) {
        console.error('Error in isLogout middleware:', error);
        res.status(500).send('Internal Server Error');
    }
};