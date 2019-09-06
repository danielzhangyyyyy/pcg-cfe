import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Product Group',
        dataIndex: 'productGroup',
        align: 'left',
        width: 135,
        sorter: true
    },
    {
        title: 'Type',
        dataIndex: 'type',
        align: 'left',
        width: commonWidth.itemType,
        sorter: true
    },
    {
        title: 'Name',
        dataIndex: 'name',
        align: 'left',
        width: commonWidth.item,
        sorter: true
    },
    {
        title: 'Sys Created By',
        dataIndex: 'sysCreatedBy',
        align: 'left',
        width: commonWidth.sysCreatedBy,
        sorter: true
    },
    {
        title: 'Sys Created Date',
        dataIndex: 'sysCreatedDate',
        align: 'left',
        width: commonWidth.sysCreatedDate,
        sorter: true
    }
]

//edit页面
const editAndDetail_langEn =[
    {
        label: 'Product Group',
        decorator: 'productGroup',
        required: true,
        message: 'Please input Product Group'
    },
    {
        label: 'Type',
        decorator: 'type',
        required: true,
        message: 'Please input Type'
    },
    {
        label: 'Name',
        decorator: 'name',
        required: true,
        message: 'Please input Name'
    },
    {
        label: 'Sys Created By',
        decorator: 'sysCreatedBy',
        required: true,
        message: 'Please input Sys Created By'
    },
    {
        label: 'Sys Created Date',
        decorator: 'sysCreatedDate',
        required: true,
        message: 'Please input Sys Created Date'
    }
]

let filter_langEn = [
{
    index: 0,
    label: 'Type',
    decorator: 'type',
    required: false,
    allowClear: true,
    message: 'Please select',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    text: '',
    dropDownList: []
},
{
    index: 1,
    label: 'Name',
    decorator: 'name',
    required: false,
    allowClear: true,
    message: 'Please input',
    placeHolder: 'Please input',
    inputType: 'input',
    text: ''
}]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}