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
        title: 'SBB_TYPE',
        dataIndex: 'sbbType',
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
        title: 'SBB',
        dataIndex: 'sbb',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'COMPONENT',
        dataIndex: 'component',
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
        title: 'DESCRIPTION',
        dataIndex: 'description',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'QTY',
        dataIndex: 'qty',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'ALTER_GROUP',
        dataIndex: 'alterGroup',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'PERCENTAGE',
        dataIndex: 'percentage',
        align: 'right',
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
        label: 'SBB_TYPE',
        decorator: 'sbbType',
        required: true,
        message: '请输入SBB_TYPE'
    },
    {
        label: 'PLANT',
        decorator: 'plant',
        required: true,
        message: '请输入PLANT'
    },
    {
        label: 'SBB',
        decorator: 'sbb',
        required: true,
        message: '请输入SBB'
    },
    {
        label: 'COMPONENT',
        decorator: 'component',
        required: true,
        message: '请输入COMPONENT'
    },
    {
        label: 'BASIC_NAME',
        decorator: 'basicName',
        required: true,
        message: '请输入BASIC_NAME'
    },
    {
        label: 'DESCRIPTION',
        decorator: 'description',
        required: true,
        message: '请输入DESCRIPTION'
    },
    {
        label: 'QTY',
        decorator: 'qty',
        required: true,
        message: '请输入QTY'
    },
    {
        label: 'ALTER_GROUP',
        decorator: 'alterGroup',
        required: true,
        message: '请输入ALTER_GROUP'
    },
    {
        label: 'PERCENTAGE',
        decorator: 'percentage',
        required: true,
        message: '请输入PERCENTAGE'
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