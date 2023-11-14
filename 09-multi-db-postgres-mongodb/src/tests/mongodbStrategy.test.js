const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome : 'Goku',
    poder: 'Kaioken'
}
const MOCK_HEROI_ATUALIZAR = {
    nome : 'BILLS',
    poder: 'Destruição'
}
const context = new Context (new MongoDb())
let MOCK_HEROI_ID = ''
describe('MongoDb Suite de Testes', function () {
    this.beforeAll(async () => {
        await context.connect()
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id;
    })

    it('verificar conexão', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'
        assert.deepEqual(result, expected)
    })

    it('cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async () => {
        const [{nome,poder}] = await context.read( {nome: MOCK_HEROI_CADASTRAR.nome} )
        const result = {
            nome,
            poder
        }
        assert.deepEqual(result,MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async () => {
        const result = await context. update(MOCK_HEROI_ID, {
            nome: 'Majin Buu'
        })
        console.log()

        assert.deepEqual(result.modifiedCount, 1)
    })
})