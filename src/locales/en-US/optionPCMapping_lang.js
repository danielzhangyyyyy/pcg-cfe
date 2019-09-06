import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Cycle',
        dataIndex: 'cycle',
        align: 'left',
        width: commonWidth.cycle,
        sorter: true
    },
    {
        title: 'Parent Option',
        dataIndex: 'parentOption',
        align: 'left',
        width: commonWidth.item,
        sorter: true
    },
    {
        title: 'Child Option',
        dataIndex: 'childOption',
        align: 'left',
        width: commonWidth.item,
        sorter: true
    },
    {
        title: 'Create By',
        dataIndex: 'sysCreatedBy',
        align: 'left',
        width: commonWidth.sysCreatedBy,
        sorter: true
    },
    {
        title: 'Create Date',
        dataIndex: 'sysCreatedDate',
        align: 'left',
        width: commonWidth.sysCreatedDate,
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
const editAndDetail_langEn =[
    {
        label: 'Cycle',
        decorator: 'cycle',
        required: true,
        message: 'Please input Cycle',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'Parent Option',
        decorator: 'parentOption',
        required: true,
        message: 'Please input Parent Option',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'Child Option',
        decorator: 'childOption',
        required: true,
        message: 'Please input Child Option',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
]

let filter_langEn = [{
        index: 0,
        label: 'Cycle',
        decorator: 'cycle',
        required: true,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        dropDownList: [],
        text: 'CURRENT'
    },
    {
        index: 1,
        label: 'Parent Option',
        decorator: 'parentOption',
        required: false,
        allowClear: true,
        message: 'Please input parent option',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 2,
        label: 'Child Option',
        decorator: 'childOption',
        required: false,
        allowClear: true,
        message: 'Please input child option',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    }]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
