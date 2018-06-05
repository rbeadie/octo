define([], function () {
    var
        config =
            {
                lists: [
                    { siteUrl: "/sites/corporate/iris/octo", listName: "BusinessUnits", dataSetName: "businessUnits"},
                    { siteUrl: "/sites/corporate/iris/octo", listName: "Contract Type", dataSetName: "contractTypes"},
                    { siteUrl: "/sites/corporate/iris/octo", listName: "Customer", dataSetName: "customers"},
                    { siteUrl: "/sites/corporate/iris/octo", listName: "Practices", dataSetName: "practices"},
                    { siteUrl: "/sites/corporate/iris/octo", listName: "Projects", dataSetName: "projects"}
                ]
            }


    return config
})