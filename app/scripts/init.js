/**
 * This APP loader and initializer is meant to be embedded directly into an HTML/ASPX
 * file, in the exact location where the functionality should be displayed. It will
 * create a <div> element that will then be used as app's container.
 */
(function(window, document){
    /* global _spBodyOnLoadFunctionNames, ExecuteOrDelayUntilScriptLoaded */

    // Create the app container
    var uid = "app_" + (Math.random() * 1e9 >>> 0);
    document.write('<div id="' + uid + '"></div>'); // jshint ignore:line

    var appMain; // jshint ignore:line

// BUILD_INCLUDE("<%= buildTempFolder %>/app.code.js")

    var
    isInitDone = false,

    // App initializer... executes only once.
    initApp = function(){
        if (isInitDone) {return;}
        isInitDone = true;
        var appContainerDiv = document.body.querySelector("#" + uid); // jshint ignore:line

        // BUILD_INCLUDE("<%= buildTempFolder %>/appInit.js")

    },

    hasSpOnBodyLoad = (typeof _spBodyOnLoadFunctionNames !== "undefined"),

    hasExecuteOrDelayUntilScriptLoaded = (typeof ExecuteOrDelayUntilScriptLoaded !== "undefined");

    if (hasExecuteOrDelayUntilScriptLoaded) {
        ExecuteOrDelayUntilScriptLoaded(initApp, "sp.js"); // jshint ignore:line
    }

    // If we don't seem to have any sharepoint loader, then init app now
    if (!hasSpOnBodyLoad && !hasExecuteOrDelayUntilScriptLoaded) {
        initApp();

    // FAIL SAFE: make sure we execute within 3 seconds
    } else {
        setTimeout(initApp, 3000);
    }

}(window, document));
