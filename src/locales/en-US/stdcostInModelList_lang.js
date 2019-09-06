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
        dataIndex: 'prdFamily',
        align: 'left',
        width: 160,
        sorter: true
    },
    {
        title: 'Item',
        dataIndex: 'item',
        align: 'left',
        width: commonWidth.item,
        sorter: true
    },
    {
        title: 'Item Desc',
        dataIndex: 'itemDesc',
        align: 'left',
        width: commonWidth.itemDesc,
        sorter: true
    },
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
        label: 'item',
        decorator: 'item',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input item'
    },
    {
        label: 'brand',
        decorator: 'brand',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input brand'
    },
    {
        label: 'prdFamily',
        decorator: 'prdFamily',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input prdFamily'
    },
    {
        label: 'itemDesc',
        decorator: 'itemDesc',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input itemDesc'
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
]

let filter_langEn = [
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
    }
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}