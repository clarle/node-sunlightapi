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

#### legislators.get and legislators.getList
    
legislators.get and legislators.getList both take any number of parameters and
return all legislators that match the provided criteria.  These parameters are
also the ones returned in each legislator object.  

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

### Committees methods

### Districts methods
