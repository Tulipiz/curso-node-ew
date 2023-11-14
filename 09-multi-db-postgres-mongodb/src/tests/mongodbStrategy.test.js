const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context (new MongoDb())

describe('MongoDb Suite de Testes', () => {
    it('verificar conexão', async () => {
        const result = await context.isConnected()
        const expected = 'Conectado'
    })
})