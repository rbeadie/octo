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

    },

    practiceModel = function (practice) {

        var self = this;

        self.practiceId = practice.practiceId
        self.practiceName = ko.observable(practice.name)
        self.practiceCode = ko.observable(practice.code)
        self.practicePortfolio = ko.observable(practice.portfolio)
        self.practiceDescription = ko.observable(practice.description)

    };

    return practiceListModel;
});