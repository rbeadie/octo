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
                },

                getListItem: function (siteUrl, listName, title) {
                    return getContext(siteUrl, listName)
                        .then(getSPList)
                        .then(function(args){return new Promise(function(resolve,reject){resolve(args.concat([title]))})})
                        .then(getSPListItemByTitle)
                        .then(function(out){return new Promise(function(resolve,reject){
                            if (out.length == 0 || out[3] == null)
                                reject(out)
                            else
                                resolve([out[3]])
                        })})
                        .catch(addListItemWithTitle)
                        .then(getItemFields)
                        // .then(function(val){console.log('out',val)})
                },
                
                modifyListItem: function (siteUrl, listName, title, itemJSON) {
                    return getContext(siteUrl, listName)
                        .then(getSPList)
                        .then(function(args){return new Promise(function(resolve,reject){resolve(args.concat([title]))})})
                        .then(getSPListItemByTitle)
                        .then(function(out){return new Promise(function(resolve,reject){
                            if (out.length == 0 || out[3] == null)
                                reject(out)
                            else
                                resolve([out[0],out[3]])
                        })})
                        .catch(addListItemWithTitle)
                        .then(function(args){return new Promise(function(resolve,reject){resolve(args.concat([itemJSON]))})})
                        .then(writeListItem)
                        // .then(function(val){console.log('out',val)})
                },
                
                addFile: function (siteUrl, listName, fileName, fileContent){
                    return getContext(siteUrl, listName)
                        .then(function(args){return new Promise(function(resolve,reject){resolve(args.concat([fileName]).concat([fileContent]))})})
                        .then(writeToFile)
                        .then(function(val){console.log('out',val)})
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
            
            getSPListItemByTitle = function (args) {
                var context = args[0]
                var lname = args[1]
                var spList = args[2]   
                var title = args[3]      
                var deferred = $.Deferred()
                var coll = []
                var spListItems = spList.getItems(createItemTitleQuery(title))
                context.load(spListItems)
                context.executeQueryAsync(Function.createDelegate(this, function(){
                        var item = spListItems.get_item(0)        
                        deferred.resolve([context, spList, title, item])
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

            addListItemWithTitle = function (args) {
                var context = args[0]
                var spList = args[1]
                var title = args[2]
                var deferred = $.Deferred()
                var itemCreateInfo = new SP.ListItemCreationInformation()

                this.newItem = spList.addItem(itemCreateInfo)
                this.newItem.set_item('Title',title)
                this.newItem.update()
                context.load(this.newItem)               
                
                context.executeQueryAsync(Function.createDelegate(this, function(){
                        deferred.resolve([context, this.newItem])
                    }), 
                    Function.createDelegate(this, function(sender, args){
                        deferred.reject(args.get_message())
                    }))
                return deferred.promise()            
            },

            writeListItem = function(args){
                console.log('write args', args)
                var context = args[0]
                var listItem = args[1]
                var itemProperties = args[2]
                var deferred = $.Deferred()
                
                for (var key in itemProperties) {
                    console.log('key', key, itemProperties[key])
                }
                listItem.update()
                context.load(listItem)               
                
                context.executeQueryAsync(Function.createDelegate(this, function(){
                        deferred.resolve([listItem])
                    }), 
                    Function.createDelegate(this, function(sender, args){
                        deferred.reject(args.get_message())
                    }))
                return deferred.promise()            
            }

            writeToFile = function(args){
                var context = args[0]
                var listName = args[1]
                var fileName = args[2]
                var fileData = args[3]
                var deferred = $.Deferred()
                var spList = context.get_web().get_lists().getByTitle(listName)           
                var fileCreateInfo = new SP.FileCreationInformation()
                fileCreateInfo.set_url(fileName)
                fileCreateInfo.set_overwrite(true)
                fileCreateInfo.set_content(new SP.Base64EncodedByteArray())
                
                for (var i = 0; i < fileData.length; i++) {
                    fileCreateInfo.get_content().append(fileData.charCodeAt(i))
                }
                
                this.newItem = spList.get_rootFolder().get_files().add(fileCreateInfo)
                context.load(this.newItem)               
                
                context.executeQueryAsync(Function.createDelegate(this, function(){
                        deferred.resolve(this.newItem)
                    }), 
                    Function.createDelegate(this, function(sender, args){
                        deferred.reject(args.get_message())
                    }))
                return deferred.promise()
            
            },

            // Query used to read all items in a list
            createAllItemsQuery = function () {
                var qry = new SP.CamlQuery()
                qry.set_viewXml(
                    '<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' +
                    '<Value Type=\'Number\'>0</Value></Geq></Where></Query></View>'
                )
                return qry
            },
            
            // Query used to read all items in a list
            createItemTitleQuery = function (title) {
                var qry = new SP.CamlQuery()
                qry.set_viewXml(
                    '<View><Query><Where><Eq><FieldRef Name=\'Title\'/>' +
                    '<Value Type=\'Text\'>' + title + '</Value></Eq></Where></Query></View>'
                )
                // <Query><Where><Eq><FieldRef Name='status' /><Value Type='Choice'>Yes</Value></Eq></Where></Query>
                // <Query><Where><Contains><FieldRef Name='Title'/><Value Type='Text'>title </Value></Contains></Where></Query>
                // console.log(qry)
                return qry
            },
            
            errorHandler = function () {
                console.log('query failed', arguments[1].get_message())
            },
            
            // DEPRECATED; saved for reference; delete once the update item function is completed
            createListItem= function (args) {
                var context = args[0]
                var listName = args[1]
                var itemProperties = args[2]
                var deferred = $.Deferred()
                var spList = context.get_web().get_lists().getByTitle(listName)           
                var itemCreateInfo = new SP.ListItemCreationInformation()

                this.newItem = spList.addItem(itemCreateInfo)
                
                // temporary version; currently uses key-value pair list; convert to use ko view model object
                itemProperties.forEach(function(element) {
                    if (element.name == 'ProjectManager' && element.value != '') {
                        var pm = context.get_web().get_siteUsers().getByEmail(element.value + '@hii-tsd.com')       
                        this.newItem.set_item(element.name, pm)  
                    } else {                        
                        this.newItem.set_item(element.name, element.value)                    
                    }
                })
                    
                this.newItem.update()
                context.load(this.newItem)               
                
                context.executeQueryAsync(Function.createDelegate(this, function(){
                        deferred.resolve(this.newItem)
                    }), 
                    Function.createDelegate(this, function(sender, args){
                        deferred.reject(args.get_message())
                    }))
                return deferred.promise()            
            }

        return main

    }
)
