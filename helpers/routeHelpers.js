const Joi = require('joi');

module.exports = {
    // JOI validation
    validateBody: (schema) => {
        return (req, res, next) => {
            console.log('[+]REQUEST:', req.body);
            
            const result = Joi.validate(req.body, schema);

            if(result.error)
                return res.status(400).json(result.error);
            
            if(!req.value)
                req.value = {};

            req.value['body'] = result.value;
            next();
        }
    },

    // JOI schemas
    schemas: {
        signUpSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            username: Joi.string().required(),
            password: Joi.string().required()
        }),

        signInSchema: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required()
        }),

        addEntrySchema: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            numberOfInjuries: Joi.number().required(),
            isResolved: Joi.boolean().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
        })
    }
}