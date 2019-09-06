import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Product Group',
        dataIndex: 'productGroup',
        align: 'left',
        width: commonWidth.productGroup,
        sorter: true
    },
    {
        title: 'Real Part',
        dataIndex: 'partNumber',
        align: 'left',
        width: commonWidth.part,
        sorter: true
    },
    {
        title: 'Dummy Part',
        dataIndex: 'dummyPart',
        align: 'left',
        width: commonWidth.part,
        sorter: true
    },
    {
        title: 'Commodity',
        dataIndex: 'commodity',
        align: 'left',
        width: commonWidth.commodity,
        sorter: true
    },
    {
        title: 'Owner',
        dataIndex: 'owner',
        align: 'left',
        width: commonWidth.owner,
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

let filter_langEn = [
    // {
    //     index: 0,
    //     label: 'Model',
    //     decorator: 'model',
    //     required: false,
    //     allowClear: true,
    //     editDisabled: false,
    //     message: 'Please input Model',
    //     placeHolder: 'Model',
    //     inputType: 'input',
    //     text: ''
    // },
    {
        index: 0,
        label: 'Real Part',
        decorator: 'partNumber',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input Real Part',
        placeHolder: 'Real Part',
        inputType: 'input',
        text: ''
    },
    {
        index: 1,
        label: 'Dummy Part',
        decorator: 'dummyPart',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input Dummy Part',
        placeHolder: 'Dummy Part',
        inputType: 'input',
        text: ''
    },
    {
        index: 2,
        label: 'Commodity',
        decorator: 'commodity',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Commodity',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 3,
        label: 'Owner',
        decorator: 'owner',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input Owner',
        placeHolder: 'Owner',
        inputType: 'input',
        text: ''
    },
]

export default {
    deltaSize,
    tableTitle_langEn,
    filter_langEn
}