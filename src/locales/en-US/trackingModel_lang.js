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
        dataIndex: 'prodFamily',
        align: 'left',
        width: commonWidth.prodFamily,
        sorter: true
    },
    {
        title: 'MTM',
        dataIndex: 'mtm',
        align: 'left',
        width: commonWidth.mtm,
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
        title: 'SBB Qty',
        dataIndex: 'sbbUnitQty',
        align: 'right',
        width: commonWidth.sbbUnitQty,
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
        title: 'Comp Qty',
        dataIndex: 'compUnitQty',
        align: 'right',
        width: commonWidth.compUnitQty,
        sorter: true
    },
    {
        title: 'COMP Description',
        dataIndex: 'compDesc',
        align: 'left',
        width: commonWidth.compDesc,
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
        label: 'prodFamily',
        decorator: 'prodFamily',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input prodFamily'
    },
    {
        label: 'mtm',
        decorator: 'mtm',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input mtm'
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
        label: 'sbbUnitQty',
        decorator: 'sbbUnitQty',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sbbUnitQty'
    },
    {
        label: 'compUnitQty',
        decorator: 'compUnitQty',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input compUnitQty'
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
        label: 'compDesc',
        decorator: 'compDesc',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input compDesc'
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
]

let filter_langEn = [
    {
        index: 0,
        label: 'Brand',
        decorator: 'brand',
        required: true,
        allowClear: false,
        editDisabled: false,
        message: 'Please select Brand',
        placeHolder: 'Brand',
        inputType: 'dropDown',
        // text: '',
        dropDownList: []
    },
    {
        index: 1,
        label: 'Product Family',
        decorator: 'prodFamily',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Product Family',
        placeHolder: 'Product Family',
        inputType: 'dropDown',
        // text: '',
        dropDownList: []
    },
    {
        index: 2,
        label: 'MTM',
        decorator: 'mtm',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input MTM',
        placeHolder: 'MTM',
        inputType: 'input',
        text: ''
    },
    {
        index: 3,
        label: 'SBB',
        decorator: 'sbb',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input SBB',
        placeHolder: 'SBB',
        inputType: 'input',
        text: ''
    },
    {
        index: 4,
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