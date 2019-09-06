// list页面表头
const tableTitle_langEn = [
    {
        title: 'Control Point',
        dataIndex: 'controlPoint',
        align: 'left',
        width: 160, //have sub-level, need specific size
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: 200,
        // sorter: true
    },
    {
        title: 'Last Update Date',
        dataIndex: 'sysLastUpdateDate',
        align: 'right',
        width: 300,
        // sorter: true
    }
]
const tableTitle_langEn1 = [
    {
        title: 'Control Point',
        dataIndex: 'controlPoint',
        align: 'left',
        width: 160, //have sub-level, need specific size
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: 200,
        // sorter: true
    },
    {
        title: 'Last Update Date',
        dataIndex: 'sysLastUpdateDate',
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
const tableTitle_langEn2 = [
    {
        title: 'Control Point',
        dataIndex: 'controlPoint',
        align: 'left',
        width: 160, //have sub-level, need specific size
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: 200,
        // sorter: true
    },
    {
        title: 'Last Update Date',
        dataIndex: 'sysLastUpdateDate',
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
    },
    {
        title: 'Cycle Name',
        dataIndex: 'cycleName',
        align: 'right',
        width: 300,
        // sorter: true
    }
]
const tableTitle_langEn3 = [
    {
        title: 'Control Point',
        dataIndex: 'controlPoint',
        align: 'left',
        width: 160, //have sub-level, need specific size
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: 200,
        // sorter: true
    },
    {
        title: 'Last Update Date',
        dataIndex: 'sysLastUpdateDate',
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
    },
    {
        title: 'Cycle Name',
        dataIndex: 'cycleName',
        align: 'right',
        width: 300,
        // sorter: true
    }
]
const tableTitle_langEn4 = [
    {
        title: 'Control Point',
        dataIndex: 'controlPoint',
        align: 'left',
        width: 160, //have sub-level, need specific size
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: 200,
        // sorter: true
    },
    {
        title: 'Last Update Date',
        dataIndex: 'sysLastUpdateDate',
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
    },
    {
        title: 'Cycle Name',
        dataIndex: 'cycleName',
        align: 'right',
        width: 300,
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
        dataIndex: 'status',
        align: 'left',
        width: 200,
        // sorter: true
    },
    {
        title: 'Last Update Date',
        dataIndex: 'sysLastUpdateDate',
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
        label: 'Cycle',
        decorator: 'cycle',
        required: true,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: 'CURRENT',
        dropDownList: []
    },
    {
        index: 1,
        label: 'Assembly',
        decorator: 'assembly',
        required: true,
        allowClear: true,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'autoComplete',
        text: '',
        dropDownList: []
    },
    {
        index: 2,
        label: 'Plant',
        decorator: 'plant',
        required: true,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 3,
        label: 'Brand',
        decorator: 'brand',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    }
]

export default {
    tableTitle_langEn,
    tableTitle_langEn1,
    tableTitle_langEn2,
    tableTitle_langEn3,
    tableTitle_langEn4,
    tableTitle_langEn5,
    filter_langEn
}
