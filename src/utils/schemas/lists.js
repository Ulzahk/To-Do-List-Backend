const joi = require('@hapi/joi');

const listIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const listTitleSchema = joi.string().max(100);
const listDescriptionSchema = joi.string().max(300);
const listTaskSchema= joi.array().items(joi.object({
    order: joi.number().required(),
    taskName: joi.string().max(100).required(),
    description: joi.string().max(300),
    completed: joi.boolean().required()
})).required();
const listTagsSchema= joi.array().items(joi.string().max(50));

const createListSchema = {
    title: listTitleSchema.required(),
    description: listDescriptionSchema.required(),
    tasks: listTaskSchema.required(),
    tags: listTagsSchema
}

const updateListSchema = {
    title: listTitleSchema,
    description: listDescriptionSchema,
    tasks: listTaskSchema,
    tags: listTagsSchema
}

module.exports = {
    listIdSchema,
    createListSchema,
    updateListSchema
}
