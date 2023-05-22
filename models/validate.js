const { body, params, validationResult } = require('express-validator')
const { passwordPass } = require('../util/passwordComplexityCheck')

const themeValidationRules = () => {
    return [
        params('themeName').isString().isLength({ min: 5, max: 20 }).isAlphanumeric()
    ]
}

const userValidationRules = () => {
    return [
        // username must be an email
        body('username').isEmail(),
        // password must be at least 5 chars long
        body('password').custom(passwordPass),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    themeValidationRules,
    userValidationRules,
    validate,
}