define([
    "ko"
], function (
    ko
) {
    var 
    ProjecModel = function (project){
        var self = this;
    
        self.projectId = project.projectId  
        self.projectName = ko.observable(project.projectName)
        self.businessUnit = ko.observable(project.businessUnit)
        self.customer = ko.observable(project.customer)
        self.customerDetail = ko.observable(project.customerDetail)
        self.contractType = ko.observable(project.contractType)
        self.practice = ko.observable(project.practice)
        self.contractValue = ko.observable(project.contractValue)
    
     }

    return ProjecModel;
});
