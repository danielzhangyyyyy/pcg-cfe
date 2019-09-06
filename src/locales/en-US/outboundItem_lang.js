import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Model',
        dataIndex: 'model',
        align: 'left',
        width: 150,
        sorter: true
    },
    {
        title: 'Weight (kg)',
        dataIndex: 'weight',
        align: 'right',
        width: 150,
        sorter: true
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: 200,
        sorter: true
    }
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'model',
        decorator: 'model',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input model'
    },
    {
        label: 'weight',
        decorator: 'weight',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input weight'
    },
    {
        label: 'sysLastModifiedDate',
        decorator: 'sysLastModifiedDate',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input sysLastModifiedDate'
    },
    {
        label: 'sysLastModifiedBy',
        decorator: 'sysLastModifiedBy',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input sysLastModifiedBy'
    }
]

//add页面
const addAndDetail_langEn = [
    {
        label: 'Model',
        decorator: 'model',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input model'
    },
    {
        label: 'Weight',
        decorator: 'weight',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input weight Only Number'
    }
]

let filter_langEn = [
    {
        index: 1,
        label: 'Model',
        decorator: 'model',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 2,
        label: 'Weight',
        decorator: 'weight',
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
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    addAndDetail_langEn,
    filter_langEn
}
