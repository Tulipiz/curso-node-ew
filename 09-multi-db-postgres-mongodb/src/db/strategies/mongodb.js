const ICrud = require('./interfaces/interfaceCrud');
const Mongoose = require('mongoose')
const STATUS ={
    0:'Disconectado',
    1:'Conectado',
    2:'Conectando',
    3:'disconectando',
}
class MongoDB extends ICrud {
    constructor() {
        super();
        this._herois = null
        this._driver = null;
        this.connect()
    }
    async isConnected() {
        const state =  await STATUS[this._driver.readyState]
        if(state == 'Conectado') return state;

        if(state !== 'Conectando') return state
        await new Promise(resolve => setTimeout(resolve,1000))
        
        return  await STATUS[this._driver.readyState]
    }
    defineModel() {
        const heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        this._herois = Mongoose.model('herois', heroiSchema)
    }
    connect() {
        Mongoose.connect(
            'mongodb://luiz:dias@192.168.2.184:27017/herois'
        ).catch((error) => {
            if (!error) return;
            console.log('Falha na conexão!', error);
        });

        const connection = Mongoose.connection;
        this._driver = connection
        connection.once('open', () => console.log('database rodando!!'));
        this.defineModel()
        
    }

    async create(item) {
        return await this._herois.create(item);
    }
    read(item, skip=0,limit=10){
        return this._herois.find(item).skip(skip).limit(limit)
    }
    update(id, item){
        return this._herois.updateOne({_id: id}, {$set: item})
    }
    delete(id){
        return this._herois.deleteOne({_id:id})
    }
}

module.exports = MongoDB;
