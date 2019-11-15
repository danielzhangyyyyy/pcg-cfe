import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Part Number',
        dataIndex: 'partNumber',
        align: 'left',
        fixed: 'left',
        width: commonWidth.part,
        sorter: true
    },
    {
        title: 'Plant',
        dataIndex: 'plant',
        align: 'left',
        fixed: 'left',
        width: commonWidth.plant,
        sorter: true
    },
    {
        title: 'Cost Elem',
        dataIndex: 'costElem',
        align: 'left',
        fixed: 'left',
        width: commonWidth.costElem,
        sorter: true
    },
    {
        title: 'PG',
        dataIndex: 'pg',
        align: 'left',
        width: commonWidth.productGroup,
        sorter: true
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: commonWidth.status,
        sorter: true
    },
    {
        title: 'Spec',
        dataIndex: 'spec',
        align: 'left',
        width: commonWidth.spec,
        sorter: true
    },
    {
        title: 'Commodity',
        dataIndex: 'commodity',
        align: 'left',
        width: commonWidth.commodity,
        sorter: true
    },
    {
        title: 'Source',
        dataIndex: 'source',
        align: 'left',
        width: commonWidth.source,
        sorter: true
    },
    {
        title: 'Used',
        dataIndex: 'used',
        align: 'left',
        width: commonWidth.used,
        sorter: true
    },
    {
        title: 'Description',
        dataIndex: 'description',
        align: 'left',
        width: commonWidth.description,
        sorter: true
    },
    {
        title: 'Base Currency',
        dataIndex: 'currencyName',
        align: 'left',
        width: commonWidth.baseCurrency,
        sorter: true
    },
    {
        title: 'm1',
        dataIndex: 'm1',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm2',
        dataIndex: 'm2',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm3',
        dataIndex: 'm3',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm4',
        dataIndex: 'm4',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm5',
        dataIndex: 'm5',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm6',
        dataIndex: 'm6',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm7',
        dataIndex: 'm7',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm8',
        dataIndex: 'm8',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm9',
        dataIndex: 'm9',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm10',
        dataIndex: 'm10',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm11',
        dataIndex: 'm11',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'm12',
        dataIndex: 'm12',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'New Part Number',
        dataIndex: 'newPartNumber',
        align: 'left',
        width: commonWidth.part,
        sorter: true
    },
    {
        title: 'Owner',
        dataIndex: 'ownerCosttape',
        align: 'left',
        width: commonWidth.ownerCosttape,
        sorter: true
    },
    {
        title: 'Upload By',
        dataIndex: 'uploadBy',
        align: 'left',
        width: commonWidth.uploadBy,
        sorter: true
    },
    {
        title: 'Upload Date',
        dataIndex: 'uploadDate',
        align: 'left',
        width: commonWidth.uploadDate,
        sorter: true
    },
    {
        title: 'Import By',
        dataIndex: 'importBy',
        align: 'left',
        width: commonWidth.importBy,
        sorter: true
    },
    {
        title: 'Import Date',
        dataIndex: 'importDate',
        align: 'left',
        width: commonWidth.importDate,
        sorter: true
    },
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'cycle',
        decorator: 'cycle',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input cycle'
    },
    {
        label: 'productGroup',
        decorator: 'productGroup',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input productGroup'
    },
    {
        label: 'partNumber',
        decorator: 'partNumber',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input partNumber'
    },
    {
        label: 'plant',
        decorator: 'plant',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input plant'
    },
    {
        label: 'costElem',
        decorator: 'costElem',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input costElem'
    },
    {
        label: 'pg',
        decorator: 'pg',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input pg'
    },
    {
        label: 'spec',
        decorator: 'spec',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input spec'
    },
    {
        label: 'commodity',
        decorator: 'commodity',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input commodity'
    },
    {
        label: 'source',
        decorator: 'source',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input source'
    },
    {
        label: 'used',
        decorator: 'used',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input used'
    },
    {
        label: 'description',
        decorator: 'description',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input description'
    },
    {
        label: 'currencyName',
        decorator: 'currencyName',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input currencyName'
    },
    {
        label: 'm1',
        decorator: 'm1',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m1'
    },
    {
        label: 'm2',
        decorator: 'm2',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m2'
    },
    {
        label: 'm3',
        decorator: 'm3',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m3'
    },
    {
        label: 'm4',
        decorator: 'm4',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m4'
    },
    {
        label: 'm5',
        decorator: 'm5',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m5'
    },
    {
        label: 'm6',
        decorator: 'm6',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m6'
    },
    {
        label: 'm7',
        decorator: 'm7',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m7'
    },
    {
        label: 'm8',
        decorator: 'm8',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m8'
    },
    {
        label: 'm9',
        decorator: 'm9',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m9'
    },
    {
        label: 'm10',
        decorator: 'm10',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m10'
    },
    {
        label: 'm11',
        decorator: 'm11',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m11'
    },
    {
        label: 'm12',
        decorator: 'm12',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input m12'
    },
    {
        label: 'newPartNumber',
        decorator: 'newPartNumber',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input newPartNumber'
    },
    {
        label: 'ownerCosttape',
        decorator: 'ownerCosttape',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input ownerCosttape'
    },
    {
        label: 'lastModifiedDateCosttape',
        decorator: 'lastModifiedDateCosttape',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lastModifiedDateCosttape'
    },
    {
        label: 'createdDateCosttape',
        decorator: 'createdDateCosttape',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input createdDateCosttape'
    },
    {
        label: 'companyConfidential',
        decorator: 'companyConfidential',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input companyConfidential'
    },
    {
        label: 'landed',
        decorator: 'landed',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input landed'
    },
    {
        label: 'costPeriods',
        decorator: 'costPeriods',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input costPeriods'
    },
    {
        label: 'action',
        decorator: 'action',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input action'
    },
    {
        label: 'status',
        decorator: 'status',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input status'
    },
    {
        label: 'sysCreatedDate',
        decorator: 'sysCreatedDate',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysCreatedDate'
    },
    {
        label: 'sysCreatedBy',
        decorator: 'sysCreatedBy',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysCreatedBy'
    },
    {
        label: 'sysLastModifiedDate',
        decorator: 'sysLastModifiedDate',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysLastModifiedDate'
    },
    {
        label: 'sysLastModifiedBy',
        decorator: 'sysLastModifiedBy',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input sysLastModifiedBy'
    },
    {
        label: 'partType',
        decorator: 'partType',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input partType'
    },
    {
        label: 'changeId',
        decorator: 'changeId',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input changeId'
    },
    {
        label: 'changeAction',
        decorator: 'changeAction',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input changeAction'
    },
    {
        label: 'weightedAverage',
        decorator: 'weightedAverage',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input weightedAverage'
    },
    {
        label: 'lattestProcur',
        decorator: 'lattestProcur',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input lattestProcur'
    },
    {
        label: 'uploadDate',
        decorator: 'uploadDate',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input uploadDate'
    },
    {
        label: 'uploadBy',
        decorator: 'uploadBy',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input uploadBy'
    },
    {
        label: 'importDate',
        decorator: 'importDate',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input importDate'
    },
    {
        label: 'importBy',
        decorator: 'importBy',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input importBy'
    },
]

