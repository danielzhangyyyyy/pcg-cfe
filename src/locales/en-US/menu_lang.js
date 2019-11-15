import commonWidth from "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Name',
        dataIndex: 'name',
        align: 'left',
        width: commonWidth.name,
    },
    {
        title: 'Url',
        dataIndex: 'frontRouter',
        align: 'left',
        width: commonWidth.href,
    },
    {
        title: 'OrderBy',
        dataIndex: 'orderSeq',
        align: 'right',
        width: commonWidth.orderby,
    },
    {
        title: 'MenuIcon',
        dataIndex: 'icon',
        align: 'left',
        width: commonWidth.menuIcon,
    },
    {
        title: 'IsShow',
        dataIndex: 'isShow',
        align: 'right',
        width: commonWidth.isShow,
    },
    {
        title: ' AccessControl',
        dataIndex: 'accessControl',
        align: 'right',
        width: commonWidth.isShow,
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
        align: 'left',
        width: commonWidth.operationTime,
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
        label: 'MenuIcon',
        decorator: 'icon',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input menuIcon'
    },
    {
        label: 'IsShow',
        decorator: 'isShow',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'radio',
        text: 'y',
        message: 'Please input isShow'
    },
    {
        label: 'AccessControl',
        decorator: 'accessControl',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'radio',
        text: 'y',
        message: 'Please input accessControl'
    }
]

//add 页面
const addAndDetail_langEn = [
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
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input orderby'
    },
    {
        label: 'MenuIcon',
        decorator: 'icon',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input menuIcon'
    },
    {
        label: 'IsShow',
        decorator: 'isShow',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'radio',
        text: 'y',
        message: 'Please input isShow'
    },
    {
        label: 'AccessControl',
        decorator: 'accessControl',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'radio',
        text: 'y',
        message: 'Please input accessControl'
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
    deltaSize
}
