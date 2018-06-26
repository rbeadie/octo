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

        self.findSPProject = function(data){
            console.log('data in', data)
            var find = mapSPrecord(data)
            console.log('ko result', find)
            self.projectList().forEach(function(item){
                if (find.Title == item.Title) console.log('found', item) }
            )
            
        }

        self.modifyProject = function(data){
            // locate the project in the list

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
        self.placeOfPerformance = ko.observable(project.placeOfPerformance)
        self.primeContractor = ko.observable(project.primeContractor)
        self.primeContractorName = ko.observable(project.primeContractorName)
        self.securityClearedWork = ko.observable(project.securityClearedWork)
        self.securitySCIF = ko.observable(project.securitySCIF)
        self.technicalLead = ko.observable(project.technicalLead)

        self.createdBy = ko.observable(project.createdBy)
        self.updatedBy = ko.observable(project.updatedBy)
        self.created = ko.observable(project.created)
        self.updated = ko.observable(project.updated)

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
        row.technicalLead = sprecord.TechnicalLead == null ? null : sprecord.TechnicalLead.get_lookupValue()
        row.customer = sprecord.Customer == null || sprecord.Customer[0] == null ? null : sprecord.Customer[0].get_lookupValue()
        row.customerDetail = sprecord.CustomerDetail
        row.contractType = sprecord.ContractType == null ? null : sprecord.ContractType.get_lookupValue()
        row.placeOfPerformance = sprecord.PlaceofPerformance
        row.primeContractor = sprecord.PrimeContractor
        row.primeContractorName = sprecord.PrimeContractorName
        row.securityClearedWork = sprecord.SecurityClearedWork
        row.securitySCIF = sprecord.SecuritySCIF
        row.contractValue = sprecord.ContractValue
        row.practices = sprecord.Practices != null && sprecord.Practices.count > 0 ? sprecord.Practices.map(function(p){return p.get_lookupValue()}) : null

        row.createdBy = sprecord.Author == null ? null : sprecord.Author.get_lookupValue()
        row.updatedBy = sprecord.Editor == null ? null : sprecord.Editor.get_lookupValue()
        row.created = sprecord.Created == null ? null : sprecord.Created
        row.updated = sprecord.Modified == null ? null : sprecord.Modified

        return new projectModel(row)
    
    };

    return projectListModel;
});