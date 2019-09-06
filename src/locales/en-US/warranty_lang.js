import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Warranty Code',
        dataIndex: 'warrantyCode',
        align: 'left',
        width: commonWidth.warrantyCode,
        sorter: true,
        fixed: 'left'
    },
    {
        title: 'Country/ Region',
        dataIndex: 'country',
        align: 'left',
        width: commonWidth.country,
        sorter: true,
        fixed: 'left'
    },
    {
        title: 'TAB Type',
        dataIndex: 'tbaType',
        align: 'left',
        width: commonWidth.tbatype,
        sorter: true,
        fixed: 'left'
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
    }
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'WarrantyCode',
        decorator: 'warrantyCode',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input warrantyCode'
    },
    {
        label: 'Country',
        decorator: 'country',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input country'
    },
    {
        label: 'TBA Type',
        decorator: 'tbaType',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input tbaType'
    },
    {
        label: 'm1',
        decorator: 'm1',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m1 Only Number'
    },
    {
        label: 'm2',
        decorator: 'm2',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m2 Only Number'
    },
    {
        label: 'm3',
        decorator: 'm3',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m3 Only Number'
    },
    {
        label: 'm4',
        decorator: 'm4',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m4 Only Number'
    },
    {
        label: 'm5',
        decorator: 'm5',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m5 Only Number'
    },
    {
        label: 'm6',
        decorator: 'm6',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m6 Only Number'
    },
    {
        label: 'm7',
        decorator: 'm7',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m7 Only Number'
    },
    {
        label: 'm8',
        decorator: 'm8',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m8 Only Number'
    },
    {
        label: 'm9',
        decorator: 'm9',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m9 Only Number'
    },
    {
        label: 'm10',
        decorator: 'm10',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m10 Only Number'
    },
    {
        label: 'm11',
        decorator: 'm11',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m11 Only Number'
    },
    {
        label: 'm12',
        decorator: 'm12',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m12 Only Number'
    }
]

//add页面
const addAndDetail_langEn = [
    {
        label: 'WarrantyCode',
        decorator: 'warrantyCode',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input warrantyCode'
    },
    {
        label: 'Country',
        decorator: 'country',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input country'
    },
    {
        label: 'TBA Type',
        decorator: 'tbaType',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input tbaType'
    },
    {
        label: 'm1',
        decorator: 'm1',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m1 Only Number'
    },
    {
        label: 'm2',
        decorator: 'm2',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m2 Only Number'
    },
    {
        label: 'm3',
        decorator: 'm3',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m3 Only Number'
    },
    {
        label: 'm4',
        decorator: 'm4',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m4 Only Number'
    },
    {
        label: 'm5',
        decorator: 'm5',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m5 Only Number'
    },
    {
        label: 'm6',
        decorator: 'm6',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m6 Only Number'
    },
    {
        label: 'm7',
        decorator: 'm7',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m7 Only Number'
    },
    {
        label: 'm8',
        decorator: 'm8',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m8 Only Number'
    },
    {
        label: 'm9',
        decorator: 'm9',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m9 Only Number'
    },
    {
        label: 'm10',
        decorator: 'm10',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m10 Only Number'
    },
    {
        label: 'm11',
        decorator: 'm11',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m11 Only Number'
    },
    {
        label: 'm12',
        decorator: 'm12',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m12 Only Number'
    }

]

let filter_langEn = [
    {
        index: 1,
        label: 'Cycle',
        decorator: 'cycle',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: 'CURRENT',
        dropDownList: []
    },
    {
        index: 2,
        label: 'Warranty Code',
        decorator: 'warrantyCode',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
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
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 4,
        label: 'TBA Type',
        decorator: 'tbaType',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    }
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    addAndDetail_langEn,
    filter_langEn
}
