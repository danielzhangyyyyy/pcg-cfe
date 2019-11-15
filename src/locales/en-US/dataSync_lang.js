import commonWidth from "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Sync Timestamp',
        dataIndex: 'syncTimestamp',
        align: 'left',
        width: commonWidth.syncTimestamp,
    },
    {
        title: 'Table Name',
        dataIndex: 'tableName',
        align: 'left',
        width: commonWidth.tableName,
    },
    {
        title: 'Product Group',
        dataIndex: 'productGroup',
        align: 'left',
        width: commonWidth.productGroup,
    },
    {
        title: 'Batch Size',
        dataIndex: 'batchSize',
        align: 'left',
        width: commonWidth.batchSize,
    },
    {
        title: 'Start Time',
        dataIndex: 'startTime',
        align: 'left',
        width: commonWidth.startTime,
    },
    {
        title: 'End Time',
        dataIndex: 'endTime',
        align: 'left',
        width: commonWidth.endTime,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: commonWidth.status,
    },
    {
        title: 'DataNumber',
        dataIndex: 'dataNumber',
        align: 'left',
        width: commonWidth.status,
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
        align: 'left',
        width: commonWidth.operationTime,
        scopedSlots: {customRender: "operation"}
    }
]

// list页面表头1
const tableTitle_langEn1 = [
    {
        title: 'Product Group',
        dataIndex: 'productGroup',
        align: 'left',
        width: commonWidth.productGroup,
    },
    {
        title: 'Table Name',
        dataIndex: 'tableName',
        align: 'left',
        width: commonWidth.tableName,
        scopedSlots: {customRender: "tableName"}
    },
    {
        title: 'Paralled Degree',
        dataIndex: 'parallelDegree',
        align: 'left',
        width: commonWidth.parallelDegree,
    },
    {
        title: 'Batch Size',
        dataIndex: 'batchSize',
        align: 'left',
        width: commonWidth.batchSize,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: commonWidth.status,
    },
    {
        title: 'Data Seq',
        dataIndex: 'dataSeq',
        align: 'left',
        width: commonWidth.dataSeq,
    },
    {
        title: 'Data Time',
        dataIndex: 'dataTime',
        align: 'left',
        width: commonWidth.dataTime,
    },
    {
        title: 'Last Sync Seq',
        dataIndex: 'lastSyncSeq',
        align: 'left',
        width: commonWidth.lastSyncSeq,
    },
    {
        title: 'Last Sync Time',
        dataIndex: 'lastSyncTime',
        align: 'left',
        width: commonWidth.lastSyncTime,
    },
]

// list页面表头
const detailTitle_langEn = [
    {
        title: 'Sync Timestamp',
        dataIndex: 'syncTimestamp',
        align: 'left',
        width: commonWidth.syncTimestamp,
    },
    {
        title: 'Table Name',
        dataIndex: 'tableName',
        align: 'left',
        width: commonWidth.tableName,
    },
    {
        title: 'Product Group',
        dataIndex: 'productGroup',
        align: 'left',
        width: commonWidth.productGroup,
    },
    {
        title: 'Batch Num',
        dataIndex: 'batchNum',
        align: 'left',
        width: commonWidth.batchNum,
    },
    {
        title: 'Retry Times',
        dataIndex: 'retryTimes',
        align: 'left',
        width: commonWidth.retryTimes,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: commonWidth.status,
    },
    {
        title: 'Mills',
        dataIndex: 'millis',
        align: 'left',
        width: commonWidth.status,
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
        align: 'left',
        width: commonWidth.operationTime,
        scopedSlots: {customRender: "operation"}
    }
]



let filter_langEn = [
    {
        index: 1,
        label: 'Product Group',
        decorator: 'productGroup',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    }
]

export default {
    tableTitle_langEn,
    detailTitle_langEn,
    tableTitle_langEn1,
    filter_langEn,
    deltaSize
}
