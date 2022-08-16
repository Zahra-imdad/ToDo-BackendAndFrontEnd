const joi = require('joi');

const todoValidations = joi.object({
    id: joi.number().min(1),
    task: joi.string().min(2).max(150).required(),
    
})

module.exports = todoValidations