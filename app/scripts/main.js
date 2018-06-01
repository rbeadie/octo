define([
    "text!./main.html",
    "jquery",
    "ko",
    "../models/mainModel",
    // -modules not needing a reference----------
    "less!../styles/common"
], function (
    template,
    $,
    ko,
    VM
) {

        var
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

                    var siteUrl = '/sites/corporate/iris/';
                    var listName = 'Master Projects List';

                    // retrieveListItems(siteUrl, listName);

                    var vm = new VM();

                    console.log('Done', vm);

                    inst.$appCntr = $(appContainerDiv).html(template);
                }
            },


            retrieveListItems = function (siteUrl, listName) {
                var clientContext = new SP.ClientContext(siteUrl);
                var oList = clientContext.get_web().get_lists().getByTitle(listName);

                this.collListItem = oList.getItems(createAllItemsQuery());

                DanaMethodLoad("load", clientContext, collListItem);
                clientContext.executeQueryAsync(
                    Function.createDelegate(this, logListItems),
                    Function.createDelegate(this, errorHandler)
                );
            },

            logListItems = function () {
                console.log('query succeeded');
                
                var listItemEnumerator = this.collListItem.getEnumerator();

                while (listItemEnumerator.moveNext()) {
                    var listItem = listItemEnumerator.get_current();
                    console.log(listItem);
                }
            },

            createAllFilesQuery = function() {
                var qry = new SP.CamlQuery();
                qry.set_viewXml('<View Scope="RecursiveAll"><Query><Where><Eq><FieldRef Name="FSObjType" /><Value Type="Integer">0</Value></Eq></Where></Query></View>');
                return qry;
            },
            createAllItemsQuery = function() {
                var qry = new SP.CamlQuery();
                qry.set_viewXml(
                    '<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' +
                    '<Value Type=\'Number\'>1</Value></Geq></Where></Query>' +
                    '<RowLimit>100</RowLimit></View>'
                );                
                return qry;
            },
                        
            errorHandler = function () {
                console.log('query failed', arguments[1].get_message());
            };

        return main;

    });