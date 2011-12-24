var qs      = require('querystring'),
    request = require('request');

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
                callback(result);
            } else {
                callback(new Error(body));
            }
        });
    }        
}

var LegislatorClient = function(parent) {
    this.parent = parent;
}

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
