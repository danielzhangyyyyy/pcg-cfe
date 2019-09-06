import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        align: 'left',
        width: commonWidth.brand,
        sorter: true
    },
    {
        title: 'Product Family',
        dataIndex: 'costProdFamily',
        align: 'left',
        width: commonWidth.prodFamily,
        sorter: true
    },
    {
        title: 'EOL Status',
        dataIndex: 'eolStatus',
        align: 'left',
        width: commonWidth.eolStatus,
        sorter: true
    },
    {
        title: 'Life Start Date',
        dataIndex: 'eolStartdate',
        align: 'left',
        width: commonWidth.eolStartdate,
        sorter: true
    },
    {
        title: 'Life End Date',
        dataIndex: 'eolEnddate',
        align: 'left',
        width: commonWidth.eolEnddate,
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
const add_langEn = [
    {
        label: 'Product Group',
        decorator: 'productGroup',
        required: true,
        message: 'Product Group',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'Brand',
        decorator: 'brand',
        required: true,
        message: 'Brand',
        editDisabled: false,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        label: 'Product Family',
        decorator: 'costProdFamily',
        required: true,
        message: 'Product Family',
        editDisabled: false,
        inputType: 'autoComplete',
        dropDownList: [],
        text: ''
    },
    {
        label: 'EOL Status',
        decorator: 'eolStatus',
        required: true,
        message: 'EOL Status',
        editDisabled: false,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        label: 'Life Start Date',
        decorator: 'eolStartdate',
        required: true,
        message: 'Life Start Date',
        editDisabled: false,
        inputType: 'date',
        text: ''
    },
    {
        label: 'Life End Date',
        decorator: 'eolEnddate',
        required: true,
        message: 'Life End Date',
        editDisabled: false,
        inputType: 'date',
        text: ''
    },
]

const editAndDetail_langEn = [
    {
        label: 'Product Group',
        decorator: 'productGroup',
        required: true,
        message: 'Product Group',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'Brand',
        decorator: 'brand',
        required: true,
        message: 'Brand',
        editDisabled: true,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        label: 'Product Family',
        decorator: 'costProdFamily',
        required: true,
        message: 'Product Family',
        editDisabled: true,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        label: 'EOL Status',
        decorator: 'eolStatus',
        required: true,
        message: 'EOL Status',
        editDisabled: false,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        label: 'Life Start Date',
        decorator: 'eolStartdate',
        required: true,
        message: 'Life Start Date',
        editDisabled: false,
        inputType: 'date',
        text: ''
    },
    {
        label: 'Life End Date',
        decorator: 'eolEnddate',
        required: true,
        message: 'Life End Date',
        editDisabled: false,
        inputType: 'date',
        text: ''
    },
]

let filter_langEn = [{
    index: 0,
    label: 'Brand',
    decorator: 'brand',
    required: false,
    allowClear: true,
    message: 'Please select Brand',
    placeHolder: 'Brand',
    inputType: 'dropDown',
    dropDownList: [],
    text: ''
},
{
    index: 1,
    label: 'Product Family',
    decorator: 'costProdFamily',
    required: false,
    allowClear: true,
    message: 'Please select Product Family',
    placeHolder: 'Product Family',
    inputType: 'dropDown',
    dropDownList: [],
    text: ''
},
{
    index: 2,
    label: 'EOL Status',
    decorator: 'eolStatus',
    required: false,
    allowClear: true,
    message: 'Please select EOL Status',
    placeHolder: 'EOL Status',
    inputType: 'dropDown',
    dropDownList: [],
    text: ''
}
]

export default {
    deltaSize,
    tableTitle_langEn,
    add_langEn,
    editAndDetail_langEn,
    filter_langEn
}