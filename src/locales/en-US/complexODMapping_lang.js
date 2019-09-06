import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'CTO',
        dataIndex: 'cto',
        align: 'left',
        width: commonWidth.cto,
        sorter: true
    },
    {
        title: 'Characteristic',
        dataIndex: 'atnam',
        align: 'left',
        width: commonWidth.atnam,
        sorter: true
    },
    {
        title: 'Value',
        dataIndex: 'atwrt',
        align: 'left',
        width: commonWidth.atwrt,
        sorter: true
    },
    {
        title: 'Variant',
        dataIndex: 'varcond',
        align: 'left',
        width: commonWidth.varcond,
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
        title: 'Quantity',
        dataIndex: 'quantity',
        align: 'right',
        width: commonWidth.quantity,
        sorter: true
    },
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'productGroup',
        decorator: 'productGroup',
        required: true,
        message: 'Please input productGroup'
    },
    {
        label: 'brand',
        decorator: 'brand',
        required: true,
        message: 'Please input brand'
    },
    {
        label: 'aspPrdFamily',
        decorator: 'aspPrdFamily',
        required: true,
        message: 'Please input aspPrdFamily'
    },
    {
        label: 'cto',
        decorator: 'cto',
        required: true,
        message: 'Please input cto'
    },
    {
        label: 'sbb',
        decorator: 'sbb',
        required: true,
        message: 'Please input sbb'
    },
    {
        label: 'sbbDesc',
        decorator: 'sbbDesc',
        required: true,
        message: 'Please input sbbDesc'
    },
    {
        label: 'varcond',
        decorator: 'varcond',
        required: true,
        message: 'Please input varcond'
    },
    {
        label: 'atnam',
        decorator: 'atnam',
        required: true,
        message: 'Please input atnam'
    },
    {
        label: 'atwrt',
        decorator: 'atwrt',
        required: true,
        message: 'Please input atwrt'
    },
    {
        label: 'od',
        decorator: 'od',
        required: true,
        message: 'Please input od'
    },
    {
        label: 'cost',
        decorator: 'cost',
        required: true,
        message: 'Please input cost'
    },
    {
        label: 'source',
        decorator: 'source',
        required: true,
        message: 'Please input source'
    },
    {
        label: 'action',
        decorator: 'action',
        required: true,
        message: 'Please input action'
    },
    {
        label: 'status',
        decorator: 'status',
        required: true,
        message: 'Please input status'
    },
    {
        label: 'sysCreatedDate',
        decorator: 'sysCreatedDate',
        required: true,
        message: 'Please input sysCreatedDate'
    },
    {
        label: 'sysCreatedBy',
        decorator: 'sysCreatedBy',
        required: true,
        message: 'Please input sysCreatedBy'
    },
    {
        label: 'sysLastModifiedDate',
        decorator: 'sysLastModifiedDate',
        required: true,
        message: 'Please input sysLastModifiedDate'
    },
    {
        label: 'sysLastModifiedBy',
        decorator: 'sysLastModifiedBy',
        required: true,
        message: 'Please input sysLastModifiedBy'
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
    text: '',
    dropDownList: []
},
{
    index: 1,
    label: 'Product Family',
    decorator: 'aspPrdFamily',
    required: false,
    allowClear: true,
    message: 'Please select Product Family',
    placeHolder: 'Product Family',
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
    message: 'Please input CTO',
    placeHolder: 'CTO',
    inputType: 'input',
    text: ''
}]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}