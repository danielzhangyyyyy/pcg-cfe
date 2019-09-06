import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Event Name',
        dataIndex: 'eventName',
        align: 'left',
        width: commonWidth.eventName,
        sorter: true
    },
    {
        title: 'UI User Id',
        dataIndex: 'uiUserId',
        align: 'left',
        width: commonWidth.uiUserId,
        sorter: true
    },
    {
        title: 'Start Time',
        dataIndex: 'startDate',
        align: 'left',
        width: commonWidth.startDate,
        sorter: true
    },
    {
        title: 'End Time',
        dataIndex: 'endDate',
        align: 'left',
        width: commonWidth.endDate,
        sorter: true
    },
    {
        title: 'Status',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' },
        align: 'left',
        width: commonWidth.taskQstatus,
        sorter: true
    },
    {
        title: 'Instance ID',
        scopedSlots: { customRender: 'instanceId' },
        dataIndex: 'instanceId',
        align: 'left',
        width: commonWidth.instanceId,
        sorter: true
    },
]

// detail_instance_id list表头
const detailList_langEn = [
    {
        title: 'Workflow Name',
        dataIndex: 'workflowName',
        align: 'left',
        width: 200,
        scopedSlots: {customRender: "normal"}
    },
    {
        title: 'Wf Start Time',
        dataIndex: 'startDate',
        align: 'left',
        width: 200,
        scopedSlots: {customRender: "normal"}
    },
    {
        title: 'Wf Lapse Time',
        dataIndex: 'wfLapseTime',
        align: 'left',
        width: 200,
        scopedSlots: {customRender: "normal"}
    },
    {
        title: 'Node Information',
        width: 1000,
        children: [{
            title: 'Node Name',
            dataIndex: 'nodeName',
            scopedSlots: {customRender: "every"}
        }, {
            title: 'Node Type',
            dataIndex: 'nodeType',
            scopedSlots: {customRender: "every"}
        },{
            title: 'Start Time',
            dataIndex: 'startTime',
            scopedSlots: {customRender: "every"}
        },{
            title: 'Lapse Time',
            dataIndex: 'lapseTime',
            scopedSlots: {customRender: "every"}
        },{
            title: 'Status',
            dataIndex: 'status',
            scopedSlots: {customRender: "every"}
        }]
    }
]

//edit页面
const editAndDetail_langEn =[
    {
        label: 'instanceId',
        decorator: 'instanceId',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input instanceId'
    },
    {
        label: 'eventName',
        decorator: 'eventName',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input eventName'
    },
    {
        label: 'uiUserId',
        decorator: 'uiUserId',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input uiUserId'
    },
]

let filter_langEn = [
    {
        index: 0,
        label: 'Event Name',
        decorator: 'eventName',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'input',
        text: ''
    },
    {
        index: 1,
        label: 'UI User ID',
        decorator: 'uiUserId',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'input',
        text: ''
    },
    {
        index: 2,
        label: 'Status',
        decorator: 'status',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: 'ALL',
        dropDownList: []
    },
    {
        index: 3,
        label: 'Start Time From',
        decorator: 'startDateFrom',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'date',
        text: ''
    },
    {
        index: 4,
        label: 'Start Time To',
        decorator: 'startDateTo',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'date',
        text: ''
    },
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    detailList_langEn,
    filter_langEn
}
