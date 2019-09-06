import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Product Group',
        dataIndex: 'productGroup',
        align: 'left',
        width: commonWidth.productGroup,
        sorter: true,
    },
    {
        title: 'Event Name',
        dataIndex: 'eventName',
        align: 'left',
        width: commonWidth.eventName,
        sorter: true,
    },
    {
        title: 'On Demand Type',
        dataIndex: 'ondemandType',
        align: 'left',
        width: commonWidth.ondemandType,
        sorter: true,
    },
    {
        title: 'Item',
        dataIndex: 'item',
        align: 'left',
        width: commonWidth.item,
        sorter: true,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: commonWidth.status,
        sorter: true,
    },
    {
        title: 'Message',
        dataIndex: 'message',
        align: 'left',
        width: commonWidth.message,
        sorter: true,
    },
    {
        title: 'Created Date',
        dataIndex: 'sysCreatedDate',
        align: 'left',
        width: commonWidth.sysCreatedDate,
        sorter: true,
    },
    {
        title: 'Created By',
        dataIndex: 'sysCreatedBy',
        align: 'left',
        width: commonWidth.sysCreatedBy,
        sorter: true,
    }
]

let filter_langEn = [{
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
    decorator: 'modelfamily',
    required: false,
    allowClear: true,
    message: 'Please input model or family',
    placeHolder: 'Please input model or family',
    inputType: 'input',
    text: '',
    example: '67Y1464;41U3143;T49HNEU or NOZOMI-1;DASHER;K330'
}]

export default {
    deltaSize,
    tableTitle_langEn,
    filter_langEn
}
