require('./config/connection')

const {body} = require('./tests/data')
const {commander} = require('./svc')
commander(body).then((res) => {
  console.log({res})
})


