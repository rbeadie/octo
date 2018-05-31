define([
    "text!./main.html",
    "jquery",
    // -modules not needing a reference----------
    "less!../styles/common",
    "jquery-ui"
], function(
    template,
    $
){

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
        start: function(appContainerDiv){

            var siteUrl = '/sites/corporate/iris/octo/';
            var listName = 'Documents';                   

            retrieveListItems(siteUrl, listName);

            console.log('Done');

            inst.$appCntr = $(appContainerDiv).html(template);
        }    
    },
    
    retrieveListItems = function(siteUrl, listName) {
        var clientContext = new SP.ClientContext(siteUrl);
        var oList = clientContext.get_web().get_lists().getByTitle(listName);
    
        var camlQuery = new SP.CamlQuery();
        camlQuery.set_viewXml(
            '<View><Query><Where><Geq><FieldRef Name=\'ID\'/>' +
            '<Value Type=\'Number\'>1</Value></Geq></Where></Query>' +
            '<RowLimit>100</RowLimit></View>'
        );
        this.collListItem = oList.getItems(camlQuery);
    
        DanaMethodLoad("load", clientContext, collListItem);
        clientContext.executeQueryAsync(function(data) {
            console.log('query succeeded', data);
        },
          function(e){console.log('query failed');}
        );
    };

    return main;

});