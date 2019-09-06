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
        title: 'PRODUCT_TYPE',
        dataIndex: 'productType',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'SBB_TYPE',
        dataIndex: 'sbbType',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'BASIC_NAME',
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
        label: 'PRODUCT_TYPE',
        decorator: 'productType',
        required: true,
        message: '请输入PRODUCT_TYPE'
    },
    {
        label: 'SBB_TYPE',
        decorator: 'sbbType',
        required: true,
        message: '请输入SBB_TYPE'
    },
    {
        label: 'BASIC_NAME',
        decorator: 'basicName',
        required: true,
        message: '请输入BASIC_NAME'
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
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh
}