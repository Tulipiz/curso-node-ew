const assert = require('assert')
const Postgres = require('./../db/strategies/postgres')
const Context = require('./../db/strategies/base/contextStrategy')

const context = new Context (new Postgres())

describe('Postgrres Strategy', function () {
    this.timeout(Infinity)
    it('PostgresSQL Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
})