//npm install mongoose
const Mongoose = require('mongoose')
Mongoose.connect('mongodb://luiz:dias@192.168.2.184:27017/herois')
    .catch(error => {
        if(!error)return;
        console.log('Falha na conexão!', error)
    })

const connection = Mongoose.connection
connection.once('open', () => console.log('database rodando!!'))

// const state = connection.readyState
// console.log('state',state)
/*
    0:Disconectado
    1:Conectado
    2:Conectando
    3:disconectando
*/

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
const model = Mongoose.model('herois', heroiSchema)


async function main(){
    try {
        const resultCadastrar = await model.create({
            nome: 'Kuririn',
            poder: 'Solar Flare'
        })
        console.log('resultado cadastrar', resultCadastrar)
        
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
    }
    try {
        const listItens = await model.find({},{ nome: 1, _id: 0})
        console.log('items', listItens)
    } catch (error) {
        console.error('Erro ao Buscar lista:', error);
    }
}
main()