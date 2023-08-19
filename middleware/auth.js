const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try {
        const token = req.body.token; //  token extraction

        if (!token) {
            return res.status(401).json({
                message: 'No token, authorization denied'
            });
        }

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;
            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Token is invalid',
                error: error.message // Use error.message for a clear error message
            });
        }
    } catch (err) {
        return res.status(403).json({
            message: "Something went wrong while verifying Token"
        });
    }
};

exports.isUser = (req, res, next) => {
    try {
        if (req.user.role !== 'user') {
            return res.status(401).json({
                message: 'This is a Protected Route for User only'
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified'
        });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(401).json({
                message: 'This is a Protected Route for Admins only'
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'User role cannot be verified'
        });
    }
};
