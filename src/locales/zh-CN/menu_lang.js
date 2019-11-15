// list页面表头
const tableTitle_langZh = [
    {
        fixed: 'left',
    },
    {
        title: 'PARENT_ID',
        dataIndex: 'parentId',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'NAME',
        dataIndex: 'name',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'CODE',
        dataIndex: 'code',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'HREF',
        dataIndex: 'href',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'LVL',
        dataIndex: 'lvl',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'ORDERBY',
        dataIndex: 'orderby',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'IS_SHOW',
        dataIndex: 'isShow',
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
        title: 'MENU_ICON',
        dataIndex: 'menuIcon',
        align: 'left',
        width: 300,
        sorter: true
    },
]

//edit页面
const editAndDetail_langZh =[
    {
        label: 'PARENT_ID',
        decorator: 'parentId',
        required: true,
        message: '请输入PARENT_ID'
    },
    {
        label: 'NAME',
        decorator: 'name',
        required: true,
        message: '请输入NAME'
    },
    {
        label: 'CODE',
        decorator: 'code',
        required: true,
        message: '请输入CODE'
    },
    {
        label: 'HREF',
        decorator: 'href',
        required: true,
        message: '请输入HREF'
    },
    {
        label: 'LVL',
        decorator: 'lvl',
        required: true,
        message: '请输入LVL'
    },
    {
        label: 'ORDERBY',
        decorator: 'orderby',
        required: true,
        message: '请输入ORDERBY'
    },
    {
        label: 'IS_SHOW',
        decorator: 'isShow',
        required: true,
        message: '请输入IS_SHOW'
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
        label: 'MENU_ICON',
        decorator: 'menuIcon',
        required: true,
        message: '请输入MENU_ICON'
    },
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh
}