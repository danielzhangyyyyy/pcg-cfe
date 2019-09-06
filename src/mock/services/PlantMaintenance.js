import Mock from 'mockjs2'
import { builder } from '../util'

//
const plantData = () => {
    return builder({
            "data": [{
                id: 1,
                "PRODUCT_GROUP" : "TPG",
                "PLANT" : "3NOD",
                "PLANT_TYPE" : "OEM",
                "PLANT_DESC" : "",
                "ACTION" : "",
                "STATUS" : "",
                "SYS_CREATED_DATE" : "2017-10-17 10:05:57",
                "SYS_CREATED_BY" : "wangchen20_t",
                "SYS_LAST_MODIFIED_DATE" : "2017-10-17 10:05:57",
                "SYS_LAST_MODIFIED_BY" : "wangchen20_t",
                "PLANT_COUNTRY" : "CN",
                "MM_PLANT" : "",
                "PLANT_CITY" : ""
            }, {
                id: 2,
                "PRODUCT_GROUP" : "TPG",
                "PLANT" : "AVC",
                "PLANT_TYPE" : "OEM",
                "PLANT_DESC" : "OEM plant",
                "ACTION" : "",
                "STATUS" : "",
                "SYS_CREATED_DATE" : "2015-07-29 11:38:59",
                "SYS_CREATED_BY" : "kateyi",
                "SYS_LAST_MODIFIED_DATE" : "2015-07-29 11:38:59",
                "SYS_LAST_MODIFIED_BY" : "kateyi",
                "PLANT_COUNTRY" : "CN",
                "MM_PLANT" : "",
                "PLANT_CITY" : ""
            }, {
                id: 3,
                "PRODUCT_GROUP" : "TPG",
                "PLANT" : "B501",
                "PLANT_TYPE" : "DC",
                "PLANT_DESC" : "Brazil Fulfillment Center",
                "ACTION" : "",
                "STATUS" : "",
                "SYS_CREATED_DATE" : "2014-10-08 16:33:39",
                "SYS_CREATED_BY" : "jannyoy_t",
                "SYS_LAST_MODIFIED_DATE" : "2014-10-08 16:33:39",
                "SYS_LAST_MODIFIED_BY" : "jannyoy_t",
                "PLANT_COUNTRY" : "BR",
                "MM_PLANT" : "",
                "PLANT_CITY" : ""
            }, {
                id: 4,
                "PRODUCT_GROUP" : "TPG",
                "PLANT" : "B510",
                "PLANT_TYPE" : "IN_HOUSE",
                "PLANT_DESC" : "B510 Brazil",
                "ACTION" : "",
                "STATUS" : "",
                "SYS_CREATED_DATE" : "2013-01-14 15:46:37",
                "SYS_CREATED_BY" : "kateyi_t",
                "SYS_LAST_MODIFIED_DATE" : "2013-01-14 15:46:37",
                "SYS_LAST_MODIFIED_BY" : "kateyi_t",
                "PLANT_COUNTRY" : "BR",
                "MM_PLANT" : "B510",
                "PLANT_CITY" : ""
            }, {
                id: 5,
                "PRODUCT_GROUP" : "TPG",
                "PLANT" : "B520",
                "PLANT_TYPE" : "IN_HOUSE",
                "PLANT_DESC" : "Brazil",
                "ACTION" : "",
                "STATUS" : "",
                "SYS_CREATED_DATE" : "2013-01-14 15:44:11",
                "SYS_CREATED_BY" : "jannyoy_t",
                "SYS_LAST_MODIFIED_DATE" : "2013-01-14 15:44:11",
                "SYS_LAST_MODIFIED_BY" : "jannyoy_t",
                "PLANT_COUNTRY" : "BR",
                "MM_PLANT" : "B520",
                "PLANT_CITY" : ""
            }, {
                id: 6,
                "PRODUCT_GROUP" : "TPG",
                "PLANT" : "BITLAND",
                "PLANT_TYPE" : "OEM",
                "PLANT_DESC" : "",
                "ACTION" : "",
                "STATUS" : "",
                "SYS_CREATED_DATE" : "2017-11-20 15:13:24",
                "SYS_CREATED_BY" : "hanpj1_f",
                "SYS_LAST_MODIFIED_DATE" : "2017-11-20 15:13:24",
                "SYS_LAST_MODIFIED_BY" : "hanpj1_f",
                "PLANT_COUNTRY" : "CN",
                "MM_PLANT" : "",
                "PLANT_CITY" : ""
            }, {
                id: 7,
                "PRODUCT_GROUP" : "TPG",
                "PLANT" : "BOE MNT",
                "PLANT_TYPE" : "OEM",
                "PLANT_DESC" : "BOE MNT SZ/HF",
                "ACTION" : "",
                "STATUS" : "",
                "SYS_CREATED_DATE" : "2017-08-22 16:39:12",
                "SYS_CREATED_BY" : "wangchen20_t",
                "SYS_LAST_MODIFIED_DATE" : "2017-08-22 16:39:12",
                "SYS_LAST_MODIFIED_BY" : "wangchen20_t",
                "PLANT_COUNTRY" : "CN",
                "MM_PLANT" : "",
                "PLANT_CITY" : ""
            }, {
                id: 8,
                "PRODUCT_GROUP" : "TPG",
                "PLANT" : "COMPAL",
                "PLANT_TYPE" : "OEM",
                "PLANT_DESC" : "OEM plant",
                "ACTION" : "",
                "STATUS" : "",
                "SYS_CREATED_DATE" : "2010-08-17 20:34:12",
                "SYS_CREATED_BY" : "",
                "SYS_LAST_MODIFIED_DATE" : "2010-08-18 14:29:36",
                "SYS_LAST_MODIFIED_BY" : "lancycao",
                "PLANT_COUNTRY" : "CN",
                "MM_PLANT" : "",
                "PLANT_CITY" : ""
            }, {
                id: 9,
                "PRODUCT_GROUP" : "TPG",
                "PLANT" : "COMPAL_LA",
                "PLANT_TYPE" : "OEM",
                "PLANT_DESC" : "COMPAL Brazil",
                "ACTION" : "",
                "STATUS" : "",
                "SYS_CREATED_DATE" : "2010-12-06 00:00:00",
                "SYS_CREATED_BY" : "",
                "SYS_LAST_MODIFIED_DATE" : "",
                "SYS_LAST_MODIFIED_BY" : "",
                "PLANT_COUNTRY" : "BR",
                "MM_PLANT" : "",
                "PLANT_CITY" : ""
            },
                {
                    id: 10,
                    "PRODUCT_GROUP" : "TPG",
                    "PLANT" : "3NOD",
                    "PLANT_TYPE" : "OEM",
                    "PLANT_DESC" : "",
                    "ACTION" : "",
                    "STATUS" : "",
                    "SYS_CREATED_DATE" : "2017-10-17 10:05:57",
                    "SYS_CREATED_BY" : "wangchen20_t",
                    "SYS_LAST_MODIFIED_DATE" : "2017-10-17 10:05:57",
                    "SYS_LAST_MODIFIED_BY" : "wangchen20_t",
                    "PLANT_COUNTRY" : "CN",
                    "MM_PLANT" : "",
                    "PLANT_CITY" : ""
                }, {
                    id: 11,
                    "PRODUCT_GROUP" : "TPG",
                    "PLANT" : "AVC",
                    "PLANT_TYPE" : "OEM",
                    "PLANT_DESC" : "OEM plant",
                    "ACTION" : "",
                    "STATUS" : "",
                    "SYS_CREATED_DATE" : "2015-07-29 11:38:59",
                    "SYS_CREATED_BY" : "kateyi",
                    "SYS_LAST_MODIFIED_DATE" : "2015-07-29 11:38:59",
                    "SYS_LAST_MODIFIED_BY" : "kateyi",
                    "PLANT_COUNTRY" : "CN",
                    "MM_PLANT" : "",
                    "PLANT_CITY" : ""
                }, {
                    id: 12,
                    "PRODUCT_GROUP" : "TPG",
                    "PLANT" : "B501",
                    "PLANT_TYPE" : "DC",
                    "PLANT_DESC" : "Brazil Fulfillment Center",
                    "ACTION" : "",
                    "STATUS" : "",
                    "SYS_CREATED_DATE" : "2014-10-08 16:33:39",
                    "SYS_CREATED_BY" : "jannyoy_t",
                    "SYS_LAST_MODIFIED_DATE" : "2014-10-08 16:33:39",
                    "SYS_LAST_MODIFIED_BY" : "jannyoy_t",
                    "PLANT_COUNTRY" : "BR",
                    "MM_PLANT" : "",
                    "PLANT_CITY" : ""
                }, {
                    id: 13,
                    "PRODUCT_GROUP" : "TPG",
                    "PLANT" : "B510",
                    "PLANT_TYPE" : "IN_HOUSE",
                    "PLANT_DESC" : "B510 Brazil",
                    "ACTION" : "",
                    "STATUS" : "",
                    "SYS_CREATED_DATE" : "2013-01-14 15:46:37",
                    "SYS_CREATED_BY" : "kateyi_t",
                    "SYS_LAST_MODIFIED_DATE" : "2013-01-14 15:46:37",
                    "SYS_LAST_MODIFIED_BY" : "kateyi_t",
                    "PLANT_COUNTRY" : "BR",
                    "MM_PLANT" : "B510",
                    "PLANT_CITY" : ""
                }, {
                    id: 14,
                    "PRODUCT_GROUP" : "TPG",
                    "PLANT" : "B520",
                    "PLANT_TYPE" : "IN_HOUSE",
                    "PLANT_DESC" : "Brazil",
                    "ACTION" : "",
                    "STATUS" : "",
                    "SYS_CREATED_DATE" : "2013-01-14 15:44:11",
                    "SYS_CREATED_BY" : "jannyoy_t",
                    "SYS_LAST_MODIFIED_DATE" : "2013-01-14 15:44:11",
                    "SYS_LAST_MODIFIED_BY" : "jannyoy_t",
                    "PLANT_COUNTRY" : "BR",
                    "MM_PLANT" : "B520",
                    "PLANT_CITY" : ""
                }, {
                    id: 15,
                    "PRODUCT_GROUP" : "TPG",
                    "PLANT" : "BITLAND",
                    "PLANT_TYPE" : "OEM",
                    "PLANT_DESC" : "",
                    "ACTION" : "",
                    "STATUS" : "",
                    "SYS_CREATED_DATE" : "2017-11-20 15:13:24",
                    "SYS_CREATED_BY" : "hanpj1_f",
                    "SYS_LAST_MODIFIED_DATE" : "2017-11-20 15:13:24",
                    "SYS_LAST_MODIFIED_BY" : "hanpj1_f",
                    "PLANT_COUNTRY" : "CN",
                    "MM_PLANT" : "",
                    "PLANT_CITY" : ""
                }, {
                    id: 16,
                    "PRODUCT_GROUP" : "TPG",
                    "PLANT" : "BOE MNT",
                    "PLANT_TYPE" : "OEM",
                    "PLANT_DESC" : "BOE MNT SZ/HF",
                    "ACTION" : "",
                    "STATUS" : "",
                    "SYS_CREATED_DATE" : "2017-08-22 16:39:12",
                    "SYS_CREATED_BY" : "wangchen20_t",
                    "SYS_LAST_MODIFIED_DATE" : "2017-08-22 16:39:12",
                    "SYS_LAST_MODIFIED_BY" : "wangchen20_t",
                    "PLANT_COUNTRY" : "CN",
                    "MM_PLANT" : "",
                    "PLANT_CITY" : ""
                }, {
                    id: 17,
                    "PRODUCT_GROUP" : "TPG",
                    "PLANT" : "COMPAL",
                    "PLANT_TYPE" : "OEM",
                    "PLANT_DESC" : "OEM plant",
                    "ACTION" : "",
                    "STATUS" : "",
                    "SYS_CREATED_DATE" : "2010-08-17 20:34:12",
                    "SYS_CREATED_BY" : "",
                    "SYS_LAST_MODIFIED_DATE" : "2010-08-18 14:29:36",
                    "SYS_LAST_MODIFIED_BY" : "lancycao",
                    "PLANT_COUNTRY" : "CN",
                    "MM_PLANT" : "",
                    "PLANT_CITY" : ""
                }, {
                    id: 18,
                    "PRODUCT_GROUP" : "TPG",
                    "PLANT" : "COMPAL_LA",
                    "PLANT_TYPE" : "OEM",
                    "PLANT_DESC" : "COMPAL Brazil",
                    "ACTION" : "",
                    "STATUS" : "",
                    "SYS_CREATED_DATE" : "2010-12-06 00:00:00",
                    "SYS_CREATED_BY" : "",
                    "SYS_LAST_MODIFIED_DATE" : "",
                    "SYS_LAST_MODIFIED_BY" : "",
                    "PLANT_COUNTRY" : "BR",
                    "MM_PLANT" : "",
                    "PLANT_CITY" : ""
                }],
            "pageSize": 10,
            "pageNo": 1,
            "totalPage": 2,
            "totalCount": 18
    })
}

// Mock.mock(/api\/plantMaintenance/, 'get', plantData)

