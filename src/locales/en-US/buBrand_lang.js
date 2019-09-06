// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Bu Group',
        dataIndex: 'buGroup',
        align: 'left',
        width: 200,
        sorter: true
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        align: 'left',
        width: 200,
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
    },
   /*  {
        title: 'productGroup',
        dataIndex: 'productGroup',
        align: 'left',
        width: '25%',
        sorter: true
    },
     {
        title: 'action',
        dataIndex: 'action',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'status',
        dataIndex: 'status',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'sysCreatedDate',
        dataIndex: 'sysCreatedDate',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'sysCreatedBy',
        dataIndex: 'sysCreatedBy',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'changeId',
        dataIndex: 'changeId',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'changeAction',
        dataIndex: 'changeAction',
        align: 'left',
        width: 300,
        sorter: true
    }, */
]

//edit页面
const editAndDetail_langEn =[
    {
        label: 'productGroup',
        decorator: 'productGroup',
        required: true,
        message: 'Please input productGroup'
    },
    {
        label: 'buGroup',
        decorator: 'buGroup',
        required: true,
        message: 'Please input buGroup'
    },
    {
        label: 'brand',
        decorator: 'brand',
        required: true,
        message: 'Please input brand'
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
    {
        label: 'changeId',
        decorator: 'changeId',
        required: true,
        message: 'Please input changeId'
    },
    {
        label: 'changeAction',
        decorator: 'changeAction',
        required: true,
        message: 'Please input changeAction'
    },
]

let filter_langEn = [{
    index: 0,
    label: 'BU Group',
    decorator: 'buGroup',
    required: false,
    allowClear: true,
    message: 'Please select',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    text: '',
    dropDownList: []
},
{
    index: 1,
    label: 'Brand',
    decorator: 'brand',
    required: false,
    allowClear: true,
    message: 'Please select',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    text: '',
    dropDownList: []
}]

export default {
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
