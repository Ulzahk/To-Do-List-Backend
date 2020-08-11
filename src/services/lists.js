const MongoLib = require('../lib/mongo')

class listsServices {
    constructor(){
        this.collection = 'lists';
        this.mongoDB = new MongoLib();
    }

    async getLists({tags}){
        const query = tags && { tags: { $in: tags }};
        const lists = await this.mongoDB.getAll(this.collection, query);
        return lists || [];
    }

    async getList({listId}){
        const list = await this.mongoDB.get(this.collection, listId);
        return list || []; 
    }

    async createList({list}){
        const createdListId = await this.mongoDB.create(this.collection, list);
        return createdListId || [];
    }

    //Update List
    async updateList({listId, list}){
        const updatedListId = await this.mongoDB.update(this.collection, listId, list);
        return updatedListId || [];
    }

    //Update Task 
    async updateTask({listId, taskOrder, completedState}){
        const updatedCompletedState = await this.mongoDB.updateTask(this.collection, listId, taskOrder, completedState);
        return updatedCompletedState || [];
    }

    //Update to Add Task
    async updateAddTask({listId, task}){
        const updatedListTasks = await this.mongoDB.updateAddTask(this.collection, listId, task);
        return updatedListTasks || [];
    }

    //Update to Remove Task
    async updateRemoveTask({listId, taskOrder}){
        const updatedTaskRemoved = await this.mongoDB.updateRemoveTask(this.collection, listId, taskOrder);
        return updatedTaskRemoved || [];
    }

    async deleteList({listId}){
        const deleteListId = await this.mongoDB.delete(this.collection, listId);
        return deleteListId || [];
    }
}

module.exports = listsServices;