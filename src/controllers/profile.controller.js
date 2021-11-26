const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
const profileModel = require('../models/profile.model');
dotenv.config();

/******************************************************************************
 *                              Profile Controller
 ******************************************************************************/

 class ProfileController {

    getProfile = async (req ,res, next) => {
        let profile = await profileModel.find(req.currentUser.id);
        if (!profile.length) {
            throw new HttpException(404, 'Profile not found');
        }
        res.send(profile);
    }

    createProfile = async (req, res, next) => {
        this.checkValidation(req);
        req.body.user = req.currentUser.id;
        console.log(req.body);
        const result = await profileModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('Profile was Created!');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

 }

 


 /******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ProfileController;
