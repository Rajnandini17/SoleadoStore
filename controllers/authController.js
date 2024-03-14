const { hashPassword, comparePassword } = require('../helpers/authHelper');
const User = require('../models/userModel');
const JWT = require('jsonwebtoken');



const registerController = async (req, res) => {
    //adding validation
    try {
        const {name, email, password, phone, address, question} = req.body;
        
        if(!name || !email || !password || !phone || !address || !question) {
            return res.status(400).json({message: 'All fields are required.'});
        }

        //checking for user
        const existingUser = await User.findOne({where: {email}});
        //checking for existing user
        if(existingUser) {
            return res.status(200).json({
                success: true,
                message: 'Already registered, please login!',
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //create user using Sequelize
        const user = await User.create({
            name, email, phone, address, password: hashedPassword, question,
        });
        

        res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            // user: newUser,
        });

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in Registeration.',
            error,
        });
    }
};

const loginController = async(req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password!',
            });
        } 
        const user = await User.findOne({where: {email}});

        console.log('User Object from Database:', user);



        if(!user) {
          return res.status(404).send({
            success: false,
            message: 'Email is not registered.',
          });  
        }
        const match = await comparePassword(password, user.password)
        if(!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            });
        }

    
        const token = await JWT.sign({id:user.id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successful!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login.',
            error
        });
    }
};

//forgot password controller
const forgotPasswordController = async(req, res) => {
    try {
        const {email, question, newPassword} = req.body;
        if(!email){
            res.status(400).send({message: 'Email is required.'});
        }
        if(!question){
            res.status(400).send({message: 'Question is required.'});
        }
        if(!newPassword){
            res.status(400).send({message: 'New Password is required.'});
        }
        const user = await User.findOne({where: {email, question}});
      if(!user){
        return res.status(404).send({
            success: false,
            message: 'Wrong Email or Question',
        });
      };
      const hashed = await hashPassword(newPassword);
      await User.update({ password: hashed }, { where: { id: user.id } });
      res.status(200).send({
        success: true,
        message: 'Password reset successful!',
      });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error 
        })
    }

}


//update profile controller
const updateProfileController = async(req, res) => {
    try {
        const {name, email, password, phone, address} = req.body;
         const user = await User.findByPk(req.user.id);

         if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

         if(password && password.length < 6) {
            return res.json({error: 'Minimum 6 characters required in password'});
         }

         const hashedPassword = password ? await hashPassword(password) : undefined;

         const updatedUser = await user.update({
            name: name || user.name,
            password: hashedPassword || user.password, // Assuming you hash the password
            phone: phone || user.phone,
            email: email || user.email,
            address: address || user.address
        }, { returning: true });
         res.status(200).send({
            success: true,
            message: 'Profile updated Successfully',
            updatedUser
         });
         
    } catch (error) {
        console.log(error);
        res.status(400).send({
           success: false,
           message: 'Error while updating profile',
           error 
        });
    }
};


 



const testController = (req, res) => {
    res.send("Protected Route");
};

module.exports = {
    registerController, 
    loginController, 
    testController, 
    forgotPasswordController,
    updateProfileController,
};
