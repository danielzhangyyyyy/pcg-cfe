import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Postfix',
        dataIndex: 'postfix',
        align: 'left',
        width: commonWidth.postfix,
        sorter: true
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        align: 'left',
        width: commonWidth.brand,
        sorter: true
    },
    {
        title: 'Country/ Region',
        dataIndex: 'country',
        align: 'left',
        width: commonWidth.country,
        sorter: true
    },
    {
        title: 'Last Modify By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        sorter: true
    },
    {
        title: 'Last Modify Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        sorter: true
    }
]

//edit页面
const editAndDetail_langEn =[
    {
        label: 'Postfix',
        decorator: 'postfix',
        required: true,
        message: 'Please input postfix',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'Brand',
        decorator: 'brand',
        required: true,
        message: 'Please select brand',
        editDisabled: false,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    },
    {
        label: 'Country/Region',
        decorator: 'country',
        required: true,
        message: 'Please select country/region',
        editDisabled: false,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    }
]

let filter_langEn = [{
    index: 0,
    label: 'Brand',
    decorator: 'brand',
    required: false,
    allowClear: true,
    message: 'Please select brand',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    text: '',
    dropDownList: []
}]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
