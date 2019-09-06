// list页面表头
const tableTitle_langZh = [
    {
        fixed: 'left',
    },
    {
        title: 'PRODUCT_GROUP',
        dataIndex: 'productGroup',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'MODEL',
        dataIndex: 'model',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'WEIGHT',
        dataIndex: 'weight',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'ACTION',
        dataIndex: 'action',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'SYS_CREATED_DATE',
        dataIndex: 'sysCreatedDate',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'SYS_CREATED_BY',
        dataIndex: 'sysCreatedBy',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'SYS_LAST_MODIFIED_DATE',
        dataIndex: 'sysLastModifiedDate',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'SYS_LAST_MODIFIED_BY',
        dataIndex: 'sysLastModifiedBy',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'CHANGE_ID',
        dataIndex: 'changeId',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'CHANGE_ACTION',
        dataIndex: 'changeAction',
        align: 'center',
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
        label: 'MODEL',
        decorator: 'model',
        required: true,
        message: '请输入MODEL'
    },
    {
        label: 'WEIGHT',
        decorator: 'weight',
        required: true,
        message: '请输入WEIGHT'
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
    {
        label: 'CHANGE_ID',
        decorator: 'changeId',
        required: true,
        message: '请输入CHANGE_ID'
    },
    {
        label: 'CHANGE_ACTION',
        decorator: 'changeAction',
        required: true,
        message: '请输入CHANGE_ACTION'
    },
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh
}