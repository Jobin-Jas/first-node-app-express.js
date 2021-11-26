const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLogin } = require('../middleware/validators/userValidator.middleware');
const profileController = require('../controllers/profile.controller');
const { createProfileSchema } = require('../middleware/validators/profileValidator.middleware');


router.get('/users', auth(), awaitHandlerFactory(userController.getAllUsers)); // localhost:3000/api/v1/users
router.get('/users/id/:id', auth(), awaitHandlerFactory(userController.getUserById)); // localhost:3000/api/v1/users/id/1
router.get('/users/username/:username', auth(), awaitHandlerFactory(userController.getUserByuserName)); // localhost:3000/api/v1/users/usersname/julia
router.get('/users/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser)); // localhost:3000/api/v1/users/whoami
router.post('/users/create', createUserSchema, awaitHandlerFactory(userController.createUser)); // localhost:3000/api/v1/users
router.patch('/users/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser)); // localhost:3000/api/v1/users/id/1 , using patch for partial update
router.delete('/users/id/:id', auth(Role.Admin), awaitHandlerFactory(userController.deleteUser)); // localhost:3000/api/v1/users/id/1


router.post('/users/login', validateLogin, awaitHandlerFactory(userController.userLogin)); // localhost:3000/api/v1/users/login

router.post('/profiles', auth(), createProfileSchema, awaitHandlerFactory(profileController.createProfile)); // localhost:3000/api/v1/profiles
router.get('/profiles', auth(), awaitHandlerFactory(profileController.getProfile)); // localhost:3000/api/v1/profiles/
module.exports = router;