let filter_langEn = [
    {
        index: 0,
        label: 'Cycle',
        decorator: 'cycle',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Cycle',
        placeHolder: 'Cycle',
        inputType: 'dropDown',
        text: 'CURRENT',
        dropDownList: []
    },
    {
        index: 1,
        label: 'Plant',
        decorator: 'plant',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Plant',
        placeHolder: 'Plant',
        inputType: 'dropDown',
        // text: '',
        dropDownList: []
    },
    {
        index: 2,
        label: 'Cost Elem',
        decorator: 'costElem',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Cost Elem',
        placeHolder: 'Cost Elem',
        inputType: 'dropDown',
        // text: '',
        dropDownList: []
    },
    {
        index: 3,
        label: 'PG',
        decorator: 'pg',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select PG',
        placeHolder: 'PG',
        inputType: 'dropDown',
        // text: '',
        dropDownList: []
    },
    {
        index: 4,
        label: 'Status',
        decorator: 'status',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Status',
        placeHolder: 'Status',
        inputType: 'dropDown',
        // text: '',
        dropDownList: []
    },
    {
        index: 5,
        label: 'Commodity',
        decorator: 'commodity',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Commodity',
        placeHolder: 'Commodity',
        inputType: 'dropDown',
        // text: '',
        dropDownList: []
    },
    {
        index: 6,
        label: 'Spec',
        decorator: 'spec',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Spec',
        placeHolder: 'Spec',
        inputType: 'dropDown',
        // text: '',
        dropDownList: []
    },
    {
        index: 7,
        label: 'Source',
        decorator: 'source',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Source',
        placeHolder: 'Source',
        inputType: 'dropDown',
        // text: '',
        dropDownList: []
    },
    {
        index: 8,
        label: 'Used',
        decorator: 'used',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Used',
        placeHolder: 'Used',
        inputType: 'dropDown',
        // text: '',
        dropDownList: []
    },
    {
        index: 9,
        label: 'Part Number',
        decorator: 'partNumber',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input Part Number',
        placeHolder: 'Part Number',
        inputType: 'partNumber',
        text: ''
    },
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
