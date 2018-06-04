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

    },

    contractTypeModel = function (contractType) {

        var self = this;

        self.contractTypeId = contractType.contractTypeId
        self.contractTypeName = ko.observable(contractType.name)

    };

    return contractTypeListModel;
});