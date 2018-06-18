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
                    
                    // Promise.all(
                    //     // config.lists.slice(0,3).map(j2j.getList)
                    //     [
                    //     j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "BusinessUnits"})
                    //     .then(function(out){spData.businessUnits = out; vm.businessUnitList.spInit(out)}),
                    //     j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Practices"})
                    //     .then(function(out){spData.practices = out; vm.practiceList.spInit(out)}),
                    //     j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Contract Type"})
                    //     .then(function(out){spData.contractTypes = out; vm.contractTypeList.spInit(out)}),
                    //     j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Customer"})
                    //     .then(function(out){spData.customers = out; vm.customerList.spInit(out)}),
                    //     j2j.getList({ siteUrl: "/sites/corporate/iris/octo", listName: "Projects"})
                    //     .then(function(out){spData.projects = out; vm.projectList.spInit(out)})
                    // ]
                    // )
                    // .then(function(out){console.log('data',spData); console.log('vm',vm)})

//next: https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/hh185011(v%3Doffice.14)
                    Promise.all([
                        j2j.addListItem("/sites/corporate/iris/octo", "Projects",[{name: 'Title', value: 'Program Spt for Cruise Missle Defense Sys (CMDS) PO - 10234.N01'},{name: 'BusinessUnit', value: '2;#TCE'},{name: 'ProjectNumber', value: '10234'},{name: 'ProjectManager', value: 'russ.mcdonald'},{name: 'Customer', value: '14;#USA'},{name: 'ContractType', value: '2;#T&M'},{name: 'CategoryDescription', value: 'Camber provided programmatic support for Project Manager Unmanned Aircraft Systems (UAS), Product Manager (PdM) Medium Altitude Endurance (MAE)/Gray Eagle UAS, PM Tactical Concepts (now PdM Modernization)/Hunter UAS, Improved Gnat (IGNAT) UAS, Warrior A and Warrior Block 0 UAS, PdM Ground Maneuver/Shadow, PdM Small UAS/Raven, PdM Future Combat Systems/four classes of UAS, and PdM Common Systems Integration (CSI). '}]),
                        j2j.addListItem("/sites/corporate/iris/octo", "Projects",[{name: 'Title', value: 'MDA Enviromental Mgt - 11052'},{name: 'BusinessUnit', value: '2;#TCE'},{name: 'ProjectNumber', value: '11052'},{name: 'ProjectManager', value: 'russ.mcdonald'},{name: 'Customer', value: ';#'},{name: 'ContractType', value: '2;#T&M'},{name: 'CategoryDescription', value: ''}]),
                        j2j.addListItem("/sites/corporate/iris/octo", "Projects",[{name: 'Title', value: 'MDA Site Activation - 10923'},{name: 'BusinessUnit', value: '2;#TCE'},{name: 'ProjectNumber', value: '10923'},{name: 'ProjectManager', value: 'russ.mcdonald'},{name: 'Customer', value: ';#'},{name: 'ContractType', value: '2;#T&M'},{name: 'CategoryDescription', value: ''}]),
                        j2j.addListItem("/sites/corporate/iris/octo", "Projects",[{name: 'Title', value: 'PM Acquisition Business Technology - 10916'},{name: 'BusinessUnit', value: '2;#TCE'},{name: 'ProjectNumber', value: '10916'},{name: 'ProjectManager', value: 'russ.mcdonald'},{name: 'Customer', value: ';#'},{name: 'ContractType', value: '2;#T&M'},{name: 'CategoryDescription', value: ''}]),
                        j2j.addListItem("/sites/corporate/iris/octo", "Projects",[{name: 'Title', value: 'AO Maintenance of DSO Websites (1001947)'},{name: 'BusinessUnit', value: '1;#DMIT'},{name: 'ProjectNumber', value: '1001947'},{name: 'ProjectManager', value: 'norma.schmitt'},{name: 'Customer', value: ';#'},{name: 'ContractType', value: '2;#T&M'},{name: 'CategoryDescription', value: ''}]),
                        j2j.addListItem("/sites/corporate/iris/octo", "Projects",[{name: 'Title', value: 'RACRS - 10889'},{name: 'BusinessUnit', value: '2;#TCE'},{name: 'ProjectNumber', value: '10889'},{name: 'ProjectManager', value: ''},{name: 'Customer', value: '14;#USA'},{name: 'ContractType', value: '3;#CPFF'},{name: 'CategoryDescription', value: 'The objective of the Apache SMART program is to perform Modeling and Simulation (M&S) risk reduction activities utilizing the Government-owned Apache Risk and Cost Reduction System (RACRS). Camber has served as an engineering extension of the Apache project office from 2000 to 2015 to assist with the evolution of aircraft modification concepts into solutions that meet the needs of Army Aviators thereby avoiding rework due to misunderstood or loosely defined requirements. In support of this objective, Camber developed, maintains, and operates an Apache laboratory with aircraft software and hardware capabilities for the purposes of prototyping and mission-based evaluations/trials.  Camber engineers also provide project sustainment support to address maintenance, data backup, obsolescence, currency with the fielded aircraft, and upgrade of technology to perpetuate relevancy of the RACRS as a prototyping test bed.  On average, the RACRS program has 8-12 active task orders at all times, each with 9-18 months of duration. The conduct of simulated flight test rehearsals verifies and validates hardware and software upgrades substantially lowering the risk and cost of repetitive flight testing'}]),
                        j2j.addListItem("/sites/corporate/iris/octo", "Projects",[{name: 'Title', value: 'AFCAP LSS'},{name: 'BusinessUnit', value: '3;#P&I'},{name: 'ProjectNumber', value: ''},{name: 'ProjectManager', value: 'sean.remley'},{name: 'Customer', value: ';#'},{name: 'ContractType', value: ';#'},{name: 'CategoryDescription', value: ''}]),
                        j2j.addListItem("/sites/corporate/iris/octo", "Projects",[{name: 'Title', value: 'OUSD AT&L - 10977/11026'},{name: 'BusinessUnit', value: '3;#P&I'},{name: 'ProjectNumber', value: '10977'},{name: 'ProjectManager', value: 'sean.remley'},{name: 'Customer', value: ';#'},{name: 'ContractType', value: ';#'},{name: 'CategoryDescription', value: ''}]),
                        j2j.addListItem("/sites/corporate/iris/octo", "Projects",[{name: 'Title', value: 'FCBRNS/FIRS'},{name: 'BusinessUnit', value: '3;#P&I'},{name: 'ProjectNumber', value: ''},{name: 'ProjectManager', value: 'stacy.jeambert'},{name: 'Customer', value: ';#'},{name: 'ContractType', value: ';#'},{name: 'CategoryDescription', value: ''}]),
                        j2j.addListItem("/sites/corporate/iris/octo", "Projects",[{name: 'Title', value: 'UAE CBRNE Academic Training (10881)'},{name: 'BusinessUnit', value: '3;#P&I'},{name: 'ProjectNumber', value: '10881'},{name: 'ProjectManager', value: 'stanley.tunstall'},{name: 'Customer', value: '18;#USMC'},{name: 'ContractType', value: ';#'},{name: 'CategoryDescription', value: 'Camber provides 22 USMC installations worldwide with Contractor Logistics Support (CLS) which includes total asset management for over $50M of CBRNE equipment. We deploy Subject Matter Experts (SMEs) at Continental United States (CONUS) and Outside the Continental United States (OCONUS) Marine Corps locations.  Camber conducts training; acquisition, technical, and engineering support; and supply chain management, to include shelf-life monitoring and configuration management.  We manage inventory, conduct maintenance, store CBRNE equipment, and distribute the equipment to installations as needed.  We provide real-time visibility of all assets program-wide which gives the Headquarters Marine Corps (HQMC) the ability to shift equipment in response to threat situations.  Camber provides total asset management for over 1,900 line items and over 200,000 assets/pieces of CBRNE and First Responder/Receiver equipment.  We also provide training and exercise support, development and implementation of installation CBRNE protection plan annexes in installation incident response plans, and equipment maintenance and sustainment for CBRNE IPP.  CLS also includes management and technical support to the installations as required for Organizational Doctrine, Training, Operations, and related CBRNE and emergency management issues'}]),
                        j2j.addListItem("/sites/corporate/iris/octo", "Projects",[{name: 'Title', value: 'F-15 CAATS'},{name: 'BusinessUnit', value: '3;#P&I'},{name: 'ProjectNumber', value: ''},{name: 'ProjectManager', value: 'ted.field'},{name: 'Customer', value: ';#'},{name: 'ContractType', value: ';#'},{name: 'CategoryDescription', value: ''}]),
                        j2j.addListItem("/sites/corporate/iris/octo", "Projects",[{name: 'Title', value: 'Joint Force Dev Svcs - 10956.002'},{name: 'BusinessUnit', value: '2;#TCE'},{name: 'ProjectNumber', value: '10956'},{name: 'ProjectManager', value: 'terry.knight'},{name: 'Customer', value: ';#'},{name: 'ContractType', value: '2;#T&M'},{name: 'CategoryDescription', value: ''}])
                    ])

                    inst.$appCntr = $(appContainerDiv).html(template)
                }
            }, 

                        
            errorHandler = function () {
                console.log('query failed', arguments[1].get_message());
            };

        return main;

    });