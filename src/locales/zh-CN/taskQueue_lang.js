// list页面表头
const tableTitle_langZh = [
    {
        fixed: 'left',
    },
    {
        title: 'INSTANCE_ID',
        dataIndex: 'instanceId',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'EVENT_NAME',
        dataIndex: 'eventName',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'UI_USER_ID',
        dataIndex: 'uiUserId',
        align: 'left',
        width: 300,
        sorter: true
    },
]

const detailList_langEn = [
    {
        title: 'Workflow Name',
        dataIndex: 'workflowName',
        align: 'left',
        width: 200,
        fixed: 'left',
    },
    {
        title: 'Wf Start Time',
        dataIndex: 'wfStartTime',
        align: 'left',
        width: 200
    },
    {
        title: 'Wf Lapse Time',
        dataIndex: 'wfLapseTime',
        align: 'left',
        width: 200
    },
    {
        title: 'Node Information',
        children: [{
            title: 'Node Name',
            dataIndex: 'NodeName',
        }, {
            title: 'Node Type',
            dataIndex: 'nodeType',
        },{
            title: 'Start Time',
            dataIndex: 'startTime',
        },{
            title: 'Lapse Time',
            dataIndex: 'lapseTime',
        },{
            title: 'Status',
            dataIndex: 'status',
        }],
    }
]


//edit页面
const editAndDetail_langZh =[
    {
        label: 'INSTANCE_ID',
        decorator: 'instanceId',
        required: true,
        message: '请输入INSTANCE_ID'
    },
    {
        label: 'EVENT_NAME',
        decorator: 'eventName',
        required: true,
        message: '请输入EVENT_NAME'
    },
    {
        label: 'UI_USER_ID',
        decorator: 'uiUserId',
        required: true,
        message: '请输入UI_USER_ID'
    },
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh,
    detailList_langEn
}
