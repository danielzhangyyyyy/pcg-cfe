// list页面表头
const tableTitle_langZh = [
    {
        fixed: 'left',
    },
    {
        title: 'REQUEST_ID',
        dataIndex: 'requestId',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'CHECK_POINT',
        dataIndex: 'checkPoint',
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
        title: 'VIEW_DATA',
        dataIndex: 'viewData',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'HELP_INFO',
        dataIndex: 'helpInfo',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'MESSAGE',
        dataIndex: 'message',
        align: 'center',
        width: 300,
        sorter: true
    },
    {
        title: 'SEQ',
        dataIndex: 'seq',
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
]

//edit页面
const editAndDetail_langZh =[
    {
        label: 'REQUEST_ID',
        decorator: 'requestId',
        required: true,
        message: '请输入REQUEST_ID'
    },
    {
        label: 'CHECK_POINT',
        decorator: 'checkPoint',
        required: true,
        message: '请输入CHECK_POINT'
    },
    {
        label: 'STATUS',
        decorator: 'status',
        required: true,
        message: '请输入STATUS'
    },
    {
        label: 'VIEW_DATA',
        decorator: 'viewData',
        required: true,
        message: '请输入VIEW_DATA'
    },
    {
        label: 'HELP_INFO',
        decorator: 'helpInfo',
        required: true,
        message: '请输入HELP_INFO'
    },
    {
        label: 'MESSAGE',
        decorator: 'message',
        required: true,
        message: '请输入MESSAGE'
    },
    {
        label: 'SEQ',
        decorator: 'seq',
        required: true,
        message: '请输入SEQ'
    },
    {
        label: 'SYS_CREATED_DATE',
        decorator: 'sysCreatedDate',
        required: true,
        message: '请输入SYS_CREATED_DATE'
    },
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh
}