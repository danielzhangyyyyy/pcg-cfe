import commonWidth from "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Group Name',
        dataIndex: 'groupName',
        align: 'left',
        width: commonWidth.loginName,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'right',
        width: commonWidth.status,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        align: 'left',
        width: commonWidth.description,
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
        align: 'left',
        width: commonWidth.operationTime,
        scopedSlots: {customRender: "operation"}
    }
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'Group Name',
        decorator: 'groupName',
        required: true,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input groupName'
    },
    {
        label: 'Description',
        decorator: 'description',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input desc'
    },
    {
        label: 'Status',
        decorator: 'status',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please select status'
    }
]

//add 页面
const addAndDetail_langEn = [
    {
        label: 'Group Name',
        decorator: 'groupName',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input groupName'
    },
    {
        label: 'Description',
        decorator: 'description',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input desc'
    },
    {
        label: 'Status',
        decorator: 'status',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please select status'
    }
]

let filter_langEn = [
    {
        index: 1,
        label: 'Group Name',
        decorator: 'groupName',
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
        label: 'Status',
        decorator: 'status',
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
    tableTitle_langEn,
    editAndDetail_langEn,
    addAndDetail_langEn,
    filter_langEn,
    deltaSize
}
