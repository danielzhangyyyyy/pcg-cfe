import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Characteristic',
        dataIndex: 'characteristic',
        align: 'left',
        width: commonWidth.characteristic,
        sorter: true
    },
    {
        title: 'Value',
        dataIndex: 'value',
        align: 'left',
        width: commonWidth.value,
        sorter: true
    },
    {
        title: 'Ph Code',
        dataIndex: 'phCode',
        align: 'left',
        width: commonWidth.prodH,
        sorter: true
    },
    {
        title: 'Warranty Code',
        dataIndex: 'warrantyCode',
        align: 'left',
        width: commonWidth.warrantyCode,
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
        label: 'productGroup',
        decorator: 'productGroup',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input productGroup'
    },
    {
        label: 'characteristic',
        decorator: 'characteristic',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input characteristic'
    },
    {
        label: 'value',
        decorator: 'value',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input value'
    },
    {
        label: 'warrantyCode',
        decorator: 'warrantyCode',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input warrantyCode'
    },
    {
        label: 'action',
        decorator: 'action',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input action'
    },
    {
        label: 'status',
        decorator: 'status',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input status'
    },
    {
        label: 'sysCreatedDate',
        decorator: 'sysCreatedDate',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysCreatedDate'
    },
    {
        label: 'sysCreatedBy',
        decorator: 'sysCreatedBy',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysCreatedBy'
    },
    {
        label: 'sysLastModifiedDate',
        decorator: 'sysLastModifiedDate',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysLastModifiedDate'
    },
    {
        label: 'sysLastModifiedBy',
        decorator: 'sysLastModifiedBy',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysLastModifiedBy'
    },
    {
        label: 'changeId',
        decorator: 'changeId',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input changeId'
    },
    {
        label: 'changeAction',
        decorator: 'changeAction',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input changeAction'
    },
    {
        label: 'phCode',
        decorator: 'phCode',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input phCode'
    },
]

//add页面
const addAndDetail_langEn = [
    {
        label: 'Characteristic',
        decorator: 'characteristic',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input characteristic'
    },
    {
        label: 'Value',
        decorator: 'value',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input value'
    },
    {
        label: 'Ph Code',
        decorator: 'phCode',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input phCode'
    },
    {
        label: 'WarrantyCode',
        decorator: 'warrantyCode',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input warrantyCode'
    }
]

let filter_langEn = [
    {
        index: 1,
        label: 'Characteristic',
        decorator: 'characteristic',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'input',
        text: ''
    },
    {
        index: 2,
        label: 'Value',
        decorator: 'value',
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
        label: 'Ph Code',
        decorator: 'phCode',
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
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    addAndDetail_langEn,
    filter_langEn
}
