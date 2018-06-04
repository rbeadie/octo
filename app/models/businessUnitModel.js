define([
    "ko"
], function (
    ko
) 
{
    var 
    businessUnitListModel = function() {
        var self = this;

        self.businessUnits = ko.observableArray([]);

        self.init = function(data){
            self.businessUnits(
                data.map(function(row){return new businessUnitModel(row)})
            )
        }

    },

    businessUnitModel = function (businessUnit) {

        var self = this;

        self.businessUnitId = businessUnit.businessUnitId
        self.businessUnitName = ko.observable(businessUnit.name)
        self.businessUnitCode = ko.observable(businessUnit.code)
        self.businessUnitDescription = ko.observable(businessUnit.description)

    };

    return businessUnitListModel;
});