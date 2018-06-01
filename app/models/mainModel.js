define([
    "ko"
], function (
    ko
) {
    return function mainModel () {
        var self = this

        self.modelName = ko.observable('main model');

        // self.projectListModel = new ProjectListModel()
        // self.referenceModel = new ReferenceModel()

        // // Actions    
        // self.init = function(){
        //     async.parallel ([
        //         (callback) => {                
        //            self.projectListModel.init()
        //            callback(null)
        //         },
        //         (callback) => {
        //            self.referenceModel.init()
        //            callback(null)
        //         }
        //     ],
        //     (err) => {
        //         if (err){
        //             console.log('error: ', err)
        //         }
        //     })
        // }
    };

});