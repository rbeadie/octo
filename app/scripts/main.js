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

                    // console.log(config)

                    var spData = {}
                    
                    Promise.all(
                        // config.lists.slice(0,3).map(j2j.getList)
                        [
                        j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "BusinessUnits", dataSetName: "businessUnits"}),
                        j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Practices", dataSetName: "practices"}), //.then(function(out){spData.practices = out}),
                        j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Contract Type", dataSetName: "contractTypes"}),
                        j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Customer", dataSetName: "customers"})   //.then(function(out){spData.customers = out})
                    ]
                    )
                    // .then(function(out){console.log('out',out); console.log('data',spData)})

                    // var siteUrl = '/sites/corporate/iris/octo';
                    // var listName = 'Customer';

                    // j2j.getList(siteUrl, listName)
                    // .then(vm.loadSPCustomers)
                    // .then(function(){console.log('vm',vm)})

                    inst.$appCntr = $(appContainerDiv).html(template)
                }
            }, 

            loadSPLists = function(spUrl){

            },

            initializeModel = function() {
                    // // Set up main model
                    // var vm = new VM();
                    
                    // init practices list with static data
                    vm.loadPractices(data.practices);
                    vm.loadCustomers(data.customers);
                    vm.loadContractTypes(data.contractTypes);
                    vm.loadBusinessUnits(data.businessUnits);
                    vm.loadProjects(data.projects);

                    console.log('Done', vm);                         
            },
                        
            errorHandler = function () {
                console.log('query failed', arguments[1].get_message());
            };

        return main;

    });