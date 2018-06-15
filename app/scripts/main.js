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
                        j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "BusinessUnits", dataSetName: "businessUnits"})
                        .then(function(out){spData.businessUnits = out; vm.businessUnitList.spInit(out)}),
                        j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Practices", dataSetName: "practices"})
                        .then(function(out){spData.practices = out; vm.practiceList.spInit(out)}),
                        j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Contract Type", dataSetName: "contractTypes"})
                        .then(function(out){spData.contractTypes = out; vm.contractTypeList.spInit(out)}),
                        j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Customer", dataSetName: "customers"})
                        .then(function(out){spData.customers = out; vm.customerList.spInit(out)})
                    ]
                    )
                    .then(function(out){console.log('data',spData); console.log('vm',vm)})



                    inst.$appCntr = $(appContainerDiv).html(template)
                }
            }, 

                        
            errorHandler = function () {
                console.log('query failed', arguments[1].get_message());
            };

        return main;

    });