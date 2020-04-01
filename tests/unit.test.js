const chai = require('chai')
const mongoose = require('mongoose')
const chaiAsPromised = require('chai-as-promised')
const expect = require('chai').expect
const should = require('chai').should()
chai.use(chaiAsPromised).should()

require ('../config/connection')
const {body} = require('./data')
const {commander} = require ('../svc')

// beforeEach(async () => {
//     const db = mongoose.connection
//     db.on('error', console.error.bind(console, 'connection error'))
//     db.once('open', () => {
//         console.log('test DB connected!')
//     })
// });
  
const defaultTimeout = 60 * 1000 

describe('TEST: .... ||', () => {
    it(`tests`, async () => {
        const result = await commander(body)
        expect(result).to.be.an('array')
        const {number_of_links} = body.options
        if (number_of_links) {
            expect(result.length).to.equal(number_of_links)
        }
    }).timeout(defaultTimeout)
})


