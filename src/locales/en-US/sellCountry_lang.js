import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Model',
        dataIndex: 'model',
        align: 'left',
        width: commonWidth.model,
        sorter: true
    },
    {
        title: 'Subgeo',
        dataIndex: 'subgeo',
        align: 'left',
        width: commonWidth.subgeo,
        sorter: true
    },
    {
        title: 'Country/ Region',
        dataIndex: 'country',
        align: 'left',
        width: commonWidth.country,
        sorter: true
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        sorter: true
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        sorter: true
    },
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'Model',
        decorator: 'model',
        required: true,
        message: 'Model',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'Subgeo',
        decorator: 'subgeo',
        required: true,
        message: 'Subgeo',
        editDisabled: false,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        label: 'Country/Region',
        decorator: 'country',
        required: true,
        message: 'Country/Region',
        editDisabled: false,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    }
]

let filter_langEn = [{
    index: 0,
    label: 'Model',
    decorator: 'model',
    required: false,
    allowClear: true,
    message: 'Please input Model',
    placeHolder: 'Model',
    inputType: 'input',
    text: ''
},
{
    index: 1,
    label: 'Subgeo',
    decorator: 'subgeo',
    required: false,
    allowClear: true,
    message: 'Please select Subgeo',
    placeHolder: 'Subgeo',
    inputType: 'dropDown',
    text: '',
    dropDownList: []
},
{
    index: 2,
    label: 'Country/Region',
    decorator: 'country',
    required: false,
    allowClear: true,
    message: 'Please select Country/Region',
    placeHolder: 'Country/Region',
    inputType: 'dropDown',
    text: '',
    dropDownList: []
}]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}