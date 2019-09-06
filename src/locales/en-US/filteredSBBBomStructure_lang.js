import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'SBB Type',
        dataIndex: 'sbbType',
        align: 'left',
        width: commonWidth.sbbType,
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
        title: 'SBB',
        dataIndex: 'sbb',
        align: 'left',
        width: commonWidth.sbb,
        sorter: true
    },
    {
        title: 'Component',
        dataIndex: 'component',
        align: 'left',
        width: commonWidth.component,
        sorter: true
    },
    {
        title: 'Description',
        dataIndex: 'description',
        align: 'left',
        width: commonWidth.description,
        sorter: true
    },
    {
        title: 'Basic Name',
        dataIndex: 'basicName',
        align: 'left',
        width: commonWidth.basicName,
        sorter: true
    },
    {
        title: 'QTY',
        dataIndex: 'qty',
        align: 'right',
        width: commonWidth.qty,
        sorter: true
    },
    {
        title: 'Alt Group',
        dataIndex: 'alterGroup',
        align: 'right',
        width: commonWidth.altgrup,
        sorter: true
    },
    {
        title: 'Percentage',
        dataIndex: 'percentage',
        align: 'right',
        width: commonWidth.percentage,
        sorter: true
    },
    {
        title: 'Created Date',
        dataIndex: 'sysCreatedDate',
        align: 'left',
        width: commonWidth.sysCreatedDate,
        sorter: true
    }
]

//edit页面
const editAndDetail_langEn =[
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
        label: 'sbbType',
        decorator: 'sbbType',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sbbType'
    },
    {
        label: 'plant',
        decorator: 'plant',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input plant'
    },
    {
        label: 'sbb',
        decorator: 'sbb',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sbb'
    },
    {
        label: 'component',
        decorator: 'component',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input component'
    },
    {
        label: 'basicName',
        decorator: 'basicName',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input basicName'
    },
    {
        label: 'description',
        decorator: 'description',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input description'
    },
    {
        label: 'qty',
        decorator: 'qty',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input qty'
    },
    {
        label: 'alterGroup',
        decorator: 'alterGroup',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input alterGroup'
    },
    {
        label: 'percentage',
        decorator: 'percentage',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input percentage'
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
]

let filter_langEn = [
    {
    index: 1,
    label: 'SBB Type',
    decorator: 'sbbType',
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
        label: 'SBB',
        decorator: 'sbb',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
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
    }
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
