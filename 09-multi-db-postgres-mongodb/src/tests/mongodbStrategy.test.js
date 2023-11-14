const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome : 'Goku',
    poder: 'Kaioken'
}
const context = new Context (new MongoDb())

describe('MongoDb Suite de Testes', function () {
    this.beforeAll(async () => {
        await context.connect()
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
})