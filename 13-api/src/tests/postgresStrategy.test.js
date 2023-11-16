const assert = require('assert')
const Postgres = require('../db/strategies/postgres/postgres')
const HeroiSchema = require('../db/strategies/postgres/schemas/heroiSchema')
const Context = require('../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Gavião negro',
    poder: 'flexas'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: 'BATMAN',
    poder: 'DINHEIRO'
}

let context = {}

describe('Postgrres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async function (){
        
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroiSchema)
        context = new Context(new Postgres(connection,model))
        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })

    it('PostgresSQL Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    
    it('cadastrar', async function() {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async function(){
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete result.id
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async function(){
        const [itemAtualizar] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR,
            nome: 'Homem de Ferro'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({id: itemAtualizar.id})
        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.nome, novoItem.nome)
    })
    it('remover por id', async function(){
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})