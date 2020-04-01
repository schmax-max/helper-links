const axios = require('axios')
const URL = require('url')
const {filterItem} = require('./filterItem')
const {validateReq} = require('./validateReq')

module.exports = {master, commander}

async function master (req = {}) {
  if (validateReq(req)) {
    try {
      return await commander (req.body)
    } catch(e) {
      console.log({e})
      return
    }
  } else {
    return
  }
}

async function commander ({url, options = {}}) {
  
  let {data} = await axios({
    method: 'get',
    url,
    timeout: 0.2 * 60 * 1000 // 0.2 minutes
  })
  data = removeIrrelevantData (data, options)

  const {hostname} = URL.parse(url)
  const protocol = url.split('://')[0]
  const linkArray = data.split('href')
  linkArray.shift()
  let processed = {}
  let links = []
  linkArray.forEach((item) => {
    item = item.split('"')[1]
    if (item) {
      item = item.split('"')[0]
      if (!item.includes('http')) {
        item = `${protocol}://${hostname}${item}`
      }
      if (!processed[item]) {
        processed[item] = true
        if (filterItem(item, options, links)) {
          item = removeReferral (item, options)
          links.push(item)
        }
      }
    }
  })
  return links
}



function removeReferral (item, {remove_referral = true}, hostname) {
  const useReferrals = [
    'medium.com',
    'getpocket.com',
    'youtube.com',
    'youtu.be',
  ]

  const useReferralsRegex = new RegExp (useReferrals.join('|'))

  const c1 = remove_referral
  const c2 = !item.match(useReferralsRegex)

  // console.log({c1, c2})

  if (remove_referral && !item.match(useReferralsRegex)) {
    return item.split('?')[0]
  } else {
    return item
  }
}


function removeIrrelevantData (data, {beginning_identifier, end_identifier}) {
  if (beginning_identifier) {
    if (data.split(beginning_identifier)[1]) {
      data = data.split(beginning_identifier)[1]
    } else {
      data = ''
      console.log(`beginning identifier ${beginning_identifier} not working properly`)
    }
  }
  if (end_identifier) {
    if (data.split(end_identifier)[1]) {
      data = data.split(end_identifier)[0]
    } else {
      data = ''
      console.log(`end identifier ${end_identifier} not working properly`)
    }
  }
  return data
}



