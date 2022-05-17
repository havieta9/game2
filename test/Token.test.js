const Token = artifacts.require('./Token.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Token', (accounts) => { 

    let token

    before(async () => {
        token = await Token.deployed()
    })
  
    describe('deplyment', async () => {
        it('deploys successfully', async () => {
            const address = token.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async () => {
            const name = await token.name()
            assert.equal(name, 'CryptoMon')
        })

        it('has a symbol', async () => {
            const symbol = await token.symbol()
            assert.equal(symbol, 'CYMON')
        })
    })

    describe('token distribution', async () => {
        let reuslt

        it('mint token', async () => {
            await token.mint(500, 5, 5, 5, 5, 5, 5, 1)
            // it should increase the total supply
            result = await token.getTotalSupply()
            assert (result, '1')
        })
    })
})