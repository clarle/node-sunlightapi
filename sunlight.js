var qs      = require('querystring'),
    request = require('request'),
    async   = require('async');

var SunlightClient = exports.SunlightClient = function(apiKey) {
    this.key = apiKey;
    
    this.legislators = new LegislatorClient(this);
    this.committees = new CommitteeClient(this);
    this.districts = new DistrictClient(this);

    this._call = function(type, params, callback) {
        if (this.key === null) {
            throw new Error("Missing Sunlight Labs API key");
        }

        var query = qs.stringify(params);

        var uri = encodeURI("http://services.sunlightlabs.com/api/" + type + ".json?apikey=" + this.key + "&" + query);
        request(uri, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                var result = JSON.parse(body).response;
                _adjust(result, callback);
            } else {
                callback(new Error(body));
            }
        });
    };
};
    
// Necessary function to maintain async while adjusting object

var _adjust = function(obj, callback) {
    if (obj.legislator != null) {
        callback(obj.legislator);
    } else if (obj.legislators != null) {
        async.map(obj.legislators, function(i, cb) { 
            process.nextTick(function() {
              cb(null, i.legislator);
            });
          }, 
            function(err, results) {
              if (err) throw err;
              callback(results);
        });
    } else if (obj.results != null) {
        async.map(obj.results, function(i, cb) { 
            process.nextTick(function() {
              cb(null, i.result);
            });
          }, 
            function(err, results) {
              if (err) throw err;
              callback(results);
        });
    } else if (obj.committee != null) {
        callback(obj.committee);
    } else if (obj.committees != null) {
        async.map(obj.committees, function(i, cb) { 
            process.nextTick(function() {
              cb(null, i.committee);
            });
          },
            function(err, results) {
              if (err) throw err;
              callback(results);
        });
    } else if(obj.districts != null) {
        async.map(obj.districts, function(i, cb) {
            process.nextTick(function() {
              cb(null, i.district);
            });
          }, 
            function(err, results) {
              if (err) throw err;
              callback(results);
        });
    }
};

var LegislatorClient = function(parent) {
    this.parent = parent;
};

LegislatorClient.prototype = {
    get: function(query, callback) {
        this.parent._call('legislators.get', query, callback);     
    },
    getList: function(query, callback) {
        this.parent._call('legislators.getList', query, callback);
    },
    search: function(name, options, callback) {
        var query = { name: name };
        for (key in options) {
            query[key] = options[key];
        }
        this.parent._call('legislators.search', query, callback);
    },
    allForZip: function(zip, callback) {
        this.parent._call('legislators.allForZip', {zip: zip}, callback);
    },
    allForLatLong: function(latitude, longitude, callback) {
        this.parent._call('legislators.allForLatLong',  
                          {latitude: latitude, longitude: longitude}, callback);
    }
}

var CommitteeClient = function(parent) {
    this.parent = parent;
}

CommitteeClient.prototype = {
    get: function(id, callback) {
        this.parent._call('committees.get', {id: id}, callback);    
    },
    getList: function(chamber, callback) {
        this.parent._call('committees.getList', {chamber: chamber}, callback);
    },
    allForLegislator: function(bioguide_id, callback) {
        this.parent._call('committees.allForLegislator', 
                        {bioguide_id: bioguide_id}, callback);
    }
}

var DistrictClient = function(parent) {
    this.parent = parent;
}

DistrictClient.prototype = {
    getDistrictsFromZip: function(zip, callback) {
        this.parent._call('districts.getDistrictsFromZip', {zip: zip}, callback);
    },
    getDistrictFromLatLong: function(latitude, longitude, callback) {
        this.parent._call('districts.getDistrictFromLatLong',
                         {latitude: latitude, longitude: longitude}, callback);
    }
}
