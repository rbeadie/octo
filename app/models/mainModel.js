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
        return function mainModel() {
            var self = this

            self.modelName = ko.observable('main model')

            self.practiceList = new PracticeModel()
            self.customerList = new CustomerModel()
            self.contractTypeList = new ContractTypeModel()
            self.businessUnitList = new BusinessUnitModel()
            self.projectList = new ProjectListModel()


            // Actions    
            self.init = function (data) {
                return Promise.all([
                    self.practiceList.init(data.practices),
                    self.customerList.init(data.customers),
                    self.contractTypeList.init(data.contractTypes),
                    self.businessUnitList.init(data.businessUnits),
                    self.projectList.init(data.projects)
                ])
            }

            self.spInit = function (spdata) {
                return Promise.all([
                    self.businessUnitList.spInit(spdata.businessUnits),
                    self.contractTypeList.spInit(spdata.contractTypes),
                    self.customerList.spInit(spdata.customers),
                    self.practiceList.spInit(spdata.practices),
                    self.projectList.spInit(spdata.projects)
                ])
            }
        }

    })