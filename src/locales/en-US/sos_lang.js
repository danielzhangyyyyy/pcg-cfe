import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    // {
    //     fixed: 'left',
    // },
    {
        title: 'Brand',
        dataIndex: 'brand',
        align: 'left',
        width: commonWidth.brand,
        sorter: true
    },
    {
        title: 'Product Family',
        dataIndex: 'prodFamily',
        align: 'left',
        width: commonWidth.prodFamily,
        sorter: true
    },
    {
        title: 'Machine Type',
        dataIndex: 'machineType',
        align: 'left',
        width: commonWidth.machineType,
        sorter: true
    },
    {
        title: 'Plant',
        dataIndex: 'plant',
        align: 'left',
        width: commonWidth.plant,
        sorter: true
    },
    {
        title: 'Priority',
        dataIndex: 'priority',
        align: 'right',
        width: commonWidth.priority,
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
        title: 'EOL Status',
        dataIndex: 'eolStatus',
        align: 'left',
        width: commonWidth.eolStatus,
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
        label: 'Brand',
        decorator: 'brand',
        required: true,
        message: 'Please select brand',
        editDisabled: true,
        allowClear: true,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        label: 'Product Family',
        decorator: 'prodFamily',
        required: true,
        message: 'Please select product family',
        editDisabled: true,
        allowClear: true,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        label: 'Machine Type',
        decorator: 'machineType',
        required: false,
        message: 'Please select, unselect means ALL',
        editDisabled: true,
        allowClear: true,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        label: 'Plant',
        decorator: 'plant',
        required: true,
        message: 'Please select plant',
        editDisabled: false,
        allowClear: true,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''

    },
    {
        label: 'Priority',
        decorator: 'priority',
        required: true,
        message: 'Please input priority',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'Subgeo',
        decorator: 'subgeo',
        required: false,
        message: 'Please select, unselect means ALL',
        editDisabled: false,
        allowClear: true,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    }
]

let filter_langEn = [{
        index: 0,
        label: 'Brand',
        decorator: 'brand',
        required: false,
        allowClear: true,
        message: 'Please select brand',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 1,
        label: 'Product Family',
        decorator: 'prodFamily',
        required: false,
        allowClear: true,
        message: 'Please select product family',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 2,
        label: 'Plant',
        decorator: 'plant',
        required: false,
        allowClear: true,
        message: 'Please select plant',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 3,
        label: 'Subgeo',
        decorator: 'subgeo',
        required: false,
        allowClear: true,
        message: 'Please select subgeo',
        placeHolder: 'Please select',
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
