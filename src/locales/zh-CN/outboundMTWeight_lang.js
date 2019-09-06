// list页面表头
const tableTitle_langZh = [
    {
        fixed: 'left',
    },
    {
        title: 'CYCLE',
        dataIndex: 'cycle',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'PRODUCT_GROUP',
        dataIndex: 'productGroup',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'BRAND',
        dataIndex: 'brand',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'PROD_FAMILY',
        dataIndex: 'prodFamily',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'MACHINE_TYPE',
        dataIndex: 'machineType',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'WEIGHT',
        dataIndex: 'weight',
        align: 'right',
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
        label: 'CYCLE',
        decorator: 'cycle',
        required: true,
        message: '请输入CYCLE'
    },
    {
        label: 'PRODUCT_GROUP',
        decorator: 'productGroup',
        required: true,
        message: '请输入PRODUCT_GROUP'
    },
    {
        label: 'BRAND',
        decorator: 'brand',
        required: true,
        message: '请输入BRAND'
    },
    {
        label: 'PROD_FAMILY',
        decorator: 'prodFamily',
        required: true,
        message: '请输入PROD_FAMILY'
    },
    {
        label: 'MACHINE_TYPE',
        decorator: 'machineType',
        required: true,
        message: '请输入MACHINE_TYPE'
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
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh
}