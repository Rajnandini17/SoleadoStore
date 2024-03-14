const JWT = require('jsonwebtoken');
const User = require('../models/userModel');


const requireSignIn = async(req, res, next) => {
    try {
        const token = req.headers.authorization;

        console.log('Received Token:', token);

        if (!token || !token.startsWith('Bearer ')) {
            throw new Error('Invalid token format');
          }

        const tokenWithoutBearer = token.slice('Bearer '.length);

        const decode = JWT.verify(
            tokenWithoutBearer, 
            process.env.JWT_SECRET
            );
        
            console.log('Decoded Token:', decode);
            req.user = decode;

            console.log('User Signed In');
            console.log('User ID in token:', req.user ? req.user.id : 'null');


            next();   
    } catch (error) {
        console.log('Error in requireSignIn middleware',error);
        return res.status(401).json({error: 'Unauthorized'});  
    }
};

//admin access
const isAdmin = async(req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);
        console.log('User:', user);
        if(user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized Access.',
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: 'Error in admin middleware'
        });
    }
};

module.exports = {requireSignIn, isAdmin};


