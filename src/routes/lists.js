const express = require('express');
const ListsServices = require('../services/lists');

function toDoListApi(app){
    const router = express.Router();
    app.use('/api/to-do', router);

    const listsServices = new ListsServices();

    //Read Lists
    router.get('/', async function(req, res, next){
        const { tags } = req.query;
        try {
            const lists = await listsServices.getLists({ tags });
            res.status(200).json({
                data: lists,
                message: 'lists readed'
            });
        } catch (error) {
            next(error);
        }
    })

    //Read List
    router.get('/:listId', async function(req, res, next){
        const { listId } = req.params
        try {
            const list = await listsServices.getList({ listId });
            res.status(200).json({
                data: list,
                message: 'list retrieved'
            });
        } catch (error) {
            next(error);
        }
    })

    //Create List
    router.post('/', async function(req, res, next){
        const { body: list } = req;
        try {
            const createdListId = await listsServices.createList({ list });

            res.status(201).json({
                data: createdListId,
                message: 'list created'
            })
        } catch (error) {
            next(error);
        }
    })

    //Update List
    router.put('/:listId', async function(req, res, next){
        const { listId } = req.params;
        const { body: list } = req;
        try {
            const updatedListId = await listsServices.updateList({ listId, list });

            res.status(200).json({
                data: updatedListId,
                message: 'list updated'
            })
        } catch (error) {
            next(error);
        }
    })

    //Delete List
    router.delete('/:listId', async function(req, res, next){
        const { listId } = req.params;
        try {
            const deletedListId = await listsServices.deleteList({ listId });

            res.status(200).json({
                data: deletedListId,
                message: 'list deleted'
            })
        } catch (error) {
            next(error);
        }
    })
}

module.exports = toDoListApi;