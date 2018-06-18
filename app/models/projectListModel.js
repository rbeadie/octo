define([
    "ko"
], function (
    ko
) {
    var 
    projectListModel = function() {
        var self = this;

        self.projectList = ko.observableArray([])

        // paging data properties - starts with the first 10 records
        self.firstRecord = ko.observable(0)
        self.numberOfRecords = ko.observable(10)

        self.projectListPage = ko.observableArray([])
        ko.computed(function(){
            self.projectListPage(self.projectList().slice(self.firstRecord(),(self.firstRecord() + self.numberOfRecords())))        
        }, self)
        
        
        self.lastRecord = ko.computed(function(){
            return self.firstRecord() + self.projectListPage().length
        }, self) 
        self.pageRecords = ko.computed(function(){
            return ('Records ').concat((self.firstRecord() + 1)).concat(' of ').concat(self.lastRecord())
        })
    
        // to select a record, set the index to something
        self.index = ko.observable()
        self.project = ko.computed(function(){        
                return self.projectList()[self.index()] || {}
            }, self)
        select = function(project){
            self.index(self.projectList.indexOf(project))        
        }

        
        // param data should be an array of json objects with the properties of the project model
        self.init = function(data){
            self.projectList(
                        // use an explicitly declared model to get access to computed observables, functions, etc
                        data.map(function(row){return new ProjectModel(row)})
                    )
        }

        self.spInit = function(spdata){
            self.projectList(
                spdata.map(mapSPrecord)
            )
        }

        nextIndex = function(){
            i = self.firstRecord() + self.numberOfRecords() >  self.projectList().length ? self.firstRecord() : self.firstRecord() + self.numberOfRecords()
            self.firstRecord(i)
            self.index(null)
        }
        prevIndex = function(){
            i = self.firstRecord() > self.numberOfRecords() ? self.firstRecord() - self.numberOfRecords() : 0
            self.firstRecord(i)
            self.index(null)
        }
    },

    projectModel = function (project) {

        var self = this;

        self.projectId = project.projectId
        self.projectName = ko.observable(project.projectName)
        self.projectDescription = ko.observable(project.projectDescription)
        self.businessUnit = ko.observable(project.businessUnit)
        self.projectNumber = ko.observable(project.projectNumber)
        self.projectManager = ko.observable(project.projectManager)
        self.customer = ko.observable(project.customer)
        self.customerDetail = ko.observable(project.customerDetail)
        self.contractType = ko.observable(project.contractType)
        self.contractValue = ko.observable(project.contractValue)
        self.practices = ko.observableArray(project.practices)

    },

    // This function maps the SharePoint List Fields onto the knockout model. The field name should be the internal name (not display name)
    mapSPrecord = function(sprecord){
        var row = {}
        
        row.projectId = sprecord.ID
        row.projectName = sprecord.Title
        row.projectDescription = sprecord.CategoryDescription
        row.businessUnit = sprecord.BusinessUnit == null ? null : sprecord.BusinessUnit.get_lookupValue()
        row.projectNumber = sprecord.ProjectNumber
        row.projectManager = sprecord.ProjectManager == null ? null : sprecord.ProjectManager.get_lookupValue()
        row.customer = sprecord.Customer.count > 0 ? sprecord.Customer[0].get_lookupValue() : null
        row.customerDetail = sprecord.CustomerDetail
        row.contractType = sprecord.ContractType == null ? null : sprecord.ContractType.get_lookupValue()
        row.contractValue = sprecord.ContractValue
        row.practices = sprecord.Practices.count > 0 ? sprecord.Practices.map(function(p){console.log('practice',p); return p.get_lookupValue()}) : null
        
        console.log('mapping project',row)
        return new projectModel(row)
    
    };

    return projectListModel;
});