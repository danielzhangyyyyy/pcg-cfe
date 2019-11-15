import commonWidth from "./columnCommonWidth_lang.js"

const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Role',
        dataIndex: 'roleName',
        align: 'left',
        width: commonWidth.role,
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

const columns = [
    {
        title: 'Menu',
        dataIndex: 'name',
        key: 'name',
        width: commonWidth.menu,
        fixed: 'left',
    }, {
        title: 'Permissions',
        children: [
            {
                title: 'All',
                dataIndex: 'all',
                width: 100,
                scopedSlots: {customRender: "all"}
            }, {
                title: 'View',
                dataIndex: 'view',
                width: 100,
                scopedSlots: {customRender: "view"}
            }, {
                title: 'Add',
                dataIndex: 'add',
                width: 100,
                scopedSlots: {customRender: "add"}
            }, {
                title: 'Edit',
                dataIndex: 'edit',
                width: 100,
                scopedSlots: {customRender: "edit"}
            }, {
                title: 'Upload',
                dataIndex: 'upload',
                width: 100,
                scopedSlots: {customRender: "upload"}
            }, {
                title: 'Delete',
                dataIndex: 'delete',
                width: 100,
                scopedSlots: {customRender: "delete"}
            }, {
                title: 'Execute',
                dataIndex: 'execute',
                width: 100,
                scopedSlots: {customRender: "execute"}
            }
        ]
    }
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'Role',
        decorator: 'roleId',
        required: true,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input role'
    },
    {
        label: 'Description',
        decorator: 'description',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input description'
    }
]

//add 页面
const addAndDetail_langEn = [
    {
        label: 'Role',
        decorator: 'roleId',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input role'
    },
    {
        label: 'Description',
        decorator: 'description',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input description'
    }
]

let filter_langEn = [
    {
        index: 1,
        label: 'Role',
        decorator: 'roleName',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    }
]

export default {
    tableTitle_langEn,
    editAndDetail_langEn,
    addAndDetail_langEn,
    deltaSize,
    filter_langEn,
    columns
}
