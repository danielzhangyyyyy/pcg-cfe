import commonWidth from "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'ItCode',
        dataIndex: 'itcode',
        align: 'left',
        width: commonWidth.itcode,
    },
    {
        title: 'LoginName',
        dataIndex: 'loginName',
        align: 'left',
        width: commonWidth.loginName,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: commonWidth.status,
    },
    // {
    //     title: 'Flag',
    //     dataIndex: 'flag',
    //     align: 'left',
    //     width: commonWidth.flag,
    // },
    // {
    //     title: 'Type',
    //     dataIndex: 'userType',
    //     align: 'left',
    //     width: commonWidth.itemType,
    // },
    {
        title: 'Group',
        dataIndex: 'userGrpId',
        align: 'left',
        width: commonWidth.userGrpId,
    },
    {
        title: 'Last Login Time',
        dataIndex: 'lastLoginTime',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
    },
    {
        title: 'Created Date',
        dataIndex: 'createdDate',
        align: 'left',
        width: commonWidth.sysCreatedDate,
    },
    {
        title: 'Remark',
        dataIndex: 'remark',
        align: 'left',
        width: commonWidth.remark,
    }
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'ItCode',
        decorator: 'itcode',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input itcode'
    },
    {
        label: 'LoginName',
        decorator: 'loginName',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input loginName'
    },
    {
        label: 'Email',
        decorator: 'email',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input email'
    },
    {
        label: 'UserGroup',
        decorator: 'userGrpId',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input userGrp'
    },
    {
        label: 'Status',
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
        label: 'Remark',
        decorator: 'remark',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input remark'
    },
    {
        label: 'UserType',
        decorator: 'userType',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input userType'
    },
    {
        label: 'FirstName',
        decorator: 'firstName',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input firstName'
    },
    {
        label: 'LastName',
        decorator: 'lastName',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input lastName'
    }
]

//add 页面
const addAndDetail_langEn = [
    {
        label: 'ItCode',
        decorator: 'itcode',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input itcode'
    },
    {
        label: 'LoginName',
        decorator: 'loginName',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input loginName'
    },
    {
        label: 'Email',
        decorator: 'email',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input email'
    },
    {
        label: 'UserGroup',
        decorator: 'userGrpId',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input userGrp'
    },
    {
        label: 'Phone',
        decorator: 'phone',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input phone'
    },
    {
        label: 'UserType',
        decorator: 'userType',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input userType'
    },
    {
        label: 'FirstName',
        decorator: 'firstName',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input firstName'
    },
    {
        label: 'LastName',
        decorator: 'lastName',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input lastName'
    }
]

let filter_langEn = [
    {
        index: 1,
        label: 'ItCode',
        decorator: 'itcode',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: '',
    },
    {
        index: 2,
        label: 'Status',
        decorator: 'status',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: '',
    },
    {
        index: 3,
        label: 'UserGroup',
        decorator: 'userGrpId',
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
