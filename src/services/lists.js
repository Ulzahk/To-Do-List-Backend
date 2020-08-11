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

    async updateList({listId, list}){
        const updatedListId = await this.mongoDB.update(this.collection, listId, list);
        return updatedListId || [];
    }

    async deleteList({listId}){
        const deleteListId = await this.mongoDB.delete(this.collection, listId);
        return deleteListId || [];
    }
}

module.exports = listsServices;