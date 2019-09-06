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
        title: 'PART_NUMBER',
        dataIndex: 'partNumber',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'COMMODITY',
        dataIndex: 'commodity',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'DUMMY_PART',
        dataIndex: 'dummyPart',
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
    {
        title: 'OWNER',
        dataIndex: 'owner',
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
        label: 'PART_NUMBER',
        decorator: 'partNumber',
        required: true,
        message: '请输入PART_NUMBER'
    },
    {
        label: 'COMMODITY',
        decorator: 'commodity',
        required: true,
        message: '请输入COMMODITY'
    },
    {
        label: 'DUMMY_PART',
        decorator: 'dummyPart',
        required: true,
        message: '请输入DUMMY_PART'
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
        label: 'OWNER',
        decorator: 'owner',
        required: true,
        message: '请输入OWNER'
    },
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh
}