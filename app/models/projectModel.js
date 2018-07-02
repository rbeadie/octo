define([
    "ko"
], function (
    ko
) {
    var  

    projectModel = function () {
        var self = this;
    
        self.isDirty = ko.observable(false)
        self.errors = ko.observableArray()

        self.projectId = ko.observable()
        self.projectName = ko.observable()
        self.projectDescription = ko.observable()
        self.businessUnit = ko.observable()
        self.projectNumber = ko.observable()
        self.projectManager = ko.observable()
        self.customer = ko.observable()
        self.customerDetail = ko.observable()
        self.contractType = ko.observable()
        self.contractValue = ko.observable()
        self.contractFTEs = ko.observable()
        self.practices = ko.observableArray()
        self.placeOfPerformance = ko.observable()
        self.primeContractor = ko.observable()
        self.primeContractorName = ko.observable()
        self.securityClearedWork = ko.observable()
        self.securitySCIF = ko.observable()
        self.technicalLead = ko.observable()

        self.createdBy = ko.observable()
        self.updatedBy = ko.observable()
        self.created = ko.observable()
        self.updated = ko.observable()

        self.init = function(project){
            self.projectId(project.projectId)
            self.projectName(project.projectName)
            self.projectDescription(project.projectDescription)
            self.businessUnit(project.businessUnit)
            self.projectNumber(project.projectNumber)
            self.projectManager(project.projectManager)
            self.customer(project.customer)
            self.customerDetail(project.customerDetail)
            self.contractType(project.contractType)
            self.contractValue(project.contractValue)
            self.contractFTEs(project.contractFTEs)
            self.practicesArray(project.practices)
            self.placeOfPerformance(project.placeOfPerformance)
            self.primeContractor(project.primeContractor)
            self.primeContractorName(project.primeContractorName)
            self.securityClearedWork(project.securityClearedWork)
            self.securitySCIF(project.securitySCIF)
            self.technicalLead(project.technicalLead)
    
            self.createdBy(project.createdBy)
            self.updatedBy(project.updatedBy)
            self.created(project.created)
            self.updated(project.updated)
        }

        // This function maps the SharePoint List Fields onto the knockout model. The field name should be the internal name (not display name)
        self.initFromSP = function(sprecord){

            self.projectId(sprecord.ID)
            self.projectName(sprecord.Title)
            self.projectDescription(sprecord.ProjectDescription)
            self.businessUnit(sprecord.BusinessUnit == null ? null : sprecord.BusinessUnit.get_lookupValue())
            self.projectNumber(sprecord.ProjectNumber)
            self.projectManager(sprecord.ProjectManager == null ? null : sprecord.ProjectManager.get_lookupValue())
            self.technicalLead(sprecord.TechnicalLead == null ? null : sprecord.TechnicalLead.get_lookupValue())
            self.customer(sprecord.Customer == null || sprecord.Customer[0] == null ? null : sprecord.Customer[0].get_lookupValue())
            self.customerDetail(sprecord.CustomerDetail)
            self.contractType(sprecord.ContractType == null ? null : sprecord.ContractType.get_lookupValue())
            self.placeOfPerformance(sprecord.PlaceofPerformance)
            self.primeContractor(sprecord.PrimeContractor)
            self.primeContractorName(sprecord.PrimeContractorName)
            self.securityClearedWork(sprecord.SecurityClearedWork)
            self.securitySCIF(sprecord.SecuritySCIF)
            self.contractValue(sprecord.ContractValue)
            self.contractFTEs(sprecord.ContractFTEs)
            self.practices(sprecord.Practices.map(function(p){return p.get_lookupValue()}))
    
            self.createdBy(sprecord.Author == null ? null : sprecord.Author.get_lookupValue())
            self.updatedBy(sprecord.Editor == null ? null : sprecord.Editor.get_lookupValue())
            self.created(sprecord.Created == null ? null : sprecord.Created)
            self.updated(sprecord.Modified == null ? null : sprecord.Modified)
            return self
        }

    }



    return projectModel
})