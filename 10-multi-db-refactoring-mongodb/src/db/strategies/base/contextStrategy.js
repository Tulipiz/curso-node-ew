const ICrud = require ('../interfaces/interfaceCrud')

class ContextStrategy extends ICrud{
    constructor(strategy){
        super()
        this._database = strategy
    }

    create(item){
        return this._database.create(item)
    }
    read(item,skip,limit){
        return this._database.read(item,skip,limit)
    }
    update(id,item){
        return this._database.update(id,item)
    }
    delete(item){
        return this._database.delete(item)
    }
    isConnected(){
        return this._database.isConnected()
    }
    static connect(){
        return this._database.isConnected()
    }
}

module.exports = ContextStrategy