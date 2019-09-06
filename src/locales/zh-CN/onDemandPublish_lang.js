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
        title: 'ITEM',
        dataIndex: 'item',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'ITEM_TYPE',
        dataIndex: 'itemType',
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
        title: 'ACTION',
        dataIndex: 'action',
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
    {
        title: 'CHANGE_ID',
        dataIndex: 'changeId',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'CHANGE_ACTION',
        dataIndex: 'changeAction',
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
        label: 'ITEM',
        decorator: 'item',
        required: true,
        message: '请输入ITEM'
    },
    {
        label: 'ITEM_TYPE',
        decorator: 'itemType',
        required: true,
        message: '请输入ITEM_TYPE'
    },
    {
        label: 'STATUS',
        decorator: 'status',
        required: true,
        message: '请输入STATUS'
    },
    {
        label: 'ACTION',
        decorator: 'action',
        required: true,
        message: '请输入ACTION'
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