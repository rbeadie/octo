define([
    "ko"
    , "./projectModel"
], function (
    ko
    , ProjectModel
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
                        data.map(function(row){return new projectModel(row)})
                    )
        }

        self.addProject = function(project){
            self.projectList().concat(project)

            return self.index(self.projectList.indexOf(project))  
        }

        self.newProject = function(){
            var project = new projectModel({projtectId: 0})
            self.projectList().concat(project)

            return self.index(self.projectList.indexOf(project))  
        }

        self.spInit = function(spdata){
            self.projectList(
                // spdata.map(mapSPrecord)
                spdata.map(function(row){
                    var pm = new ProjectModel()
                    
                    return pm.initFromSP(row)
                })
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

    return projectListModel
});