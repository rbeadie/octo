define([], function () {
        var
            data = {}

            data.practices = [
            { name: ' Cyber Security and Operations ', portfolio: ' Enterprise IT ', code: ' CSO ', id: ' 1 ', description: ' <div class="ExternalClassC94D91DB93434058B35DC4ACD613C7D0"><p>Includes Cyber Strategy and CISO Support, Information Assurance and RMF Analysis and Assessment, IA Engineering, Cyber Operations Exercise Planning, Cyber Operations Exercise Execution, Cyber Operations Training Plans; Cyber Network Defense, Penetration Testing, Secure Code Review</p></div> '}
            , { name: ' Software and Application Development Services ', portfolio: ' Enterprise IT ', code: ' SDS ', id: ' 2 ', description: ' <div class="ExternalClassA51DC64298A24851BC560A62146E092E"><p>Includes Agile, DevOps, Migration, Integration, Maintenance, Enhancement, SDLC, Modernization, customized application development, adaptation of commercial software, documentation, </p></div> '}
            , { name: ' Collaboration, Content and Communication ', portfolio: ' Enterprise IT ', code: ' CCC ', id: ' 3 ', description: ' <div class="ExternalClassF4FB2B499E3D4B8084B471A12CF6047E"><p>Includes Portal Development, Document/Content Management, Messaging, Social Media</p></div> '}
            , { name: ' IT Infrastructure and O&M ', portfolio: ' Enterprise IT ', code: ' ITO ', id: ' 4 ', description: ' <div class="ExternalClassD67F40F8B98145A2981CD32AC05F6A87"><p>Includes Infrastructure and IT Support, Data Center Ops &amp; Management, Core Devices and Systems, Networking, Tiered Support, End-User Services, IV&amp;V, multi-modal environments, software integration labs, systems administration, </p></div> '}
            , { name: ' Data Management and Analytics Services ', portfolio: ' Enterprise IT ', code: ' DMS ', id: ' 5 ', description: ' <div class="ExternalClass4274C8A881764FBFA3C8C68E3B344CF9"><p>Includes Data Strategy, Business Intelligence and Visualization, Big Data, Advanced Analytics and Statistical Modeling</p></div> '}
            , { name: ' Cloud Computing Services ', portfolio: ' Enterprise IT ', code: ' CCS ', id: ' 6 ', description: ' <div class="ExternalClass637CE6E0E2E543A3AD1409E5B452E8FF"><p>Includes Systems/Application Readiness, Virtualization, Migration, Hosting, Brokering</p></div> '}
            , { name: ' Chemical, Biological, Radiological and Nuclear Defense ', portfolio: ' Preparedness and Logistics ', code: ' CBN ', id: ' 7 ', description: ' <div class="ExternalClass1477E2CC0CB5450D91872916C0A65F2C"><p>Includes Detection, Decontamination, Protection, Bio-surveillance, Consequence Management, C-WMD, CBRN Medical Countermeasures, warning and reporting​<br></p></div> '}
            , { name: ' Emergency and Disaster Preparedness Services ', portfolio: ' Preparedness and Logistics ', code: ' EDP ', id: ' 8 ', description: ' <div class="ExternalClassA92EF9BEA0714256A481E3C71F3185F9"><p>Includes HAZMAT, Incident Command, Search and Extraction, All Hazards Emergency Response, Toxic Industrial Materials, Force Protection, Critical Infrastructure</p></div> '}
            , { name: ' Logistics and Asset Management Services ', portfolio: ' Preparedness and Logistics ', code: ' LAM ', id: ' 9 ', description: ' <div class="ExternalClassD9B99A716B4D487486BB90892798A251"><p>Includes World-wide Logistics Support, Technical Field Services, Inventory Control and Asset Management, Supply Chain Management, Warehousing, Procurement, Sustainment, fielding, lifecycle systems sustainment, </p></div> '}
            , { name: ' Intelligence & Analysis Services ', portfolio: ' Intelligence Analysis and Operations ', code: ' IAS ', id: ' 10 ', description: ' <div class="ExternalClass1B457F39E9E84DDBB7E2E3A93115DEA7"><p>Includes Geospatial, Open-Source, Linguistics, Counter-Intelligence, Collection Management, Identity Intelligence/Biometrics, SIGINT, Intel Production, Threat Intelligence Support, </p></div> '}
            , { name: ' Unmanned Vehicle Services ', portfolio: ' Intelligence Analysis and Operations ', code: ' UVS ', id: ' 11 ', description: ' <div class="ExternalClassC583E251AF9543AAB30787C72110EB06"><p>Includes Air, Land, Water, testing, maintenance, sustainment, wiring and harnessing, policy and governance, air space management, fabrication, production</p></div> '}
            , { name: ' Program Management Support ', portfolio: ' Acquisition, Operations, and Engineering ', code: ' PMS ', id: ' 12 ', description: ' <div class="ExternalClassE1819D5B0BAB4FF3BFC1F20809A26A5D"><p>Includes Enterprise Architecture, Governance, Capital Planning and Investment Control, PMO Management, Strategy and Policy, Life Cycle Management, Financial Management/Planning, Business Process Management</p></div> '}
            , { name: ' Systems Engineering and Integration ', portfolio: ' Acquisition, Operations, and Engineering ', code: ' SEI ', id: ' 13 ', description: ' <div class="ExternalClass7E8C76CB7E844EC48615B4AC24A5BBC5"><p>Includes Requirements Management, Risk Management, Architecture Support, Test Analysis, Prototype Development, Design, Integration, IV&amp;V, Technical Manuals/Documentation, integration with live C4ISR systems, technology demonstration/enhancement/modernization</p></div> '}
            , { name: ' Operations Planning Services ', portfolio: ' Acquisition, Operations, and Engineering ', code: ' OPS ', id: ' 14 ', description: ' <div class="ExternalClass48060910B0074CC5985DE2D4242492A7">Includes Mission planning, current and future operations planning, OPLANS/CONPLANS/CONOPS, theater logistics planning, operational instructions/regulations, war gaming and analysis, mission rehearsals, readiness exercises</div> '}
            , { name: ' Interactive Multimedia Instruction ', portfolio: ' Training and Simulation ', code: ' IMI ', id: ' 15 ', description: ' <div class="ExternalClass9A03DBAB57C04BDC8822DABEC9371180">Includes Computer-based Training (student led), interactive courseware (instructor led), mobile applications, 3D modeling, applied gaming, video and audio recording, realistic animation, constructive models</div> '}
            , { name: ' Mission Training Services ', portfolio: ' Training and Simulation ', code: ' MTS ', id: ' 16 ', description: ' <div class="ExternalClass123C6F35892447318623400E08240004">Includes simulation supported scenario generation, training network setup, integration with live C4ISR systems, simulation operations and training, data collection and after action reviews., proficiency exercises, collective training exercises, new equipment training</div> '}
            , { name: ' Instructional Management and Delivery ', portfolio: ' Training and Simulation ', code: ' IMD ', id: ' 17 ', description: ' <div class="ExternalClass2977F8FA312C4F6FBF8E66C2DA179705">Includes Classroom/On-Site, Virtual Training, Over-the-Shoulder, Learning Management Support, remote/exportable training packages (i.e. CDs),</div> '}
            , { name: ' Modeling and Simulation ', portfolio: ' Training and Simulation ', code: ' MAS ', id: ' 18 ', description: ' <div class="ExternalClass1625217A7A7B4ED3878C3F42D7E3D02A">Includes Development and integration of behavior models, physical models, run-time infrastructure, synthetic environment, 3D models/printing, and image generation in the virtual and constructive domains, supporting training, engineering, and analysis, CAD, simulation prototyping</div> '}
            , { name: ' Measurement, Evaluation, and Strategy ', portfolio: ' Training and Simulation ', code: ' MES ', id: ' 19 ', description: ' <div class="ExternalClassAB378FFFBA50474680247AE7ACB851B3">Includes Job Task Analysis, Diagnostic Assessment, Cert &amp; Selection Testing, Governance, Adaptive Testing, Learning Analytics, Decision Support, Human Performance Assessments</div> '}
            , { name: ' Instructional Systems Design ', portfolio: ' Training and Simulation ', code: ' ISD ', id: ' 20 ', description: ' <div class="ExternalClass95DF8134A27A4BCCB73D058C4FE09898">Includes Front End Analysis, Learning Theory, Refresh/Refurbishment, Curriculum Development, Gap Analysis, ADDIE, technical manuals</div> '}
        ]

            data.customers = [
                { name: ' AOUSC ', fullname: ' null ', id: ' 1 '}
                , { name: ' DHS ', fullname: ' null ', id: ' 2 '}
                , { name: ' DoEd ', fullname: ' null ', id: ' 3 '}
                , { name: ' DOJ/ATF ', fullname: ' null ', id: ' 4 '}
                , { name: ' EPA ', fullname: ' null ', id: ' 5 '}
                , { name: ' Fairfax County ', fullname: ' null ', id: ' 6 '}
                , { name: ' FEMA ', fullname: ' null ', id: ' 7 '}
                , { name: ' GAO ', fullname: ' null ', id: ' 8 '}
                , { name: ' NSA ', fullname: ' null ', id: ' 9 '}
                , { name: ' NSD ', fullname: ' null ', id: ' 10 '}
                , { name: ' OPP ', fullname: ' null ', id: ' 11 '}
                , { name: ' Texas A&M ', fullname: ' null ', id: ' 12 '}
                , { name: ' TSA ', fullname: ' null ', id: ' 13 '}
                , { name: ' USA ', fullname: ' null ', id: ' 14 '}
                , { name: ' USAF ', fullname: ' null ', id: ' 15 '}
                , { name: ' USAID ', fullname: ' null ', id: ' 16 '}
                , { name: ' USAR ', fullname: ' null ', id: ' 17 '}
                , { name: ' USMC ', fullname: ' null ', id: ' 18 '}
                , { name: ' USN ', fullname: ' null ', id: ' 19 '}
                , { name: ' USPS ', fullname: ' null ', id: ' 20 '}
                , { name: ' USPTO ', fullname: ' null ', id: ' 21 '}
                , { name: ' USSS ', fullname: ' null ', id: ' 22 '}
                , { name: ' VA ', fullname: ' null ', id: ' 23 '}                
            ]
            
            data.contractTypes = [

            ]
            
            data.businessUnits = [

            ]
            
            data.projects = [
                
            ]

            return data;
})