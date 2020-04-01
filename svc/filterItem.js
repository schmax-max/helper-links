module.exports = {filterItem}

function filterItem (item, options, links) {
  const filter = filterForCleanLinks(item) 
  && filterForShortLinks (item, options)
  && filterForInclusionIdentifiers (item, options)
  && filterForExclusionIdentifiers (item, options)
  && filterForCap (options, links)
  return filter
}
            
function filterForInclusionIdentifiers (item, {link_includer}) {
  let include = true
  if (link_includer) {
    const linkIncluderArray = link_includer.split(',')
    const linkIncluders = new RegExp(linkIncluderArray.join('|'))
    include = item.match(linkIncluders)
  }
  return include
}

function filterForExclusionIdentifiers (item, {link_excluder}) {
  let include = true
  if (link_excluder) {
    const linkExcluderArray = link_excluder.split(',')
    const linkExcluderString = linkExcluderArray.join('|')
    console.log({link_excluder, linkExcluderArray, linkExcluderString})
    const linkExcluders = new RegExp(linkExcluderString)
    
    include = !item.match(linkExcluders)
  }
  return include
}

function filterForCap ({number_of_links}, links) {
  let include = true
  if (number_of_links > 0) {
      include = links.length < number_of_links
  }
  return include
}

function filterForShortLinks (item, {remove_short_links = true}) {
  let include = true
  if (remove_short_links) {
    include = item.split('-').length > 3
  } 
  return include
}


function filterForCleanLinks (link) {
  const exclusion = [
    '/privacy',
    '/legal',
    '/terms',
    '/sign-in',
    '/donate',
    '/contact',
    '/about',
    '/assets',
    '/staff',
    '/writer',
    '/author',
    'mailchimp.com',
    'facebook.com',
    'twitter.com',
    'instagram.com',
    'pinterest.com',
    'google.com',
    '.ico',
    '.rss',
    '.png',
    '.svg',
    '.woff2',
    '.json',
    '.js',
    '.xml',
    '.css',
    "\\",
    "\n",
    "\t",
  ]
  const exclusionRegex = new RegExp (exclusion.join('|'))
  return !link.match(exclusionRegex)
}