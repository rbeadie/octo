define([
    "ko"
], function (
    ko
) 
{
    var 
    practiceListModel = function() {
        var self = this;

        self.practices = ko.observableArray([]);

        self.init = function(data){
            self.practices(
                data.map(function(row){return new practiceModel(row)})
            )
        }

        self.spInit = function(spdata){
            self.practices(
                spdata.map(mapSPrecord)
            )
        }

    },

    practiceModel = function (practice) {

        var self = this;

        self.practiceId = practice.practiceId
        self.practiceName = ko.observable(practice.practiceName)
        self.practiceCode = ko.observable(practice.practiceCode)
        self.practicePortfolio = ko.observable(practice.practicePortfolio)
        self.practiceDescription = ko.observable(practice.practiceDescription)

    },

    // This function maps the SharePoint List Fields onto the knockout model. The field name should be the internal name (not display name)
    mapSPrecord = function(sprecord){
        var row = {}

        row.practiceId = sprecord.ID
        row.practiceName = sprecord.Title
        row.practiceCode = sprecord.Code
        row.practicePortfolio = sprecord.Portfolio
        row.practiceDescription = sprecord.CategoryDescription

        return new practiceModel(row)
    
    };

    return practiceListModel;
});