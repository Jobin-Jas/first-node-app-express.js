const { body } = require('express-validator');


exports.createProfileSchema = [
    body('address')
        .exists()
        .notEmpty()
        .withMessage('Your Address is required')
        .withMessage('Must be only alphabetical chars')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long')
];