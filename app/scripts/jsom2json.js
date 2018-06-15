define([
    "jquery"
], function (
    $
) {
        //  Takes a list name/url
        //  Reads the list items, and returns an array of json objects
        var
            
            main = {
                
                getList: function (args) {
                    return getContext(args.siteUrl, args.listName)
                        .then(getSPList)
                        .then(getSPListItems)
                        .then(getItemFields)
                        // .finally(function(values){args.data = values})
                        // .then(function(val){console.log('out',val)})
                },

                getListFields: function (siteUrl, listName) {
                    return getContext(siteUrl, listName)
                        .then(getSPList)
                        .then(getSPListFields)
                        // .then(function(val){console.log('out',val)})
                }
            },

            getContext = function(siteUrl, listName){
                return new Promise(function(resolve,reject){
                    resolve([new SP.ClientContext(siteUrl), listName])
                })                
            }

            getSPList = function (args) {
                var context = args[0]
                var listName = args[1]
                return new Promise(function(resolve,reject){
                    resolve([context,listName, context.get_web().get_lists().getByTitle(listName)])
                })
            },

            getSPListItems = function (args) {
                var context = args[0]
                var lname = args[1]
                var spList = args[2]         
                var deferred = $.Deferred()
                var coll = []
                var spListItems = spList.getItems(createAllItemsQuery())
                context.load(spListItems)
                context.executeQueryAsync(Function.createDelegate(this, function(){
                        var collEnumerator = spListItems.getEnumerator()
        
                        while (collEnumerator.moveNext()) {
                            coll.push(collEnumerator.get_current())
                        }
                        deferred.resolve(coll)
                    }), 
                    Function.createDelegate(this, function(sender, args){
                        deferred.reject(args.get_message())
                    }))
                return deferred.promise()

            },


            
            getItemFields = function(items){
                return Promise.all(items.map(function(item){
                    return new Promise(function(resolve, reject){
                        resolve(item.get_fieldValues())
                    })
                }))
            },

            getSPListFields = function (args) {
                var context = args[0]
                var spList = args[1]
                return new Promise(function (resolve, reject) {
    
                    this.listFields = spList.get_fields()
                    var fields = []
    
                    context.load(this.listFields)
    
                    context.executeQueryAsync(
                        Function.createDelegate(this, function () {
                            var fieldEnumerator = this.listFields.getEnumerator()
    
                            while (fieldEnumerator.moveNext()) {
                                var oField = {name: fieldEnumerator.get_current().get_internalName(), label: fieldEnumerator.get_current().get_title()} 
                                fields.push(oField)
                            }
                            resolve(fields)
                        }),
                        Function.createDelegate(this, reject)
                    )
                })
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

        return main;

    }
)