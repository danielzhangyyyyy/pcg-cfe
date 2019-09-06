// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Product Group',
        dataIndex: 'productGroup',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'Product Type',
        dataIndex: 'productType',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'SBB Type',
        dataIndex: 'sbbType',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'Basic Name',
        dataIndex: 'basicName',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysCreatedBy',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysCreatedDate',
        align: 'left',
        width: 300,
        sorter: true
    },
   
]

//edit页面
const editAndDetail_langEn =[
    {
        label: 'Product Type',
        decorator: 'productType',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input productType'
    },
    {
        label: 'SBB Type',
        decorator: 'sbbType',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sbbType'
    },
    {
        label: 'Basic Name',
        decorator: 'basicName',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input basicName'
    }
]

let filter_langEn = [
    {
    index: 1,
    label: 'Product Type',
    decorator: 'productType',
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
        index: 3,
        label: 'Basic Name',
        decorator: 'basicName',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'input',
        text: ''
    }
]

export default {
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
