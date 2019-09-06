import commonWidth from "./columnCommonWidth_lang.js"

const deltaSize = commonWidth.deltaSize

// list页面表头
const tableTitle_langEn = [
    {
        title: 'Product Group',
        dataIndex: 'productGroup',
        align: 'left',
        width: commonWidth.productGroup,
        sorter: true
    },
    {
        title: 'Item Type',
        dataIndex: 'itemType',
        align: 'left',
        width: commonWidth.itemType,
        sorter: true
    },
    {
        title: 'Item',
        dataIndex: 'item',
        align: 'left',
        width: commonWidth.item,
        sorter: true
    },
    {
        title: 'Sys Created Date',
        dataIndex: 'sysCreatedDate',
        align: 'left',
        width: commonWidth.sysCreatedDate,
        sorter: true
    },
    {
        title: 'Sys Created By',
        dataIndex: 'sysCreatedBy',
        align: 'left',
        width: commonWidth.sysCreatedBy,
        sorter: true
    }
]

let filter_langEn = [
    {
        index: 1,
        label: 'Status',
        decorator: 'status',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: 'NEW',
        dropDownList: []
    },
    {
        index: 2,
        label: 'Item Type',
        decorator: 'itemType',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 3,
        label: 'Item',
        decorator: 'item',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'input',
        text: ''
    },
    {
        index: 4,
        label: 'Owner',
        decorator: 'sysCreatedBy',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'input',
        text: ''
    },
    {
        index: 5,
        label: 'Start Date',
        decorator: 'startDate',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'date',
        text: ''
    },
    {
        index: 6,
        label: 'End Date',
        decorator: 'endDate',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'date',
        text: ''
    }
]

export default {
    deltaSize,
    tableTitle_langEn,
    filter_langEn
}
