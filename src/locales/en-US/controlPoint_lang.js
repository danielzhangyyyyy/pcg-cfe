import commonWidth from "./columnCommonWidth_lang.js"

const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn1 = [
    {
        title: 'Control Point',
        dataIndex: 'controlPoint',
        align: 'left',
        width: commonWidth.controlPoint, //have sub-level, need specific size
    },
    {
        title: 'Status',
        dataIndex: 'controlPointStatus',
        align: 'left',
        width: commonWidth.status,
        // sorter: true
    },
    {
        title: 'Last Update Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'right',
        width: commonWidth.sysLastModifiedDate,
        // sorter: true
    },
    {
        title: 'Instance ID',
        dataIndex: 'instanceId',
        align: 'right',
        width: commonWidth.instanceId,
        // sorter: true
    },
    {
        title: 'Workflow Status',
        dataIndex: 'workflowStatus',
        align: 'right',
        width: commonWidth.status,
        // sorter: true
    },
    ,
    {
        title: 'Cycle Name',
        dataIndex: 'cycleName',
        align: 'right',
        width: commonWidth.cycle,
        // sorter: true
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
        align: 'left',
        width: commonWidth.operation,
        scopedSlots: {customRender: "operation"}
        // sorter: true
    }
]

const tableTitle_langEn5 = [
    {
        title: 'Control Point',
        dataIndex: 'controlPoint',
        align: 'left',
        width: 160, //have sub-level, need specific size
    },
    {
        title: 'Status',
        dataIndex: 'controlPointStatus',
        align: 'left',
        width: 200,
        // sorter: true
    },
    {
        title: 'Last Update Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'right',
        width: 300,
        // sorter: true
    },
    {
        title: 'Instance ID',
        dataIndex: 'instanceId',
        align: 'right',
        width: 300,
        // sorter: true
    },
    {
        title: 'Workflow Status',
        dataIndex: 'workflowStatus',
        align: 'right',
        width: 300,
        // sorter: true
    }
]

let filter_langEn = [
    {
        index: 0,
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
        index: 1,
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
