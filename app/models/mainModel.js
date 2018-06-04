define([
    "ko"
    , "./practiceModel"
    , "./customerModel"
    , "./contractTypeModel"
    , "./businessUnitModel"
    , "./projectListModel"
], function (
    ko
    , PracticeModel
    , CustomerModel
    , ContractTypeModel
    , BusinessUnitModel
    , ProjectListModel
) {
    return function mainModel () {
        var self = this

        self.modelName = ko.observable('main model')

        self.practiceList = new PracticeModel()
        self.customerList = new CustomerModel()
        self.contractTypeList = new ContractTypeModel()
        self.buList = new BusinessUnitModel()
        self.projectList = new ProjectListModel()

        // self.projectListModel = new ProjectListModel()
 
        // Actions    
        self.loadPractices = function(practices){
            self.practiceList.init(practices)
        }
        self.loadCustomers = function(customers){
            self.customerList.init(customers)
        }
        self.loadContractTypes = function(contractTypes){
            self.contractTypeList.init(contractTypes)
        }
        self.loadBusinessUnits = function(businessUnits){
            self.buList.init(businessUnits)
        }
        self.loadProjects = function(projects){
            self.projectList.init(projects)
        }

        self.init = function(practices, customers, contractTypes, businessUnits, projects){
            async.parallel ([
                function(callback) {                
                    self.loadPractices(practices)
                    callback(null)
                },
                function(callback) {                
                    self.loadCustomers(customers)
                    callback(null)
                 },
                 function(callback) {                
                    self.loadContractTypes(contractTypes)
                    callback(null)
                 },
                 function(callback) {                
                    self.loadBUs(businessUnits)
                    callback(null)
                 },
                  function(callback) {
                   self.loadProjects(projects)
                   callback(null)
                }
            ],
            function(err){
                if (err){
                    console.log('error: ', err)
                }
            })
        }
    }

})