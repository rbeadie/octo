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

        self.spInit = function(spdata){
            self.businessUnits(
                spdata.map(mapSPrecord)
            )
        }
    },

    businessUnitModel = function (businessUnit) {

        var self = this;

        self.businessUnitId = businessUnit.businessUnitId
        self.businessUnitName = ko.observable(businessUnit.businessUnitName)
        self.businessUnitCode = ko.observable(businessUnit.businessUnitCode)
        self.businessUnitDescription = ko.observable(businessUnit.businessUnitDescription)

    },

    // This function maps the SharePoint List Fields onto the knockout model. The field name should be the internal name (not display name)
    mapSPrecord = function(sprecord){
        var row = {}

        row.businessUnitId = sprecord.ID
        row.businessUnitName = sprecord.FullName
        row.businessUnitCode = sprecord.Title
        row.businessUnitDescription = sprecord.CategoryDescription

        return new businessUnitModel(row)
    
    };



    return businessUnitListModel;
});