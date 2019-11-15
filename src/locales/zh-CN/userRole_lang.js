// list页面表头
const tableTitle_langEn = [
    {
        title: 'Group Name',
        dataIndex: 'groupName',
        align: 'left',
        width: 300,
        sorter: true,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        align: 'left',
        width: 300,
        sorter: true,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'right',
        width: 300,
        sorter: true,
    },
    {
        title: 'Role',
        dataIndex: 'role',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
        align: 'left',
        width: 300,
        sorter: true,
        scopedSlots: { customRender: 'operation' }
    }
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'Name',
        decorator: 'name',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input name'
    },
    {
        label: 'Parent',
        decorator: 'parentId',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input parentId'
    },
    {
        label: 'Url',
        decorator: 'frontRouter',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input href'
    },
    {
        label: 'OrderBy',
        decorator: 'orderSeq',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input orderby'
    },
    {
        label: 'IsShow',
        decorator: 'isShow',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input isShow'
    },
    {
        label: 'AccessControl',
        decorator: 'accessControl',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input accessControl'
    },
    {
        label: 'MenuIcon',
        decorator: 'icon',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input menuIcon'
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
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input parentId'
    },
    {
        label: 'Description',
        decorator: 'description',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input name'
    },
    {
        label: 'Status',
        decorator: 'status',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input href'
    },
    {
        label: 'Role',
        decorator: 'role',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input orderby'
    }
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
    tableTitle_langEn,
    editAndDetail_langEn,
    addAndDetail_langEn,
    filter_langEn,
}
