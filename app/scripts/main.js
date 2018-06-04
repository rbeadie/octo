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

                    // Set up main model
                    var vm = new VM();
                    
                    // init practices list with static data
                    var practices = [
                        { name: 'Cyber Security and Operations', code: 'CSO', portfolio: 'Enterprise IT', description: ' Includes Cyber Strategy and CISO Support, Information Assurance and RMF Analysis and Assessment, IA Engineering, Cyber Operations Exercise Planning, Cyber Operations Exercise Execution, Cyber Operations Training Plans; Cyber Network Defense, Penetration Testing, Secure Code Review' },
                        { name: 'Software and Application Development Services', code: 'SDS', portfolio: 'Enterprise IT', description: ' Includes Agile, DevOps, Migration, Integration, Maintenance, Enhancement, SDLC, Modernization, customized application development, adaptation of commercial software, documentation,' },
                        { name: 'Collaboration, Content and Communication', code: 'CCC', portfolio: 'Enterprise IT', description: ' Includes Portal Development, Document/Content Management, Messaging, Social Media' },
                        { name: 'IT Infrastructure and O&M', code: 'ITO', portfolio: 'Enterprise IT', description: ' Includes Infrastructure and IT Support, Data Center Ops & Management, Core Devices and Systems, Networking, Tiered Support, End-User Services, IV&V, multi-modal environments, software integration labs, systems administration,' },
                        { name: 'Data Management and Analytics Services', code: 'DMS', portfolio: 'Enterprise IT', description: ' Includes Data Strategy, Business Intelligence and Visualization, Big Data, Advanced Analytics and Statistical Modeling' },
                        { name: 'Cloud Computing Services', code: 'CCS', portfolio: 'Enterprise IT', description: ' Includes Systems/Application Readiness, Virtualization, Migration, Hosting, Brokering' },
                        { name: 'Chemical, Biological, Radiological and Nuclear Defense', code: 'CBN', portfolio: 'Preparedness and Logistics', description: ' Includes Detection, Decontamination, Protection, Bio-surveillance, Consequence Management, C-WMD, CBRN Medical Countermeasures, warning and reporting​' },
                        { name: 'Emergency and Disaster Preparedness Services', code: 'EDP', portfolio: 'Preparedness and Logistics', description: ' Includes HAZMAT, Incident Command, Search and Extraction, All Hazards Emergency Response, Toxic Industrial Materials, Force Protection, Critical Infrastructure' },
                        { name: 'Logistics and Asset Management Services', code: 'LAM', portfolio: 'Preparedness and Logistics', description: ' Includes World-wide Logistics Support, Technical Field Services, Inventory Control and Asset Management, Supply Chain Management, Warehousing, Procurement, Sustainment, fielding, lifecycle systems sustainment,' },
                        { name: 'Intelligence & Analysis Services', code: 'IAS', portfolio: 'Intelligence Analysis and Operations', description: ' Includes Geospatial, Open-Source, Linguistics, Counter-Intelligence, Collection Management, Identity Intelligence/Biometrics, SIGINT, Intel Production, Threat Intelligence Support,' },
                        { name: 'Unmanned Vehicle Services', code: 'UVS', portfolio: 'Intelligence Analysis and Operations', description: ' Includes Air, Land, Water, testing, maintenance, sustainment, wiring and harnessing, policy and governance, air space management, fabrication, production' },
                        { name: 'Program Management Support', code: 'PMS', portfolio: 'Acquisition, Operations, and Engineering', description: ' Includes Enterprise Architecture, Governance, Capital Planning and Investment Control, PMO Management, Strategy and Policy, Life Cycle Management, Financial Management/Planning, Business Process Management' },
                        { name: 'Systems Engineering and Integration', code: 'SEI', portfolio: 'Acquisition, Operations, and Engineering', description: ' Includes Requirements Management, Risk Management, Architecture Support, Test Analysis, Prototype Development, Design, Integration, IV&V, Technical Manuals/Documentation, integration with live C4ISR systems, technology demonstration/enhancement/modernization' },
                        { name: 'Operations Planning Services', code: 'OPS', portfolio: 'Acquisition, Operations, and Engineering', description: ' Includes Mission planning, current and future operations planning, OPLANS/CONPLANS/CONOPS, theater logistics planning, operational instructions/regulations, war gaming and analysis, mission rehearsals, readiness exercises' },
                        { name: 'Interactive Multimedia Instruction', code: 'IMI', portfolio: 'Training and Simulation', description: ' Includes Computer-based Training (student led), interactive courseware (instructor led), mobile applications, 3D modeling, applied gaming, video and audio recording, realistic animation, constructive models' },
                        { name: 'Mission Training Services', code: 'MTS', portfolio: 'Training and Simulation', description: ' Includes simulation supported scenario generation, training network setup, integration with live C4ISR systems, simulation operations and training, data collection and after action reviews., proficiency exercises, collective training exercises, new equipment training' },
                        { name: 'Instructional Management and Delivery', code: 'IMD', portfolio: 'Training and Simulation', description: ' Includes Classroom/On-Site, Virtual Training, Over-the-Shoulder, Learning Management Support, remote/exportable training packages (i.e. CDs),' },
                        {  name: 'Modeling and Simulation', code: 'MAS', portfolio: 'Training and Simulation', description: ' Includes Development and integration of behavior models, physical models, run-time infrastructure, synthetic environment, 3D models/printing, and image generation in the virtual and constructive domains, supporting training, engineering, and analysis, CAD, simulation prototyping' },
                        { name: 'Measurement, Evaluation, and Strategy', code: 'MES', portfolio: 'Training and Simulation', description: ' Includes Job Task Analysis, Diagnostic Assessment, Cert & Selection Testing, Governance, Adaptive Testing, Learning Analytics, Decision Support, Human Performance Assessments' },
                        { name: 'Instructional Systems Design', code: 'ISD', portfolio: 'Training and Simulation', description: ' Includes Front End Analysis, Learning Theory, Refresh/Refurbishment, Curriculum Development, Gap Analysis, ADDIE, technical manuals' }
                    ]
                    vm.loadPractices(practices);
                    var customers = [
                        { shortname: 'AOUSC', fullname: 'Administrative Office of the US Courts'},
                        { shortname: 'DHS', fullname: 'Department of Homeland Security'},
                        { shortname: 'DoEd', fullname: 'Department of Education'},
                        { shortname: 'DOJ/ATF', fullname: 'Department of Justice Bureau of Alcohol, Tobacco, and Firearms'},
                        { shortname: 'EPA', fullname: 'Environmental Protection Agency'},
                        { shortname: 'USAF', fullname: 'US Air Force'},
                        { shortname: 'USMC', fullname: 'US Marine Corps'}
                    ]
                    vm.loadCustomers(customers);
                    var contractTypes = [
                        { name: 'FFP'},
                        { name: 'T&M'},
                        { name: 'CPFF'}
                    ]
                    vm.loadContractTypes(contractTypes);
                    var businessUnits = [
                        { code: 'DMIT', name: 'Data and Mission IT'},
                        { code: 'P&I', name: 'Protection and Intel'},
                        { code: 'TCE', name: 'Training, Cyber, and Engineering'}
                    ]
                    vm.loadBusinessUnits(businessUnits);
                    var projects = [
                        { programName: '', projectNumber: '', businessUnit: '', customer: '', contractType: ''}
                    ]
                    vm.loadProjects(projects);
                    

                    // retrieveListItems(siteUrl, listName);
                        
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