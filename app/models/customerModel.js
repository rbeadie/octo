define([
    "ko"
], function (
    ko
) 
{
    var 
    customerListModel = function() {
        var self = this;

        self.customers = ko.observableArray([]);

        self.init = function(data){
            self.customers(
                data.map(function(row){return new customerModel(row)})
            )
        }

        self.spInit = function(spdata){
            self.customers(
                spdata.map(mapSPrecord)
            )
        }

    },

    customerModel = function (customer) {

        var self = this;

        self.customerId = customer.customerId
        self.customerName = ko.observable(customer.customerName)
        self.customerCode = ko.observable(customer.customerCode)
        self.customerDescription = ko.observable(customer.customerDescription)

    },
    
    // This function maps the SharePoint List Fields onto the knockout model. The field name should be the internal name (not display name)
    mapSPrecord = function(sprecord){
        var row = {}

        row.customerId = sprecord.ID
        row.customerName = sprecord.FullName
        row.customerCode = sprecord.Title

        return new customerModel(row)

    }

    return customerListModel;
});