import commonWidth from "./columnCommonWidth_lang.js"
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Check Point',
        dataIndex: 'checkPoint',
        align: 'left',
        width: commonWidth.checkPoint,
        // sorter: true
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: commonWidth.status,
        // sorter: true
    },
    {
        title: 'Message',
        dataIndex: 'message',
        align: 'left',
        width: commonWidth.message,
        // sorter: true
    },
    {
        title: 'Help Info',
        dataIndex: 'helpInfo',
        align: 'left',
        width: commonWidth.helpInfo,
        // sorter: true
    },
    {
        title: 'View Data',
        dataIndex: 'viewData',
        align: 'left',
        width: commonWidth.viewData,
        // sorter: true
    }
]

const tableTitle_langEn1 = [
    {
        title: 'Brand',
        dataIndex: 'brand',
        align: 'left',
        width: commonWidth.brand,
        // sorter: true
    },
    {
        title: 'Product Family',
        dataIndex: 'aspPrdFamily',
        align: 'left',
        width: commonWidth.prodFamily,
        // sorter: true
    },
    {
        title: 'Item',
        dataIndex: 'item',
        align: 'left',
        width: commonWidth.item,
        // sorter: true
    },
    {
        title: 'Description',
        dataIndex: 'itemDesc',
        align: 'left',
        width: commonWidth.itemDesc,
        // sorter: true
    },
    {
        title: 'Plant',
        dataIndex: 'plant',
        align: 'left',
        width: commonWidth.plant,
        // sorter: true
    },
    {
        title: 'Subgeo',
        dataIndex: 'subgeo',
        align: 'left',
        width: commonWidth.subgeo,
        // sorter: true
    },
    {
        title: 'Country/ Region',
        dataIndex: 'country',
        align: 'left',
        width: commonWidth.country,
        // sorter: true
    },
    {
        title: 'Bom Plant',
        dataIndex: 'bomPlant',
        align: 'left',
        width: commonWidth.bomPlant,
        // sorter: true
    },
    {
        title: 'Item Type',
        dataIndex: 'itemType',
        align: 'left',
        width: commonWidth.itemType,
        // sorter: true
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'right',
        width: commonWidth.sysLastModifiedDate,
        // sorter: true
    }
]


let filter_langEn = [
    {
        index: 1,
        label: 'Model',
        decorator: 'model',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 2,
        label: 'Plant',
        decorator: 'plant',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 3,
        label: 'Country/Region',
        decorator: 'country',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
]

export default {
    tableTitle_langEn,
    tableTitle_langEn1,
    filter_langEn
}
