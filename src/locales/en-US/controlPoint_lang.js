import commonWidth from "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn1 = [
    {
        fixed: 'left',
    },
    {
        title: 'Control Point',
        dataIndex: 'controlPoint',
        align: 'left',
        width: 100,
    },
    {
        title: 'Cycle Name',
        dataIndex: 'cycleName',
        align: 'left',
        width: commonWidth.cycle,
        // sorter: true
    },
    {
        title: 'Status',
        dataIndex: 'controlPointStatus',
        align: 'left',
        width: commonWidth.taskQstatus,
        // sorter: true
    },
    {
        title: 'Last Update Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        // sorter: true
    },
    {
        title: 'Workflow Status',
        dataIndex: 'workflowStatus',
        align: 'left',
        width: commonWidth.taskQstatus,
        // sorter: true
    },  
    {
        title: 'Instance ID',
        dataIndex: 'instanceId',
        align: 'left',
        width: 110,
        // sorter: true
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
        align: 'center',
        width: 140,
        scopedSlots: {customRender: "operation"}
        // sorter: true
    },
]

const tableTitle_langEn5 = [
    // {
    //     title: 'Operation',
    //     dataIndex: 'operation',
    //     align: 'center',
    //     width: 140,
    //     scopedSlots: {customRender: "operation"}
    //     // sorter: true
    // },
    {
        title: 'Control Point',
        dataIndex: 'controlPoint',
        align: 'left',
        width: 150, 
    },
    {
        title: 'Status',
        dataIndex: 'controlPointStatus',
        align: 'left',
        width: commonWidth.taskQstatus,
        // sorter: true
    },
    {
        title: 'Last Update Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        // sorter: true
    },
    {
        title: 'Workflow Status',
        dataIndex: 'workflowStatus',
        align: 'left',
        width: commonWidth.taskQstatus,
        // sorter: true
    },
    {
        title: 'Instance ID',
        dataIndex: 'instanceId',
        align: 'left',
        width: 300,
        // sorter: true
    },
]

let filter_langEn = [
    {
        index: 0,
        label: 'Cycle Name',
        decorator: 'cycleName',
        required: false,
        allowClear: true,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 1,
        label: 'Cycle Type',
        decorator: 'cycleType',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: 'FINAL',
        dropDownList: []
    },
    {
        index: 2,
        label: 'Cycle Month',
        decorator: 'cycleMonth',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'date',
        text: '',
    },
    {
        index: 3,
        label: 'Forecast Month',
        decorator: 'forecastMonth',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'date',
        text: ''
    }
]

export default {
    deltaSize,
    tableTitle_langEn1,
    tableTitle_langEn5,
    filter_langEn
}
