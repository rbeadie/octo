const ko = require('knockout')
const komapping = require('knockout-mapping')
const projectModel = require('./projectModel')

function ProjectListModel() {
    var self = this
    
    self.projectList = ko.observableArray([])

    // paging data properties - starts with the first 10 records
    self.firstRecord = ko.observable(0)
    self.numberOfRecords = ko.observable(10)


    self.projectListPage = ko.observableArray([])
    ko.computed(_ => {
        self.projectListPage(self.projectList().slice(self.firstRecord(),(self.firstRecord() + self.numberOfRecords())))        
    }, self)
    
    self.lastRecord = ko.computed(_ =>{
        return self.firstRecord() + self.projectListPage().length
    }, self) 
    self.pageRecords = ko.computed(_ => {
        return ('Records ').concat((self.firstRecord() + 1)).concat(' of ').concat(self.lastRecord())
    })

    // to select a record, set the index to something
    self.index = ko.observable()
    self.project = ko.computed(_ =>{        
            return self.projectList()[self.index()] || {}
        }, self)
    select = function(project){
        self.index(self.projectList.indexOf(project))        
    }

    // param data should be an array of json objects with the properties of the project model
    self.init = function(data){
        self.projectList(
                    // use an explicitly declared model to get access to computed observables, functions, etc
                    data.map(row => {return new projectModel(row)})
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
}


module.exports = ProjectListModel
