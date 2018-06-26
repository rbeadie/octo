define([
    "text!./main.html",
    "jquery",
    "ko",
    "./jsom2json",
    "../models/mainModel",
    "./config",
    // -modules not needing a reference----------
    "less!../styles/common",
    "./mapListFields"
], function (
    template,
    $,
    ko,
    j2j,
    VM,
    config,
    mapListFields
) {

        var
            vm = new VM(),
            inst = {},
            /**
             * Apps main module
             * @namespace main
             */
            main = /** @lends main */{

                /**
                 * Starts the app.
                 * @param {HTMLElement} appContainerDiv
                 *      The HTMl element where the app will be displayed
                 */
                start: function (appContainerDiv) {
                    var spData = {}
                    
                    Promise.all(
                        // config.lists.slice(0,3).map(j2j.getList)
                        [
                        j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "BusinessUnits"})
                        .then(function(out){spData.businessUnits = out; vm.businessUnitList.spInit(out)}),
                        j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Practices"})
                        .then(function(out){spData.practices = out; vm.practiceList.spInit(out)}),
                        j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Contract Type"})
                        .then(function(out){spData.contractTypes = out; vm.contractTypeList.spInit(out)}),
                        j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Customer"})
                        .then(function(out){spData.customers = out; vm.customerList.spInit(out)}),
                        j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Projects"})
                        .then(function(out){spData.projects = out; vm.projectList.spInit(out)})
                    ]
                    )
                    // .then(function(out){
                    //     var jsonProjectList = new String()                        
                    //     vm.projectList.projectList().forEach(function(item){
                    //         jsonProjectList += ko.toJSON(item) + '\n'
                    //     })
                    //     j2j.addFile("/sites/corporate/iris/octo", "Documents","projectList.txt",jsonProjectList)                
                    // })
                    .then(function(){
                        ko.applyBindings(vm)
                    })
                    
                    inst.$appCntr = $(appContainerDiv).html(template)
                }
            }, 
                        
            errorHandler = function () {
                console.log('query failed', arguments[1].get_message());
            };

        return main;

    });