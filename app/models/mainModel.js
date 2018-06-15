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
        }

    })