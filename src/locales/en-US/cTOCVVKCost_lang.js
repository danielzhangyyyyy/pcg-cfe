import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'PH',
        dataIndex: 'ph',
        align: 'left',
        width: commonWidth.prodH,
        sorter: true
    },
    {
        title: 'Sales Orgs',
        dataIndex: 'salesOrg',
        align: 'left',
        width: commonWidth.salesOrg,
        sorter: true
    },

    {
        title: 'Characteristic',
        dataIndex: 'characteristic',
        align: 'left',
        width: commonWidth.atnam,
        sorter: true
    },
    {
        title: 'Value',
        dataIndex: 'value',
        align: 'left',
        width: commonWidth.atwrt,
        sorter: true
    },
    {
        title: 'Variant',
        dataIndex: 'variant',
        align: 'left',
        width: commonWidth.varcond,
        sorter: true
    },
    {
        title: 'Cost Value',
        dataIndex: 'm1',
        align: 'left',
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
        label: 'salesOrg',
        decorator: 'salesOrg',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input salesOrg'
    },
    {
        label: 'PH',
        decorator: 'ph',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input ph'
    },
    {
        label: 'characteristic',
        decorator: 'characteristic',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input characteristic'
    },
    {
        label: 'value',
        decorator: 'value',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input value'
    },
    {
        label: 'Variant',
        decorator: 'variant',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input variant'
    },
    {
        label: 'Cost Value',
        decorator: 'm1',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input Cost Value'
    },
    {
        label: 'Last Modified Date',
        decorator: 'sysLastModifiedDate',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input sysLastModifiedDate'
    },
    {
        label: 'Last Modified By',
        decorator: 'sysLastModifiedBy',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input sysLastModifiedBy'
    }
]

//add页面
const addAndDetail_langEn = [
    {
        index: 1,
        label: 'PH1',
        decorator: 'ph_1',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        maxlength: 1,
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 2,
        label: 'PH2',
        decorator: 'ph_2',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        maxlength: 3,
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 3,
        label: 'PH3',
        decorator: 'ph_3',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        maxlength: 3,
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 4,
        label: 'PH4',
        decorator: 'ph_4',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        maxlength: 4,
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 5,
        label: 'Sales_Orgs',
        decorator: 'salesOrg',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 6,
        label: 'Characteristic',
        decorator: 'characteristic',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 7,
        label: 'Value',
        decorator: 'value',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 8,
        label: 'Variant',
        decorator: 'variant',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 9,
        label: 'Cost Value',
        decorator: 'm1',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
]

let filter_langEn = [
    {
        index: 1,
        label: 'PH1',
        decorator: 'ph_1',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        maxlength: 1,
        text: ''
    },
    {
        index: 2,
        label: 'PH2',
        decorator: 'ph_2',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        maxlength: 3,
        text: ''
    },
    {
        index: 3,
        label: 'PH3',
        decorator: 'ph_3',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        maxlength: 3,
        text: ''
    },
    {
        index: 4,
        label: 'PH4',
        decorator: 'ph_4',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        maxlength: 4,
        text: ''
    },
    {
        index: 5,
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
        index: 6,
        label: 'Sales_Orgs',
        decorator: 'salesOrg',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 7,
        label: 'Characteristic',
        decorator: 'characteristic',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 8,
        label: 'Value',
        decorator: 'value',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 9,
        label: 'Variant',
        decorator: 'variant',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 10,
        label: 'Cost Value',
        decorator: 'm1',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Only Number',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    addAndDetail_langEn,
    filter_langEn
}
