const ICrud = require('./interfaces/interfaceCrud');
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
        const state =  STATUS[this._driver.readyState]
        if(state == 'Conectado') return state;

        if(state !== 'Conectado') return state
        await new Promisse(resolve => setTimeout(resolve,2000))
        
        return  STATUS[this._driver.readyState]
    }
    defineModel() {
        heroiSchema = new Mongoose.Schema({
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
        const Mongoose = require('mongoose');
        Mongoose.connect(
            'mongodb://luiz:dias@192.168.2.184:27017/herois'
        ).catch((error) => {
            if (!error) return;
            console.log('Falha na conexão!', error);
        });

        const connection = Mongoose.connection;
        connection.once('open', () => console.log('database rodando!!'));

        this._driver = connection
    }

    async create(item) {
        try {
            const resultCadastrar = await model.create({
                nome: 'Kuririn',
                poder: 'Solar Flare'
            })
            console.log('resultado cadastrar', resultCadastrar)
            
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
        }
    }
}

module.exports = MongoDB;
