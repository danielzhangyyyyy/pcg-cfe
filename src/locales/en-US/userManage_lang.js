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
        title: 'FirstName',
        dataIndex: 'firstName',
        align: 'left',
        width: commonWidth.firstName,
    },
    {
        title: 'LastName',
        dataIndex: 'lastName',
        align: 'left',
        width: commonWidth.lastName,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        align: 'left',
        width: commonWidth.email,
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        align: 'left',
        width: commonWidth.phone,
    },
    {
        title: 'Type',
        dataIndex: 'userType',
        align: 'left',
        width: commonWidth.itemType,
    },
    {
        title: 'Org',
        dataIndex: 'orgId',
        align: 'left',
        width: commonWidth.org,
    },
    {
        title: 'Country/Region',
        dataIndex: 'country',
        align: 'left',
        width: commonWidth.country,
    },
    {
        title: 'State',
        dataIndex: 'state',
        align: 'left',
        width: commonWidth.status,
    }
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'ItCode',
        decorator: 'itcode',
        required: true,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input itcode'
    },
    {
        label: 'Email',
        decorator: 'email',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input email'
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
    },
    {
        label: 'Org',
        decorator: 'orgId',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input org'
    },
    {
        label: 'Country',
        decorator: 'country',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input country'
    },
    {
        label: 'State',
        decorator: 'state',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input state'
    },
    {
        label: 'UserType',
        decorator: 'userType',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input userType'
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
        label: 'Email',
        decorator: 'email',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input email'
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
    },
    {
        label: 'Org',
        decorator: 'org',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input org'
    },
    {
        label: 'Country',
        decorator: 'country',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input country'
    },
    {
        label: 'State',
        decorator: 'state',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input state'
    },
    {
        label: 'UserType',
        decorator: 'userType',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input userType'
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
        label: 'First Name',
        decorator: 'firstName',
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
        label: 'Last Name',
        decorator: 'lastName',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: '',
    },
    {
        index: 4,
        label: 'UserType',
        decorator: 'userType',
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
