# node-sunlightapi

A Node.js client library for the [Sunlight Labs Congress API](http://services.sunlightlabs.com/docs/Sunlight_Congress_API/).

## Installation from NPM

``` bash
  $ [sudo] npm install sunlight
```

## Usage

Initialize the API by creating a client and passing your API key as a parameter.
If you don't have an API key, you can get one [here](http://services.sunlightlabs.com/accounts/register/).

``` js
  var SunlightClient = require('sunlight').SunlightClient;
  
  var sunlight = new SunlightClient("YOUR_API_KEY");
```

### Legislators methods

#### The legislators namespace is comprised of several functions:

  * legislators.get(params, callback)
  * legislators.getList(params, callback)
  * legislators.search(name, callback)
  * legislators.allForZip(zip, callback)
  * legislators.allForLatLong(latitude, longitude, callback)

#### get/getList
    
legislators.get and legislators.getList both take a JavaScript object representing the query parameters and a callback function.  They return all legislators that match the provided criteria.  These parameters are also the ones returned in each legislator object.  

The available parameters are:
  * title
  * firstname
  * middlename
  * lastname
  * name_suffix
  * nickname
  * party
  * state
  * district
  * in_office
  * gender
  * birthdate
  * phone
  * fax
  * website
  * webform
  * email
  * congress_office
  * bioguide_id
  * votesmart_id
  * fec_id
  * govtrack_id
  * crp_id
  * eventful_id
  * congresspedia_url
  * twitter_id
  * official_rss
  * youtube_url
  * senate_class
  * birthdate

To get the represenative that represents NC-4:

``` js
  var rep = sunlight.legislators.get({state: 'NC', district: '4'}, function(rep) {
    console.log(rep.firstname + rep.lastname);
  }
  // David Price
```

legislators.getList works much the same way, but reutrns a list. It is possible to do a more complex query, for instance, "all legislators from New York that are Republicans":
  
### Committees methods

### Districts methods
