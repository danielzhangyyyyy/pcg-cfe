import Mock from 'mockjs2'
import { getQueryParameters } from '../util'

const username = ['admin']
const password = ['admin']

const login = (options) => {
    const params = getQueryParameters(options)
    if (username.includes(params.username) && password.includes(params.password)) {
        return { "code": "0", "msg": "ok", "result": { "userId": "tpg", "itcode": "tpg", "token": "6YN0G7awBqybQML1EcUaKoRDkIEMJpmt", "loginName": "tpg", "userType": "External", "productGroup": "TPG", "userGrpId": "YCFE_FINANCE_TPG_SUPER", "locale": "en_US" } }
    } else {
        return { "code": "-1", "msg": "Invalid Password!" }
    }

}
const getMenuList = (options) => {
    return {
        "code": "0",
        "msg": "ok",
        "result": [{
            "parentId": 0,
            "name": "My Favorites",
            "lvl": 1,
            "orderSeq": 0,
            "icon": "book",
            "childMenuList": [{
                "parentId": -1,
                "name": "Task Queue",
                "frontRouter": "taskQueue/taskQueue_list",
                "lvl": 2,
                "orderSeq": 30,
                "icon": "book",
                "accessLevel": "View+Add+Update++Upload++",
                "menuId": 3
            }, {
                "parentId": -1,
                "name": "On Demand Refresh",
                "frontRouter": "onDemandRefresh/onDemandRefresh_list",
                "lvl": 2,
                "orderSeq": 60,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 6
            }],
            "menuId": -1
        }, {
            "parentId": 0,
            "name": "Control List",
            "lvl": 1,
            "orderSeq": 10,
            "icon": "book",
            "childMenuList": [{
                "parentId": 10,
                "name": "Tape Publish Schedule",
                "frontRouter": "tapePublishSchedule/tapePublishSchedule_list",
                "lvl": 2,
                "orderSeq": 10,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 1
            }, {
                "parentId": 10,
                "name": "Control Point",
                "frontRouter": "controlPoint/controlPoint_list",
                "lvl": 2,
                "orderSeq": 20,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 2
            }, {
                "parentId": 10,
                "name": "Task Queue",
                "frontRouter": "taskQueue/taskQueue_list",
                "lvl": 2,
                "orderSeq": 30,
                "icon": "book",
                "accessLevel": "View+Add+Update++Upload++",
                "menuId": 3
            }, {
                "parentId": 10,
                "name": "Model List",
                "frontRouter": "modelList/modelList_list",
                "lvl": 2,
                "orderSeq": 40,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 4
            }, {
                "parentId": 10,
                "name": "Model List Analyze",
                "frontRouter": "modelListAnalyze/modelListAnalyze_list",
                "lvl": 2,
                "orderSeq": 50,
                "icon": "book",
                "accessLevel": "View+Add+++++",
                "menuId": 5
            }, {
                "parentId": 10,
                "name": "On Demand Refresh",
                "frontRouter": "onDemandRefresh/onDemandRefresh_list",
                "lvl": 2,
                "orderSeq": 60,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 6
            }, {
                "parentId": 10,
                "name": "On Demand Publish",
                "frontRouter": "onDemandPublish/onDemandPublish_list",
                "lvl": 2,
                "orderSeq": 70,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 7
            }],
            "menuId": 10
        }, {
            "parentId": 0,
            "name": "Material Master",
            "lvl": 1,
            "orderSeq": 100,
            "icon": "book",
            "childMenuList": [{
                "parentId": 100,
                "name": "Plant Maintenance",
                "frontRouter": "plantMaintenance/plantMaintenance_list",
                "lvl": 2,
                "orderSeq": 10,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 101
            }, {
                "parentId": 100,
                "name": "Brand - Plant",
                "frontRouter": "brandPlant/brandPlant_list",
                "lvl": 2,
                "orderSeq": 20,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 102
            }, {
                "parentId": 100,
                "name": "Formula",
                "frontRouter": "formula/formula_list",
                "lvl": 2,
                "orderSeq": 30,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 103
            }, {
                "parentId": 100,
                "name": "Item EOL",
                "frontRouter": "itemEOL/itemEOL_list",
                "lvl": 2,
                "orderSeq": 80,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 108
            }, {
                "parentId": 100,
                "name": "Product Description",
                "frontRouter": "productDescription/productDescription_list",
                "lvl": 2,
                "orderSeq": 90,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 109
            }, {
                "parentId": 100,
                "name": "Write Back Filter",
                "frontRouter": "writeBackFilter/writeBackFilter_list",
                "lvl": 2,
                "orderSeq": 110,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 111
            }, {
                "parentId": 100,
                "name": "User Commodity",
                "frontRouter": "userCommodity/userCommodity_list",
                "lvl": 2,
                "orderSeq": 120,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 112
            }, {
                "parentId": 100,
                "name": "Partial Cal",
                "frontRouter": "partialCal/partialCal_list",
                "lvl": 2,
                "orderSeq": 130,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 113
            }, {
                "parentId": 100,
                "name": "KEY SBB",
                "frontRouter": "keySBB/keySBB_list",
                "lvl": 2,
                "orderSeq": 140,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 114
            }, {
                "parentId": 100,
                "name": "BU_Brand",
                "frontRouter": "buBrand/buBrand_list",
                "lvl": 2,
                "orderSeq": 170,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 117
            }],
            "menuId": 100
        }, {
            "parentId": 0,
            "name": "Operation",
            "lvl": 1,
            "orderSeq": 110,
            "icon": "book",
            "childMenuList": [{
                "parentId": 200,
                "name": "Product Family",
                "frontRouter": "productFamily/productFamily_list",
                "lvl": 2,
                "orderSeq": 10,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 201
            }, {
                "parentId": 200,
                "name": "MT - PROD Family",
                "frontRouter": "machineTypeFamily/machineTypeFamily_list",
                "lvl": 2,
                "orderSeq": 20,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 202
            }, {
                "parentId": 200,
                "name": "Source of Supply",
                "frontRouter": "sos/sos_list",
                "lvl": 2,
                "orderSeq": 30,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 203
            }, {
                "parentId": 200,
                "name": "Where Used",
                "frontRouter": "whereUsed/whereUsed_list",
                "lvl": 2,
                "orderSeq": 40,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 204
            }, {
                "parentId": 200,
                "name": "Sales Office PCT",
                "frontRouter": "salesOfficePCT/salesOfficePCT_list",
                "lvl": 2,
                "orderSeq": 60,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 206
            }, {
                "parentId": 200,
                "name": "Sellable Country",
                "frontRouter": "sellCountry/sellCountry_list",
                "lvl": 2,
                "orderSeq": 70,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 207
            }, {
                "parentId": 200,
                "name": "Exchange Rate",
                "frontRouter": "exchangeRate/exchangeRate_list",
                "lvl": 2,
                "orderSeq": 80,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 208
            }, {
                "parentId": 200,
                "name": "Country Matrix",
                "frontRouter": "countryMatrix/countryMatrix_list",
                "lvl": 2,
                "orderSeq": 90,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 209
            }, {
                "parentId": 200,
                "name": "Country Code",
                "frontRouter": "countryCode/countryCode_list",
                "lvl": 2,
                "orderSeq": 100,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 210
            }, {
                "parentId": 200,
                "name": "Complex OD Mapping",
                "frontRouter": "complexODMapping/complexODMapping_list",
                "lvl": 2,
                "orderSeq": 110,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 211
            }, {
                "parentId": 200,
                "name": "MTM WB Priority",
                "frontRouter": "geoWBPriority/geoWBPriority_list",
                "lvl": 2,
                "orderSeq": 140,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 214
            }],
            "menuId": 200
        }, {
            "parentId": 0,
            "name": "Service",
            "lvl": 1,
            "orderSeq": 120,
            "icon": "book",
            "childMenuList": [{
                "parentId": 300,
                "name": "Service Cost",
                "frontRouter": "serviceCost/serviceCost_list",
                "lvl": 2,
                "orderSeq": 10,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 301
            }, {
                "parentId": 300,
                "name": "Component Warranty",
                "frontRouter": "componentWarranty/componentWarranty_list",
                "lvl": 2,
                "orderSeq": 20,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 302
            }, {
                "parentId": 300,
                "name": "PO WB",
                "frontRouter": "poWb/poWb_list",
                "lvl": 2,
                "orderSeq": 30,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 303
            }],
            "menuId": 300
        }, {
            "parentId": 0,
            "name": "Cost Tape",
            "lvl": 1,
            "orderSeq": 130,
            "icon": "book",
            "childMenuList": [{
                "parentId": 400,
                "name": "Cost Tape Upload",
                "frontRouter": "costTapeUpload/costTapeUpload_list",
                "lvl": 2,
                "orderSeq": 10,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 401
            }, {
                "parentId": 400,
                "name": "PUR Break Down",
                "frontRouter": "purBreakDownOri/purBreakDownOri_list",
                "lvl": 2,
                "orderSeq": 20,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 402
            }, {
                "parentId": 400,
                "name": "Cost Tape",
                "frontRouter": "costTape/costTape_list",
                "lvl": 2,
                "orderSeq": 40,
                "icon": "book",
                "accessLevel": "View++++++",
                "menuId": 404
            }, {
                "parentId": 400,
                "name": "Group Cost",
                "frontRouter": "groupCost/groupCost_list",
                "lvl": 2,
                "orderSeq": 50,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 405
            }, {
                "parentId": 400,
                "name": "Part Selected",
                "frontRouter": "partSelected/partSelected_list",
                "lvl": 2,
                "orderSeq": 70,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 407
            }, {
                "parentId": 400,
                "name": "Real Dummy Part Mapping",
                "frontRouter": "realDummyMapping/realDummyMapping_list",
                "lvl": 2,
                "orderSeq": 80,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 408
            }, {
                "parentId": 400,
                "name": "CTO-CV VK Cost",
                "frontRouter": "cTOCVVKCost/cTOCVVKCost_list",
                "lvl": 2,
                "orderSeq": 90,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 409
            }, {
                "parentId": 400,
                "name": "Group Cost For Model",
                "frontRouter": "groupCostForModel/groupCostForModel_list",
                "lvl": 2,
                "orderSeq": 100,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 410
            }, {
                "parentId": 400,
                "name": "Group Cost For Product Family",
                "frontRouter": "groupCostForProdF/groupCostForProdF_list",
                "lvl": 2,
                "orderSeq": 110,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 411
            }, {
                "parentId": 400,
                "name": "Group Cost For MT",
                "frontRouter": "groupCostForMT/groupCostForMT_list",
                "lvl": 2,
                "orderSeq": 120,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 412
            }, {
                "parentId": 400,
                "name": "Cost Tape Selected Import",
                "frontRouter": "costTapeSelectedImport/costTapeSelectedImport_list",
                "lvl": 2,
                "orderSeq": 130,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+++",
                "menuId": 413
            }, {
                "parentId": 400,
                "name": "Mark Up Upload",
                "frontRouter": "markupUpload/markupUpload_list",
                "lvl": 2,
                "orderSeq": 170,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 417
            }, {
                "parentId": 400,
                "name": "New Group Cost",
                "frontRouter": "newGroupCost/newGroupCost_list",
                "lvl": 2,
                "orderSeq": 180,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 418
            }],
            "menuId": 400
        }, {
            "parentId": 0,
            "name": "Economic Adder",
            "lvl": 1,
            "orderSeq": 140,
            "icon": "book",
            "childMenuList": [{
                "parentId": 500,
                "name": "Other GSC Cost",
                "frontRouter": "otherGSC/otherGSC_list",
                "lvl": 2,
                "orderSeq": 10,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 501
            }, {
                "parentId": 500,
                "name": "Inbound Freight",
                "frontRouter": "inboundFreight/inboundFreight_list",
                "lvl": 2,
                "orderSeq": 30,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 503
            }, {
                "parentId": 500,
                "name": "MVA",
                "frontRouter": "mva/mva_list",
                "lvl": 2,
                "orderSeq": 40,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 504
            }, {
                "parentId": 500,
                "name": "Commit High",
                "frontRouter": "commitHigh/commitHigh_list",
                "lvl": 2,
                "orderSeq": 50,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 505
            }, {
                "parentId": 500,
                "name": "GL Outbound FRT By Unit",
                "frontRouter": "gLOutboundFRTByUnit_list/gLOutboundFRTByUnit",
                "lvl": 2,
                "orderSeq": 60,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 506
            }, {
                "parentId": 500,
                "name": "GL Outbound FRT",
                "frontRouter": "glOutboundFrt/glOutboundFrt_list",
                "lvl": 2,
                "orderSeq": 70,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 507
            }, {
                "parentId": 500,
                "name": "GL Domestic FRT",
                "frontRouter": "gLDomesticFRT/gLDomesticFRT_list",
                "lvl": 2,
                "orderSeq": 80,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 508
            }, {
                "parentId": 500,
                "name": "CPB Freight",
                "frontRouter": "cpbFreight/cpbFreight_list",
                "lvl": 2,
                "orderSeq": 100,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 510
            }, {
                "parentId": 500,
                "name": "Dev Cost",
                "frontRouter": "devCost/devCost_list",
                "lvl": 2,
                "orderSeq": 110,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 511
            }],
            "menuId": 500
        }, {
            "parentId": 0,
            "name": "Commissionable Adder",
            "lvl": 1,
            "orderSeq": 150,
            "icon": "book",
            "childMenuList": [{
                "parentId": 600,
                "name": "Warranty",
                "frontRouter": "warranty/warranty_list",
                "lvl": 2,
                "orderSeq": 10,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 601
            }, {
                "parentId": 600,
                "name": "Uplift",
                "frontRouter": "uplift/uplift_list",
                "lvl": 2,
                "orderSeq": 20,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 602
            }, {
                "parentId": 600,
                "name": "E&O",
                "frontRouter": "eO/eO_list",
                "lvl": 2,
                "orderSeq": 30,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 603
            }, {
                "parentId": 600,
                "name": "GSC Real Cost Group",
                "frontRouter": "gscRealCostGroup/gscRealCostGroup_list",
                "lvl": 2,
                "orderSeq": 40,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 604
            }, {
                "parentId": 600,
                "name": "Country Adjustment",
                "frontRouter": "countryAdjust/countryAdjust_list",
                "lvl": 2,
                "orderSeq": 50,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 605
            }, {
                "parentId": 600,
                "name": "Country Adjustment For PH",
                "frontRouter": "countryAdjustPH/countryAdjustPH_list",
                "lvl": 2,
                "orderSeq": 60,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 606
            }, {
                "parentId": 600,
                "name": "Warranty MT Mapping",
                "frontRouter": "warrantyMTMapping/warrantyMTMapping_list",
                "lvl": 2,
                "orderSeq": 70,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 607
            }, {
                "parentId": 600,
                "name": "Warranty - CV Mapping",
                "frontRouter": "warrantyCVMapping/warrantyCVMapping_list",
                "lvl": 2,
                "orderSeq": 80,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 608
            }, {
                "parentId": 600,
                "name": "Warranty ID Mapping",
                "frontRouter": "warrantyIDMapping/warrantyIdMap_list",
                "lvl": 2,
                "orderSeq": 90,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 609
            }, {
                "parentId": 600,
                "name": "Country Duty",
                "frontRouter": "countryDuty/countryDuty_list",
                "lvl": 2,
                "orderSeq": 100,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 610
            }],
            "menuId": 600
        }, {
            "parentId": 0,
            "name": "Cost BOM",
            "lvl": 1,
            "orderSeq": 160,
            "icon": "book",
            "childMenuList": [{
                "parentId": 700,
                "name": "Cost BOM",
                "frontRouter": "costBom/costBom_list",
                "lvl": 2,
                "orderSeq": 10,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 701
            }, {
                "parentId": 700,
                "name": "Net Cost BOM",
                "frontRouter": "netCostBOM/netCostBom_list",
                "lvl": 2,
                "orderSeq": 20,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 702
            }, {
                "parentId": 700,
                "name": "L1 Cost BOM",
                "frontRouter": "l1CostBOM/l1CostBom_list",
                "lvl": 2,
                "orderSeq": 30,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 703
            }, {
                "parentId": 700,
                "name": "CTO Cost BOM",
                "frontRouter": "ctoCostBom/ctoCostBom_list",
                "lvl": 2,
                "orderSeq": 40,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 704
            }, {
                "parentId": 700,
                "name": "Net CTO Cost BOM",
                "frontRouter": "netCtoCostBom/netCtoCostBom_list",
                "lvl": 2,
                "orderSeq": 50,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 705
            }, {
                "parentId": 700,
                "name": "Tracking Model",
                "frontRouter": "trackingModel/trackingModel_list",
                "lvl": 2,
                "orderSeq": 60,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 706
            }, {
                "parentId": 700,
                "name": "SBB BOM Structure Replacement",
                "frontRouter": "sBBBOMStructureRepl/sBBBOMStructureRepl_list",
                "lvl": 2,
                "orderSeq": 70,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 707
            }, {
                "parentId": 700,
                "name": "SBB Component Filter",
                "frontRouter": "sBBComponentFilter/sBBComponentFilter_list",
                "lvl": 2,
                "orderSeq": 80,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 708
            }, {
                "parentId": 700,
                "name": "BOM Structure",
                "frontRouter": "bomStructure/bomStructure_list",
                "lvl": 2,
                "orderSeq": 90,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 709
            }, {
                "parentId": 700,
                "name": "SBB BOM Structure",
                "frontRouter": "sBBBomStructure/sBBBomStructure_list",
                "lvl": 2,
                "orderSeq": 100,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 710
            }, {
                "parentId": 700,
                "name": "Filtered SBB BOM Structure",
                "frontRouter": "filteredSBBBOMStructure/filteredSBBBomStructure_list",
                "lvl": 2,
                "orderSeq": 110,
                "icon": "book",
                "accessLevel": "View+",
                "menuId": 711
            }],
            "menuId": 700
        }, {
            "parentId": 0,
            "name": "Option Visual",
            "lvl": 1,
            "orderSeq": 170,
            "icon": "book",
            "childMenuList": [{
                "parentId": 800,
                "name": "Model SOS",
                "frontRouter": "modelSoS/modelSoS_list",
                "lvl": 2,
                "orderSeq": 10,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 801
            }, {
                "parentId": 800,
                "name": "Option Parent And Child Mapping",
                "frontRouter": "optionPCMapping/optionPCMapping_list",
                "lvl": 2,
                "orderSeq": 20,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 802
            }, {
                "parentId": 800,
                "name": "OGP",
                "frontRouter": "ogp/ogp_list",
                "lvl": 2,
                "orderSeq": 30,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 803
            }, {
                "parentId": 800,
                "name": "VGP",
                "frontRouter": "vgp/vgp_list",
                "lvl": 2,
                "orderSeq": 40,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 804
            }, {
                "parentId": 800,
                "name": "Model Weight",
                "frontRouter": "modelWeight/modelWeight_list",
                "lvl": 2,
                "orderSeq": 50,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 805
            }, {
                "parentId": 800,
                "name": "Model Freight Fee",
                "frontRouter": "modelFreightFee/modelFreightFee_list",
                "lvl": 2,
                "orderSeq": 60,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 806
            }, {
                "parentId": 800,
                "name": "Option Uplift",
                "frontRouter": "optionUplift/optionUplift_list",
                "lvl": 2,
                "orderSeq": 70,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 807
            }],
            "menuId": 800
        }, {
            "parentId": 0,
            "name": "Standard Cost",
            "lvl": 1,
            "orderSeq": 180,
            "icon": "book",
            "childMenuList": [{
                "parentId": 900,
                "name": "Standard Cost Report",
                "frontRouter": "stdcostReport/stdcostReport_list",
                "lvl": 2,
                "orderSeq": 10,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 901
            }, {
                "parentId": 900,
                "name": "I2&ECC Plant Mapping",
                "frontRouter": "i2eccPlantMap/i2eccPlantMap_list",
                "lvl": 2,
                "orderSeq": 20,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 902
            }, {
                "parentId": 900,
                "name": "Daily Standard Cost",
                "frontRouter": "dailyStandardCost/dailyStandardCost_list",
                "lvl": 2,
                "orderSeq": 30,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 903
            }],
            "menuId": 900
        }, {
            "parentId": 0,
            "name": "Report",
            "lvl": 1,
            "orderSeq": 190,
            "icon": "book",
            "childMenuList": [{
                "parentId": 1100,
                "name": "Download Reports",
                "frontRouter": "downloadReports/downloadReports_list",
                "lvl": 2,
                "orderSeq": 10,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 1101
            }, {
                "parentId": 1100,
                "name": "Flexible Query",
                "frontRouter": "flexibleQuery/flexibleQuery_list",
                "lvl": 2,
                "orderSeq": 20,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 1102
            }, {
                "parentId": 1100,
                "name": "Error Report",
                "frontRouter": "errorReport/flexibleReport_list/RPTF003",
                "lvl": 2,
                "orderSeq": 30,
                "icon": "book",
                "accessLevel": "View+++++Execute+",
                "menuId": 1103
            }, {
                "parentId": 1100,
                "name": "BOM Missing TOT Report",
                "frontRouter": "bomMissingTotReport/flexibleReport_list/RPTF001",
                "lvl": 2,
                "orderSeq": 40,
                "icon": "book",
                "accessLevel": "View+++++Execute+",
                "menuId": 1104
            }, {
                "parentId": 1100,
                "name": "Bridge Report",
                "frontRouter": "bridgeReport/flexibleReport_list/RPTF002",
                "lvl": 2,
                "orderSeq": 50,
                "icon": "book",
                "accessLevel": "View+++++Execute+",
                "menuId": 1105
            }, {
                "parentId": 1100,
                "name": "Missing Part Report",
                "frontRouter": "missingPartReport/flexibleReport_list/RPTG001",
                "lvl": 2,
                "orderSeq": 60,
                "icon": "book",
                "accessLevel": "View+++++Execute+",
                "menuId": 1106
            }, {
                "parentId": 1100,
                "name": "Topbox Total Report",
                "frontRouter": "topboxTotalReport/flexibleReport_list/RPTG002",
                "lvl": 2,
                "orderSeq": 70,
                "icon": "book",
                "accessLevel": "View++++++",
                "menuId": 1107
            }, {
                "parentId": 1100,
                "name": "Unit Cost Report",
                "frontRouter": "unitCostRpt/unitCostRpt_list",
                "lvl": 2,
                "orderSeq": 80,
                "icon": "book",
                "accessLevel": "View++++++",
                "menuId": 1108
            }, {
                "parentId": 1100,
                "name": "Unit Cost Without Freight",
                "frontRouter": "unitCostWithoutFrtReport/flexibleReport_list/RPTG004",
                "lvl": 2,
                "orderSeq": 90,
                "icon": "book",
                "accessLevel": "View+",
                "menuId": 1109
            }, {
                "parentId": 1100,
                "name": "Cost Tape By Spec",
                "frontRouter": "costTapeBySpec/flexibleReport_list/RPTG005",
                "lvl": 2,
                "orderSeq": 100,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 1110
            }, {
                "parentId": 1100,
                "name": "Cost Tape By Spec Family",
                "frontRouter": "costTapeBySpecFamily/flexibleReport_list/RPTG006",
                "lvl": 2,
                "orderSeq": 110,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 1111
            }, {
                "parentId": 1100,
                "name": "Quarter 2 Quarter Comparison",
                "frontRouter": "q2q/flexibleReport_list/RPTG007",
                "lvl": 2,
                "orderSeq": 120,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 1112
            }, {
                "parentId": 1100,
                "name": "CTO CV Cost Report",
                "frontRouter": "ctoCvCost/ctoCvCost_list",
                "lvl": 2,
                "orderSeq": 130,
                "icon": "book",
                "accessLevel": "View+++++Execute+",
                "menuId": 1113
            }, {
                "parentId": 1100,
                "name": "Key Sbb Error Report",
                "frontRouter": "keySbbError/flexibleReport_list/RPTG008",
                "lvl": 2,
                "orderSeq": 140,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+Execute+",
                "menuId": 1114
            }, {
                "parentId": 1100,
                "name": "Newly Parts Report",
                "frontRouter": "newlyPartsReport/flexibleReport_list/RPTG009",
                "lvl": 2,
                "orderSeq": 150,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+Execute+",
                "menuId": 1115
            }, {
                "parentId": 1100,
                "name": "Proactive VK Cost Report",
                "frontRouter": "proactiveVkCost/proactiveVkCost_list",
                "lvl": 2,
                "orderSeq": 160,
                "icon": "book",
                "accessLevel": "View++++++",
                "menuId": 1116
            }, {
                "parentId": 1100,
                "name": "Outbound Final Freight Report",
                "frontRouter": "outboundFinalFrit/flexibleReport_list/RPTG011",
                "lvl": 2,
                "orderSeq": 170,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+",
                "menuId": 1117
            }, {
                "parentId": 1100,
                "name": "CTO SBB Report",
                "frontRouter": "ctoSbbReport/flexibleReport_list/RPTG012",
                "lvl": 2,
                "orderSeq": 180,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload++",
                "menuId": 1118
            }],
            "menuId": 1100
        }, {
            "parentId": 0,
            "name": "Admin",
            "lvl": 1,
            "orderSeq": 200,
            "icon": "book",
            "childMenuList": [{
                "parentId": 1200,
                "name": "Menu Management",
                "frontRouter": "menu/menu_list",
                "lvl": 2,
                "orderSeq": 10,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete",
                "menuId": 1201
            }, {
                "parentId": 1200,
                "name": "User Management",
                "frontRouter": "userManage/userManage_list",
                "lvl": 2,
                "orderSeq": 20,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete",
                "menuId": 1304
            }, {
                "parentId": 1200,
                "name": "Account Management",
                "frontRouter": "userAccount/userAccount_list",
                "lvl": 2,
                "orderSeq": 30,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete",
                "menuId": 1307
            }, {
                "parentId": 1200,
                "name": "Group Management",
                "frontRouter": "userGroup/userGroup_list",
                "lvl": 2,
                "orderSeq": 40,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete",
                "menuId": 1309
            }, {
                "parentId": 1200,
                "name": "Role Management",
                "frontRouter": "userRole/userRole_list",
                "lvl": 2,
                "orderSeq": 50,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete",
                "menuId": 1310
            }, {
                "parentId": 1200,
                "name": "News Edit",
                "frontRouter": "news/news_list",
                "lvl": 2,
                "orderSeq": 60,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+Execute+",
                "menuId": 1361
            }, {
                "parentId": 1200,
                "name": "Admin Console",
                "frontRouter": "adminConsole/adminConsole_list",
                "lvl": 2,
                "orderSeq": 999,
                "icon": "book",
                "accessLevel": "View+Add+Update+Delete+Upload+Execute+",
                "menuId": 1370
            }],
            "menuId": 1200
        }]
    }
}
const findUnread = (options) => {
    return { "code": "0", "msg": "ok", "result|1-100": 100 }
}
const showNews = (options) => {
    const params = getQueryParameters(options)
    if (params == 1) {
        return { "code": "0", "msg": "ok", "result": { "rid": "AAEY4dAENAAF9m/AAB", "msgFrom": "tuyn1_t", "msgTo": "tpg", "msgType": "news", "msgContent": "<div style=\"text-align: left; margin-top: 1em; margin-bottom: 1em;\">\n<p class=\"MsoPlainText\">Dear Users,</p>\n<p class=\"MsoPlainText\">Please be aware that <strong style=\"mso-bidi-font-weight: normal;\"><span style=\"font-size: 16.0pt;\">CFE Old UI will Suspended</span></strong> on <strong style=\"mso-bidi-font-weight: normal;\"><span style=\"font-size: 20.0pt; color: red;\">Nov10</span></strong> (unable to login old CFE UI &lt;http://aps.lenovo.com/abpp_ui_cfe/core/login.jsp&gt;).</p>\n<p class=\"MsoPlainText\"><strong style=\"mso-bidi-font-weight: normal;\"><span style=\"font-size: 12.0pt; color: red;\">Chrome</span></strong> browser is recommended.</p>\n<p class=\"MsoPlainText\">&nbsp;</p>\n<p class=\"MsoPlainText\">We have delivered several rounds of training sessions about this Upgrade</p>\n<p class=\"MsoPlainText\"><strong style=\"mso-bidi-font-weight: normal;\">Linkage as below:</strong></p>\n<p class=\"MsoPlainText\">English Session: <a href=\"Dear%20Users,%20Please%20be%20aware%20that%20CFE%20Old%20UI%20will%20Suspended%20on%20Nov10%20(unable%20to%20login%20old%20CFE%20UI).%20Chrome%20browser%20is%20recommended.%20%20We%20have%20delivered%20several%20rounds%20of%20training%20sessions%20about%20this%20Upgrade%20Linkage%20as%20below:%20English%20Session:%20https:/mooc.lenovo.com/en/courses/cfe-ui-2-0-introduction/%20Chinese%20Session:%20https:/mooc.lenovo.com/cn/courses/cfe2-0cn/%20%20CFE%20Old%20UI%20Server%20Finally%20Sunset-3~6%20Months%20after%20Suspending%20Any%20Problem,%20please%20feel%20free%20to%20tell%20us.%20And%20please%20cascade%20this%20notification%20to%20your%20team%20members%20if%20we%20missed%20them.\">https://mooc.lenovo.com/en/courses/cfe-ui-2-0-introduction/</a></p>\n<p class=\"MsoPlainText\">Chinese Session: <a href=\"Dear%20Users,%20Please%20be%20aware%20that%20CFE%20Old%20UI%20will%20Suspended%20on%20Nov10%20(unable%20to%20login%20old%20CFE%20UI).%20Chrome%20browser%20is%20recommended.%20%20We%20have%20delivered%20several%20rounds%20of%20training%20sessions%20about%20this%20Upgrade%20Linkage%20as%20below:%20English%20Session:%20https:/mooc.lenovo.com/en/courses/cfe-ui-2-0-introduction/%20Chinese%20Session:%20https:/mooc.lenovo.com/cn/courses/cfe2-0cn/%20%20CFE%20Old%20UI%20Server%20Finally%20Sunset-3~6%20Months%20after%20Suspending%20Any%20Problem,%20please%20feel%20free%20to%20tell%20us.%20And%20please%20cascade%20this%20notification%20to%20your%20team%20members%20if%20we%20missed%20them.\">https://mooc.lenovo.com/cn/courses/cfe2-0cn/</a></p>\n<p class=\"MsoPlainText\">&nbsp;</p>\n<p class=\"MsoPlainText\">CFE Old UI Server Finally Sunset-3~6 Months after Suspending</p>\n<p class=\"MsoPlainText\">Any Problem, please feel free to tell us.</p>\n<p class=\"MsoPlainText\">And please cascade this notification to your team members if we missed them.</p>\n</div>", "createdTime": "2019-10-30 17:24:09", "readMark": 1 } }
    }
    return { "code": "0", "msg": "ok" }

}
Mock.mock(/\/login\/login/, 'post', login)
Mock.mock(/\/login\/getMenuList/, 'get', getMenuList)
Mock.mock(/\/sysUIMessage\/findUnread/, 'get', findUnread)
Mock.mock(/\/sysUIMessage\/showNews/, 'get', showNews)

