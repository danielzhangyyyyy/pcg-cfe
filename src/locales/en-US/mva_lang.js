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
        dataIndex: 'prodfamily',
        align: 'left',
        width: commonWidth.prodFamily,
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
        title: 'TAB Type',
        dataIndex: 'tbaType',
        align: 'left',
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
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        sorter: true
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        sorter: true
    }
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'Brand',
        decorator: 'brand',
        required: true,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input brand'
    },
    {
        label: 'Product Family',
        decorator: 'prodfamily',
        required: true,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input prodfamily'
    },
    {
        label: 'Plant',
        decorator: 'plant',
        required: true,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input plant'
    },
    {
        label: 'TBA Type',
        decorator: 'tbaType',
        required: true,
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
        message: 'Please input m1',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'm2',
        decorator: 'm2',
        required: true,
        message: 'Please input m2',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'm3',
        decorator: 'm3',
        required: true,
        message: 'Please input m3',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'm4',
        decorator: 'm4',
        required: true,
        message: 'Please input m4',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'm5',
        decorator: 'm5',
        required: true,
        message: 'Please input m5',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'm6',
        decorator: 'm6',
        required: true,
        message: 'Please input m6',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'm7',
        decorator: 'm7',
        required: true,
        message: 'Please input m7',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'm8',
        decorator: 'm8',
        required: true,
        message: 'Please input m8',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'm9',
        decorator: 'm9',
        required: true,
        message: 'Please input m9',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'm10',
        decorator: 'm10',
        required: true,
        message: 'Please input m10',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'm11',
        decorator: 'm11',
        required: true,
        message: 'Please input m11',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'm12',
        decorator: 'm12',
        required: true,
        message: 'Please input m12',
        editDisabled: false,
        inputType: 'input',
        text: ''
    }
]

//add
const addAndDetail_langEn = [
    {
        label: 'Brand',
        decorator: 'brand',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        message: 'Please input brand',
        dropDownList: []
    },
    {
        label: 'Product Family',
        decorator: 'prodfamily',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        message: 'Please select,unselect means ALL',
        dropDownList: []
    },
    {
        label: 'Plant',
        decorator: 'plant',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        message: 'Please input plant',
        dropDownList: []
    },
    {
        label: 'TBA Type',
        decorator: 'tbaType',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        message: 'Please input tbaType',
        dropDownList: []
    }
]

let filter_langEn = [
    {
        index: 0,
        label: 'Cycle',
        decorator: 'cycle',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
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
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 2,
        label: 'Product Family',
        decorator: 'prodfamily',
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
        label: 'Plant',
        decorator: 'plant',
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
