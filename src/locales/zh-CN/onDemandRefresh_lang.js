// list页面表头
const tableTitle_langZh = [
    {
        title: 'Product Group',
        dataIndex: 'productGroup',
        align: 'left',
        sorter: true,
    },
    {
        title: 'Event Name',
        dataIndex: 'eventName',
        align: 'left',
        sorter: true,
    },
    {
        title: 'On Demand Type',
        dataIndex: 'ondemandType',
        align: 'left',
        sorter: true,
    },
    {
        title: 'Item',
        dataIndex: 'item',
        align: 'left',
        sorter: true,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        sorter: true,
    },
    {
        title: 'Message',
        dataIndex: 'message',
        align: 'left',
        sorter: true,
    },
    {
        title: 'Created Date',
        dataIndex: 'sysCreatedDate',
        align: 'left',
        sorter: true,
    },
    {
        title: 'Created By',
        dataIndex: 'sysCreatedBy',
        align: 'left',
        sorter: true,
    }
]

let filter_langZh = [{
    index: 0,
    label: 'Refresh Object',
    decorator: 'ondemandType',
    required: true,
    allowClear: true,
    message: 'Please select Refresh Object',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    text: '',
    dropDownList: []
}, {
    index: 1,
    label: 'Model or Family',
    decorator: 'modelandfamily',
    required: false,
    allowClear: true,
    message: 'Please input model or family',
    placeHolder: 'Please input model or family',
    inputType: 'input',
    text: '',
    example: '67Y1464;41U3143;T49HNEU or NOZOMI-1;DASHER;K330'
}]

export default {
    tableTitle_langZh,
    filter_langZh
}
