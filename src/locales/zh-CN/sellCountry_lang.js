// list页面表头
const tableTitle_langZh = [
    {
        fixed: 'left',
    },
    {
        title: 'PRODUCT_GROUP',
        dataIndex: 'productGroup',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'PLANT',
        dataIndex: 'plant',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'MODEL',
        dataIndex: 'model',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'SUBGEO',
        dataIndex: 'subgeo',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'COUNTRY',
        dataIndex: 'country',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'ACTION',
        dataIndex: 'action',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
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
    },
    {
        title: 'SYS_LAST_MODIFIED_DATE',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'SYS_LAST_MODIFIED_BY',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: 300,
        sorter: true
    },
]

//edit页面
const editAndDetail_langZh =[
    {
        label: 'PRODUCT_GROUP',
        decorator: 'productGroup',
        required: true,
        message: '请输入PRODUCT_GROUP'
    },
    {
        label: 'PLANT',
        decorator: 'plant',
        required: true,
        message: '请输入PLANT'
    },
    {
        label: 'MODEL',
        decorator: 'model',
        required: true,
        message: '请输入MODEL'
    },
    {
        label: 'SUBGEO',
        decorator: 'subgeo',
        required: true,
        message: '请输入SUBGEO'
    },
    {
        label: 'COUNTRY',
        decorator: 'country',
        required: true,
        message: '请输入COUNTRY'
    },
    {
        label: 'ACTION',
        decorator: 'action',
        required: true,
        message: '请输入ACTION'
    },
    {
        label: 'STATUS',
        decorator: 'status',
        required: true,
        message: '请输入STATUS'
    },
    {
        label: 'SYS_CREATED_DATE',
        decorator: 'sysCreatedDate',
        required: true,
        message: '请输入SYS_CREATED_DATE'
    },
    {
        label: 'SYS_CREATED_BY',
        decorator: 'sysCreatedBy',
        required: true,
        message: '请输入SYS_CREATED_BY'
    },
    {
        label: 'SYS_LAST_MODIFIED_DATE',
        decorator: 'sysLastModifiedDate',
        required: true,
        message: '请输入SYS_LAST_MODIFIED_DATE'
    },
    {
        label: 'SYS_LAST_MODIFIED_BY',
        decorator: 'sysLastModifiedBy',
        required: true,
        message: '请输入SYS_LAST_MODIFIED_BY'
    },
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh
}