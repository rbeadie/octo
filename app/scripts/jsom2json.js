define([
    "jquery"
], function (
    $
) {
        //  Takes a list name/url
        //  Reads the list items, and returns an array of json objects
        var
            clientContext = {},
            spList = {},
            spListFields = [],
            spListItems = [],

            main = function (siteUrl, listName) {
                clientContext = new SP.ClientContext(siteUrl)

                getSPList(listName)
                    .then(getSPListItems)
                    .then(getItemFields)
                    .then(function(val){console.log('out',val)})
            },

            getSPList = function (listName) {
                return new Promise(function(resolve,reject){
                    resolve(clientContext.get_web().get_lists().getByTitle(listName))
                })
            },

            getSPListItems = function (spList) {
                return new Promise(function (resolve, reject) {

                    this.listItems = spList.getItems(createAllItemsQuery());
                    var coll = []

                    // DanaMethodLoad("load", clientContext, listItems);
                    clientContext.load(this.listItems)
                    clientContext.executeQueryAsync(
                        Function.createDelegate(this, function () {
                            var collEnumerator = this.listItems.getEnumerator()

                            while (collEnumerator.moveNext()) {
                                coll.push(collEnumerator.get_current())
                            }
                            resolve(coll)
                        }),
                        Function.createDelegate(this, reject)
                    )
                })
            },
            
            getItemFields = function(items){
                return Promise.all(items.map(function(item){
                    return new Promise(function(resolve, reject){
                        resolve(item.get_fieldValues())
                    })
                }))
            },

            // Query used to read all items in a list
            createAllItemsQuery = function () {
                var qry = new SP.CamlQuery();
                qry.set_viewXml(
                    '<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' +
                    '<Value Type=\'Number\'>0</Value></Geq></Where></Query>' +
                    '<RowLimit>100</RowLimit></View>'
                );
                return qry;
            },

            errorHandler = function () {
                console.log('query failed', arguments[1].get_message());
            };


            // // Query used to read all items in a file library
            // createAllFilesQuery = function () {
            //     var qry = new SP.CamlQuery();
            //     qry.set_viewXml('<View Scope="RecursiveAll"><Query><Where><Eq><FieldRef Name="FSObjType" /><Value Type="Integer">0</Value></Eq></Where></Query></View>');
            //     return qry;
            // },
            // getSPListFields = function () {
            //     return new Promise(function (resolve, reject) {
    
            //         this.listFields = spList.get_fields()
            //         var fields = []
    
            //         clientContext.load(this.listFields)
    
            //         clientContext.executeQueryAsync(
            //             Function.createDelegate(this, function () {
            //                 var fieldEnumerator = this.listFields.getEnumerator()
    
            //                 while (fieldEnumerator.moveNext()) {
            //                     var oField = fieldEnumerator.get_current().get_internalName()
            //                     fields.push(oField)
            //                 }
            //                 resolve(fields)
            //             }),
            //             Function.createDelegate(this, reject)
            //         )
            //     })
            // },
    

        return main;

    }
)