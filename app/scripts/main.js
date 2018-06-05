define([
    "text!./main.html",
    "jquery",
    "ko",
    "./jsom2json",
    "../models/mainModel",
    "./data",
    // -modules not needing a reference----------
    "less!../styles/common"
], function (
    template,
    $,
    ko,
    j2j,
    VM,
    data
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

                    var siteUrl = '/sites/corporate/iris/octo';
                    var listName = 'Practices';

                    initializeModel()   
                    
                    j2j(siteUrl, listName).then(function(out){console.log('out',out)})

                    inst.$appCntr = $(appContainerDiv).html(template);
                }
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
            }
                        
            errorHandler = function () {
                console.log('query failed', arguments[1].get_message());
            };

        return main;

    });