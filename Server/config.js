"use strict";
let Util = require("./core/util");

let config = {
    api_config: {
        // common api
        common: {
            "monthly_user": {
                // frequency monthly
                m: {
                    // query sql statement
                    // columns: `COUNT(DISTINCT "userid") as "# of Users",
                    // strftime("%Y-%m",time") as Month`,
                    columns: `strftime("%Y-%m",timestamps/1000,"unixepoch","localtime") as Month,COUNT(DISTINCT "userid") as "# of Users"`,
                    group: "year,month",
                    order: `year desc,month desc,"# of Users" desc`,
                    sqlStatement: ""
                }
            },

            "use_day": {
                m: {
                    columns: `strftime("%Y-%m",timestamps/1000,"unixepoch","localtime") as Month,userid,username,COUNT(DISTINCT "day") as "# of Days"`,
                    group: "userid,year,month",
                    order: `Month desc,"# of Days" desc`,
                    hasSub: true,
                    treeGroup: "Month"
                }
            }
        },

        aa: {

            "monthly_user": {
                // frequency monthly
                m: {
                    // query sql statement
                    // columns: `COUNT(DISTINCT "userid") as "# of Users",
                    // strftime("%Y-%m",time") as Month`,
                    columns: `strftime("%Y-%m",timestamps/1000,"unixepoch","localtime") as Month,COUNT(DISTINCT "userid") as "# of Users"`,
                    group: "year,month",
                    order: `year desc,month desc,"# of Users" desc`,
                    and: `and id not in (select id from Asset_Allocation where detail like "openInputFiles:%")`
                }
            },

            "file_number": {
                m: {
                    columns: `strftime("%Y-%m",timestamps/1000,"unixepoch","localtime") as "Month/User Name",userid,username,COUNT(DISTINCT "day") as "# of Days",
                    max("casefiles#") as "# of Case Files",max("inputfiles#") as "# of input Files",
                    "assetclasssets#" as "# of Asset Class Sets"`,
                    group: "userid,year,month",
                    order: `year desc,month desc,"# of Days" desc`,
                    and: `and ("casefiles#" > 0 or "inputfiles#" > 0 or "assetclasssets#" > 0 ) 
                    and timestamps in (select max(timestamps) from Asset_Allocation 
                    where "casefiles#" > 0 or "inputfiles#" > 0 or "assetclasssets#" > 0 
                    group by userid,year,month,"casefiles#","inputfiles#","assetclasssets#")`,
                    hasSub: true,
                    treeGroup: "Month/User Name",
                    dataHandler: _addUserType
                }
            }
        },

        cloud: {
            "monthly_user": {
                // frequency monthly
                m: {
                    // query sql statement
                    // columns: `COUNT(DISTINCT "userid") as "# of Users",
                    // strftime("%Y-%m",timestamps/1000,"unixepoch") as Month`,
                    columns: `strftime("%Y-%m",timestamps/1000,"unixepoch","localtime") as Month,edition,COUNT(DISTINCT "userid") as "# of Users"`,
                    group: "year,month,edition",
                    order: `year desc,month desc,"# of Users" desc`,
                    sqlStatement: ""
                }
            },

            "management_fee": {
                m: {
                    columns: `strftime("%Y-%m",timestamps/1000,"unixepoch","localtime") as "Month/User Name",userid,username,COUNT(DISTINCT "day") as "# of Days","managementfee#" as "# of Management Fees",
                    "billingsummary#" as "# of Billing Summary","custodianfiles#" as "# of Custodian Files"`,
                    group: "userid,year,month having timestamps in (select max(timestamps) from Office_Cloud group by userid,year,month)",
                    order: `year desc,month desc,"# of Days" desc`,
                    sqlStatement: "", // if sqlStatement use sqlStatement instead
                    hasSub: true,
                    treeGroup: "Month/User Name",
                    dataHandler: _addUserType
                }
            },

            "portfolio_objects": {
                m: {
                    columns: `strftime("%Y-%m",timestamps/1000,"unixepoch","localtime") as "Month/User Name",edition,userid,username,
                    max("clients#") as "# of Clients",max("quickaccount#") as "# of Quick Accounts",
                    max("transaccount#") as "# of Trans Accounts",max("clientaccount#") as "# of Client Accounts",
                    max("modelportfolio#") as "# of Model Portfolio",
                    max("custombenchmark#") as "# of Custom Benchmark",
                    max("policy#") as "# of Policy"`,

                    and: "and timestamps in (select max(timestamps) from Office_Cloud group by userid,year,month,portfoliotype)",
                    group: `userid,year,month`,
                    order: `year desc,month desc,"# of Days" desc`,
                    hasSub: true,
                    treeGroup: "Month/User Name",
                    dataHandler: _addUserType
                }
            },

            "most_used_api": {
                m: {
                    columns: `strftime("%Y-%m",timestamps/1000,"unixepoch","localtime") as "Month/API Name",Edition,portfoliotype,count(portfoliotype) as Frequency`,
                    group: `edition,year,month,portfoliotype`,
                    order: `year desc,month desc,"# of Days" desc`,
                    treeGroup: "Month/API Name",
                    hasSub: true,
                    dataHandler: function (data) {
                        let filterData = [];
                        data.forEach(row => {
                            let portfoliotype = row.portfoliotype;
                            let apiType = Util.getMapKey(map, portfoliotype, "id");
                            if (!apiType) {
                                return;
                            }

                            row.api_type = apiType;
                            row['Component Name'] = map[apiType].name;
                            delete row.portfoliotype;
                            filterData.push(row);
                        });
                        return filterData;
                    }
                }
            }
        },
        pa: {}
    }
};
module.exports = config;