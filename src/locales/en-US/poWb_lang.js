import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left'
    },
    {
        title: 'Model',
        dataIndex: 'model',
        align: 'left',
        width: commonWidth.model,
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
        title: 'CTO',
        dataIndex: 'cto',
        align: 'left',
        width: commonWidth.cto,
        sorter: true
    },
    {
        title: 'Component',
        dataIndex: 'component',
        align: 'left',
        width: commonWidth.warrType,
        sorter: true
    },
    {
        title: 'Price',
        dataIndex: 'price',
        align: 'right',
        width: commonWidth.price,
        sorter: true
    },
    {
        title: 'Currency Key',
        dataIndex: 'currencyKey',
        align: 'left',
        width: commonWidth.baseCurrency,
        sorter: true
    },
    {
        title: 'Price Unit',
        dataIndex: 'priceUnit',
        align: 'left',
        width: commonWidth.priceUnit,
        sorter: true
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        align: 'right',
        width: commonWidth.quantity,
        sorter: true
    },
    {
        title: 'Sys Date',
        dataIndex: 'sysDate',
        align: 'left',
        width: commonWidth.sysCreatedDate,
        sorter: true
    },
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'cycle',
        decorator: 'cycle',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input cycle'
    },
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
        label: 'model',
        decorator: 'model',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input model'
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
        label: 'cto',
        decorator: 'cto',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input cto'
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
        label: 'price',
        decorator: 'price',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input price'
    },
    {
        label: 'currencyKey',
        decorator: 'currencyKey',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input currencyKey'
    },
    {
        label: 'quantity',
        decorator: 'quantity',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input quantity'
    },
    {
        label: 'priceUnit',
        decorator: 'priceUnit',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input priceUnit'
    },
    {
        label: 'sysDate',
        decorator: 'sysDate',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysDate'
    },
    {
        label: 'sysTime',
        decorator: 'sysTime',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysTime'
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
        label: 'zperiod',
        decorator: 'zperiod',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input zperiod'
    },
    {
        label: 'netprice',
        decorator: 'netprice',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input netprice'
    },
]

let filter_langEn = [
    {
        index: 0,
        label: 'Model',
        decorator: 'model',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input Model',
        placeHolder: 'Model',
        inputType: 'input',
        text: ''
    },
    {
        index: 1,
        label: 'Plant',
        decorator: 'plant',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Plant',
        placeHolder: 'Plant',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 2,
        label: 'CTO',
        decorator: 'cto',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input CTO',
        placeHolder: 'CTO',
        inputType: 'input',
        text: ''
    },
    {
        index: 3,
        label: 'Component',
        decorator: 'component',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input Component',
        placeHolder: 'Component',
        inputType: 'input',
        text: ''
    },
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}