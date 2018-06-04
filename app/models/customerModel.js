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

    },

    customerModel = function (customer) {

        var self = this;

        self.customerId = customer.customerId
        self.customerName = ko.observable(customer.name)
        self.customerCode = ko.observable(customer.code)
        self.customerDescription = ko.observable(customer.description)

    };

    return customerListModel;
});