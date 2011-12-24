var SunlightClient = require('../sunlight').SunlightClient;

var sunlight = new SunlightClient("YOUR_API_KEY");

exports.testLegislators = {
    
    get: function(test) { 
        sunlight.legislators.get({lastname: "Menendez"}, function(sen) {
            sen = sen.legislator;
            test.equal(sen.firstname, "Robert");
            test.done();
        });
    },
    
    getList: function(test) {
        sunlight.legislators.getList({state: "NJ", title: "Sen"}, function(sens) {
            test.equal(2, sens["legislators"].length);
            test.done();
        });
    },

    searchSuccess: function(test) {
        sunlight.legislators.search("Menondaz", {threshold: 0.8}, function(sen) {
            sen = sen.results[0].result.legislator;
            test.equal(sen.firstname, "Robert");
            test.done();
        });
    },
    
    searchFailure: function(test) {
        sunlight.legislators.search("Menondaz", {threshold: 0.9}, function(sen) {
            test.equal(sen.results.length, 0);
            test.done();
        });
    },

    allForZip: function(test) {
        sunlight.legislators.allForZip("07039", function(legs) {
            test.equal(legs.legislators.length, 5);
            test.done();
        });
    },

    allForLatLong: function(test) {
        sunlight.legislators.allForLatLong(40.78861, -74.32139, function(legs) {
            test.equal(legs.legislators.length, 3);
            test.done();
        });
    }
}

exports.testCommittees = {
    get: function(test) {
        sunlight.committees.get("JSPR", function(com) {
            test.equal(com.committee.name, "Joint Committee on Printing");
            test.done();
        });
    },

    getList: function(test) {
        sunlight.committees.getList("Joint", function(coms) {
            test.equal(coms.committees.length, 4);
            test.done();
        });
    },

    allForLegislator: function(test) {
        sunlight.committees.allForLegislator("S000148", function(coms) {
            test.equal(coms.committees.length, 7);
            test.done();
        });
    }
}

exports.testDistricts = {
    getDistrictsFromZip: function(test) {
        sunlight.districts.getDistrictsFromZip("07039", function(dists) {
            test.equal(dists.districts.length, 3);
            test.done();
        });
    },
    getDistrictFromLatLong: function(test) {
        sunlight.districts.getDistrictFromLatLong(35.778788, -78.787805, function(dist) {
            test.equal(dist.districts[0].district.state, "NC");
            test.done();
        });
    }
}
