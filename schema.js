const Joi = require("joi");

module.exports.listSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string()
            .max(50)
            .required(),

        description: Joi.string()
            .max(150)
            .required(),
        
        image: Joi.object({
            url: Joi.string(),
            filename: Joi.string()
        }),

        price: Joi.number()
            .min(0)
            .required(),

        country: Joi.string()
            .required(),

        location: Joi.string()
            .required()
    }).required()
}); 

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number()
            .min(1)
            .max(5)
            .required(),

        comment: Joi.string()
            .required(),
        
        createdAt: Joi.date()
            .default(Date.now()),
    }).required()
});