define([
    "ko"
], function (
    ko
) 
{
    var 
    contractTypeListModel = function() {
        var self = this;

        self.contractTypes = ko.observableArray([]);

        self.init = function(data){
            self.contractTypes(
                data.map(function(row){return new contractTypeModel(row)})
            )
        }

        self.spInit = function(spdata){
            self.contractTypes(
                spdata.map(mapSPrecord)
            )
        }
    },

    contractTypeModel = function (contractType) {

        var self = this;

        self.contractTypeId = contractType.contractTypeId
        self.contractTypeName = ko.observable(contractType.contractTypeName)

    },

    // This function maps the SharePoint List Fields onto the knockout model. The field name should be the internal name (not display name)
    mapSPrecord = function(sprecord){
        var row = {}

        row.contractTypeId = sprecord.ID
        row.contractTypeName = sprecord.Title

        return new contractTypeModel(row)
    
    };

    return contractTypeListModel;
});