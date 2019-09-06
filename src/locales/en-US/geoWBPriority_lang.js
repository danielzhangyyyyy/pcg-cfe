import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [{
        fixed: 'left',
    },
    // {
    //     title: 'cycle',
    //     dataIndex: 'cycle',
    //     align: 'left',
    //     width: 300,
    //     sorter: true
    // },
    {
        title: 'Product Group',
        dataIndex: 'productGroup',
        align: 'left',
        width: commonWidth.productGroup,
        sorter: true
    },
    {
        title: 'MTM No',
        dataIndex: 'mtmNo',
        align: 'left',
        width: commonWidth.mtm,
        sorter: true
    },
    {
        title: 'Plant',
        dataIndex: 'plant',
        align: 'left',
        width: commonWidth.plant,
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
        title: 'Created By',
        dataIndex: 'sysCreatedBy',
        align: 'left',
        width: commonWidth.sysCreatedBy,
        sorter: true
    },
    {
        title: 'Created Date',
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
const editAndDetail_langEn = [{
        label: 'cycle',
        decorator: 'cycle',
        required: true,
        message: 'Please input cycle'
    },
    {
        label: 'productGroup',
        decorator: 'productGroup',
        required: true,
        message: 'Please input productGroup'
    },
    {
        label: 'mtmNo',
        decorator: 'mtmNo',
        required: true,
        message: 'Please input mtmNo'
    },
    {
        label: 'plant',
        decorator: 'plant',
        required: true,
        message: 'Please input plant'
    },
    {
        label: 'country',
        decorator: 'country',
        required: true,
        message: 'Please input country'
    },
    {
        label: 'action',
        decorator: 'action',
        required: true,
        message: 'Please input action'
    },
    {
        label: 'status',
        decorator: 'status',
        required: true,
        message: 'Please input status'
    },
    {
        label: 'sysCreatedDate',
        decorator: 'sysCreatedDate',
        required: true,
        message: 'Please input sysCreatedDate'
    },
    {
        label: 'sysCreatedBy',
        decorator: 'sysCreatedBy',
        required: true,
        message: 'Please input sysCreatedBy'
    },
    {
        label: 'sysLastModifiedDate',
        decorator: 'sysLastModifiedDate',
        required: true,
        message: 'Please input sysLastModifiedDate'
    },
    {
        label: 'sysLastModifiedBy',
        decorator: 'sysLastModifiedBy',
        required: true,
        message: 'Please input sysLastModifiedBy'
    },
]

let filter_langEn = [{
    index: 0,
    label: 'Cycle',
    decorator: 'cycle',
    required: true,
    allowClear: true,
    message: 'Please select cycle',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    dropDownList: [],
    text: 'CURRENT'
},
{
    index: 1,
    label: 'MTM',
    decorator: 'mtmNo',
    required: false,
    allowClear: true,
    message: 'Please input item',
    placeHolder: 'Please input',
    inputType: 'input',
    text: ''
},
{
    index: 2,
    label: 'Plant',
    decorator: 'plant',
    required: false,
    allowClear: true,
    message: 'Please select plant',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    dropDownList: [],
    text: ''
},
{
    index: 3,
    label: 'Country/Region',
    decorator: 'country',
    required: false,
    allowClear: true,
    message: 'Please select Country/Region',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    dropDownList: [],
    text: ''
}
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}