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
        fixed: 'left',
        width: commonWidth.brand,
        sorter: true
    },
    {
        title: 'ProductFamily',
        dataIndex: 'aspPrdFamily',
        align: 'left',
        fixed: 'left',
        width: 130,
        sorter: true
    },
    {
        title: 'Subgeo',
        dataIndex: 'subgeo',
        align: 'left',
        fixed: 'left',
        width: commonWidth.subgeo,
        sorter: true
    },
    {
        title: 'TBA Type',
        dataIndex: 'tbaType',
        align: 'left',
        fixed: 'left',
        width: commonWidth.tbatype,
        sorter: true
    },
    {
        title: 'm1',
        dataIndex: 'm1',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm2',
        dataIndex: 'm2',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm3',
        dataIndex: 'm3',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm4',
        dataIndex: 'm4',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm5',
        dataIndex: 'm5',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm6',
        dataIndex: 'm6',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm7',
        dataIndex: 'm7',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm8',
        dataIndex: 'm8',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm9',
        dataIndex: 'm9',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm10',
        dataIndex: 'm10',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm11',
        dataIndex: 'm11',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm12',
        dataIndex: 'm12',
        align: 'right',
        width: commonWidth.m,
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
        label: 'Cycle',
        decorator: 'cycle',
        required: true,
        allowClear: true,
        editDisabled: true,
        inputType: 'dropDown',
        text: 'CURRENT',
        dropDownList: [],
        message: 'Cycle'
    },
    {
        label: 'Brand',
        decorator: 'brand',
        required: true,
        allowClear: true,
        editDisabled: true,
        inputType: 'dropDown',
        // text: '',
        dropDownList: [],
        message: 'Brand'
    },
    {
        label: 'ProductFamily',
        decorator: 'aspPrdFamily',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'dropDown',
        // text: '',
        dropDownList: [],
        message: 'Please select,unselect means ALL'
    },
    {
        label: 'Subgeo',
        decorator: 'subgeo',
        required: true,
        allowClear: true,
        editDisabled: true,
        inputType: 'dropDown',
        // text: '',
        dropDownList: [],
        message: 'Subgeo'
    },
    {
        label: 'TBA Type',
        decorator: 'tbaType',
        required: true,
        allowClear: true,
        editDisabled: true,
        inputType: 'dropDown',
        // text: '',
        dropDownList: [],
        message: 'TBA Type'
    },
    {
        label: 'm1',
        decorator: 'm1',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m1'
    },
    {
        label: 'm2',
        decorator: 'm2',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m2'
    },
    {
        label: 'm3',
        decorator: 'm3',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m3'
    },
    {
        label: 'm4',
        decorator: 'm4',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m4'
    },
    {
        label: 'm5',
        decorator: 'm5',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m5'
    },
    {
        label: 'm6',
        decorator: 'm6',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m6'
    },
    {
        label: 'm7',
        decorator: 'm7',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m7'
    },
    {
        label: 'm8',
        decorator: 'm8',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m8'
    },
    {
        label: 'm9',
        decorator: 'm9',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m9'
    },
    {
        label: 'm10',
        decorator: 'm10',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m10'
    },
    {
        label: 'm11',
        decorator: 'm11',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m11'
    },
    {
        label: 'm12',
        decorator: 'm12',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m12'
    },
]

let filter_langEn = [
    {
        index: 0,
        label: 'Cycle',
        decorator: 'cycle',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Cycle',
        placeHolder: 'Cycle',
        inputType: 'dropDown',
        text: 'CURRENT',
        dropDownList: []
    },
    {
        index: 1,
        label: 'Brand',
        decorator: 'brand',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Brand',
        placeHolder: 'Brand',
        inputType: 'dropDown',
        // text: '',
        dropDownList: []
    },
    {
        index: 2,
        label: 'ProductFamily',
        decorator: 'aspPrdFamily',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select ProductFamily',
        placeHolder: 'ProductFamily',
        inputType: 'dropDown',
        // text: '',
        dropDownList: []
    },
    {
        index: 3,
        label: 'Subgeo',
        decorator: 'subgeo',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Subgeo',
        placeHolder: 'Subgeo',
        inputType: 'dropDown',
        // text: '',
        dropDownList: []
    },
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
