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
  * legislators.search(name, options, callback)
  * legislators.allForZip(zip, callback)
  * legislators.allForLatLong(latitude, longitude, callback)

#### get/getList
    
legislators.get and legislators.getList both take a JavaScript object representing the query parameters and a callback function.  They return all legislators that match the provided criteria.  These parameters are also the ones returned in each legislator object.  

All available parameters can be found in the [documentation](http://services.sunlightlabs.com/docs/congressapi/legislators.get%28List%29).

To get the represenative that represents NC-4:

``` js
  sunlight.legislators.get({state: 'NC', district: '4'}, function(rep) {
    console.log(rep.title + '. ' + rep.firstname + ' ' + rep.lastname);
  });
  // Rep. David Price
```

legislators.getList works much the same way, but reutrns a list. It is possible to do a more complex query, for instance, "all legislators from New York that are Republicans":

``` js
  sunlight.legislators.getList({state: 'NY', party='R'}, function(reps) {
    for (i in reps) {
      console.log(reps[i].title + '. ' + reps[i].firstname + ' ' + reps[i].lastname);
    }
  });
  // Rep. Pete King
  // Rep. Christopher Lee
```

#### search

legislators.search allows you to query the database with a less than perfect representation of a legislator's name.

The search is tolerant of use of nicknames, lastname-firstname juxtaposition, initials and minor misspellings. The return is a set of results that include legislator records as well as certainity scores between 0 and 1 (where 1 is most certain).

Search takes two optional parameters:

* threshold: the minimum score you want to return, the default is 0.8 and you should rarely go lower than 0.7.

* all_legislators: if True will search legislators in the API that are no longer in office (default is False)

An example use of search is as follows:

``` js
  sunlight.legislators.search('Menondaz', {threshold: 0.8}, function(sen) {
    sen = sen[0].legislator;
    console.log(sen.title + '. ' + sen.firstname + ' ' + sen.lastname);
  });
  // Sen. Robert Menendez
```

#### allForZip

legislators.allForZip retrieves all legislators that represent a given zipcode.

This typically means two senators and one (or more) representatives.

To get all legislators that represent the 27511 zipcode:

``` js
  sunlight.legislators.allForZip('27511', function(legs) {
    for (i in legs) {
      console.log(legs[i].title + '. ' + legs[i].firstname + ' ' + legs[i].lastname);
    }
  });
  // Rep. David Price
  // Sen. Kay Hagan
  // Sen. Richard Burr
  // Rep. Brad Miller
```

#### allForLatLong

legislators.allForLatLong retrieves all legislators representing a given point.

This is a shortcut for calling districts.getDistrictFromLatLong and then looking up the district representative and state senators.

To get all legislators that represent a location in western PA at 41.92, -80.14:

``` js
  sunlight.legislators.allForLatLong(41.92, -80.14, function(legs) {
    for (i in legs) {
      console.log(legs[i].title + '. ' + legs[i].firstname + ' ' + legs[i].lastname);
    }
  });
  // Sen. Bob Casey
  // Sen. Arlen Specter
  // Rep. Kathy Dahlkemper
```

### Committees methods

#### The committees namespace is comprised of three functions:

  * committee.get(id, callback)
  * committee.getList(chamber, callback)
  * committee.allForMember(bioguide_id, callback)

#### get

committee.get gets full details for a given committee, including membership and subcommittees.

Example of getting details for a committee:

``` js
  sunlight.committee.get('HSAG', function(com) {
    console.log(com.name);
  });
  // House Committee on Agriculture
```

#### getList

committee.getList gets all committees for a given chamber (House, Senate, or Joint).

To see all joint committees for the current Congress:

``` js
  sunlight.committee.getList('Joint', function(coms) {
    for (i in coms) {
      console.log(coms[i].name);
    }
  });
  // Joint Economic Committee
  // Joint Committee on Printing
  // Joint Committee on Taxation
  // Joint Committee on the Library
```

#### allForLegislator

All for legislator shows all of a legislator's committee and subcommittee memberships.

Showing all of a legislator's committees:

``` js
  sunlight.committees.allForLegislator('S000148', function(coms) {
    for (i in coms) {
      console.log(coms[i].name);
    }
  });
  // Senate Committee on Rules and Administration
  // Senate Committee on Finance
  // Joint Committee on the Library
  // Joint Economic Committee
  // Senate Committee on the Judiciary
  // Joint Committee on Printing
  // Senate Committee on Banking, Housing, and Urban Affairs
```

### Districts methods

#### The districts namespace is comprised of two functions:

  * districts.getDistrictsFromZip(zip, callback)
  * districts.getDistrictFromLatLong(latitude, longitude, callback)

#### getDistrictsFromZip

districts.getDistrictsFromZip fetches all districts that overlap a given zipcode.

To get all districts that overlap 14623:

``` js
  sunlight.districts.getDistrictsFromZip('14623', function(dists) {
    for (i in dists) {
        console.log(dists[i]);
    }
  });
// NY-29
// NY-28
```
#### getDistrictFromLatLong

districts.getDistrictFromLatLong finds the district that a given lat-long coordinate pair falls within.

To find out what district 61.13 N, 149.54 W falls within:

``` js
  sunlight.districts.getDistrictFromLatLong(61.13, 149.54, function(dists) {
    console.log(dists[0]);
  });
  // AK-0
```
