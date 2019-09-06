// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'BasicName',
        dataIndex: 'basicName',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'SYS_CREATED_DATE',
        dataIndex: 'sysCreatedDate',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'SYS_CREATED_BY',
        dataIndex: 'sysCreatedBy',
        align: 'left',
        width: 300,
        sorter: true
    }
]

//edit页面
const addAndDetail_langEn =[
    {
        label: 'BasicName',
        decorator: 'basicName',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        placeHolder: 'Please input BasicName',
        text: '',
        message: 'Combine with capital letters, numbers, spaces, underscores'
    }
]

let filter_langEn = [
    {
    index: 1,
    label: 'BasicName',
    decorator: 'basicName',
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
    addAndDetail_langEn,
    filter_langEn
}
