import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: "left"
    },
    {
        dataIndex: "check",
        key: "check",
        slots: {title: "checkTitle"},
        fixed: "left",
        align: "center",
        width: commonWidth.deltaSize,
        scopedSlots: {customRender: "check"}
    },
    {
        title: "Part Number",
        key: "partNumber",
        dataIndex: "partNumber",
        align: "left",
        width: commonWidth.part,
        sorter: true
    },
    {
        title: "Product Group",
        key: "productGroup",
        dataIndex: "productGroup",
        align: "left",
        width: commonWidth.productGroup,
        sorter: true
    },
    {
        title: "Mfg Plant",
        dataIndex: "mfgPlant",
        key: "mfgPlant",
        align: "left",
        width: commonWidth.plant,
        sorter: true
    },
    {
        title: "Cost Elem",
        dataIndex: "costElem",
        key: "costElem",
        align: "left",
        width: commonWidth.costElem,
        sorter: true
    },
    {
        title: "PG",
        dataIndex: "pg",
        key: "pg",
        align: "left",
        width: commonWidth.productGroup,
        sorter: true
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        align: "left",
        width: commonWidth.status,
        sorter: true
    },
    {
        title: "Spec",
        dataIndex: "spec",
        key: "spec",
        align: "left",
        width: commonWidth.spec,
        sorter: true
    },
    {
        title: "Commodity",
        dataIndex: "commodity",
        key: "commodity",
        align: "left",
        width: commonWidth.commodity,
        sorter: true
    },
    {
        title: "Is Validate",
        dataIndex: "isValidate",
        key: "isValidate",
        align: "left",
        width: commonWidth.isValidate,
        sorter: true
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
        align: "left",
        width: commonWidth.description,
        sorter: true
    },
    {
        title: "Base Currency",
        dataIndex: "currencyName",
        key: "currencyName",
        align: "left",
        width: commonWidth.baseCurrency,
        sorter: true
    },
    {
        title: "m1",
        dataIndex: "m1",
        key: "m1",
        align: "right",
        width: commonWidth.m,
        sorter: true
    },
    {
        title: "m2",
        dataIndex: "m2",
        key: "m2",
        align: "right",
        width: commonWidth.m,
        sorter: true
    },
    {
        title: "m3",
        dataIndex: "m3",
        key: "m3",
        align: "right",
        width: commonWidth.m,
        sorter: true
    },
    {
        title: "m4",
        dataIndex: "m4",
        key: "m4",
        align: "right",
        width: commonWidth.m,
        sorter: true
    },
    {
        title: "m5",
        dataIndex: "m5",
        key: "m5",
        align: "right",
        width: commonWidth.m,
        sorter: true
    },
    {
        title: "m6",
        dataIndex: "m6",
        key: "m6",
        align: "right",
        width: commonWidth.m,
        sorter: true
    },
    {
        title: "m7",
        dataIndex: "m7",
        key: "m7",
        align: "right",
        width: commonWidth.m,
        sorter: true
    },
    {
        title: "m8",
        dataIndex: "m8",
        key: "m8",
        align: "right",
        width: commonWidth.m,
        sorter: true
    },
    {
        title: "m9",
        dataIndex: "m9",
        key: "m9",
        align: "right",
        width: commonWidth.m,
        sorter: true
    },
    {
        title: "m10",
        dataIndex: "m10",
        key: "m10",
        align: "right",
        width: commonWidth.m,
        sorter: true
    },
    {
        title: "m11",
        dataIndex: "m11",
        key: "m11",
        align: "right",
        width: commonWidth.m,
        sorter: true
    },
    {
        title: "m12",
        dataIndex: "m12",
        key: "m12",
        align: "right",
        width: commonWidth.m,
        sorter: true
    },
    {
        title: "New Part Number",
        dataIndex: "newPartNumber",
        key: "newPartNumber",
        align: "left",
        width: commonWidth.part,
        sorter: true
    },
    {
        title: "Owner",
        dataIndex: "ownerCosttape",
        key: "ownerCosttape",
        align: "left",
        width: commonWidth.ownerCosttape,
        sorter: true
    },
    {
        title: "Last Modified Date",
        dataIndex: "sysLastModifiedDate",
        key: "sysLastModifiedDate",
        align: "left",
        width: commonWidth.sysLastModifiedDate,
        sorter: true
    },
    {
        title: "Last Modified By",
        dataIndex: "sysLastModifiedBy",
        key: "sysLastModifiedBy",
        align: "left",
        width: commonWidth.sysLastModifiedBy,
        sorter: true
    }
];

//edit页面
const editAndDetail_langEn =[
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
        label: 'mfgPlant',
        decorator: 'mfgPlant',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input mfgPlant'
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
        label: 'isValidate',
        decorator: 'isValidate',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input isValidate'
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
]

let filter_langEn = [
    {
        index: 1,
        label: 'Cycle',
        decorator: 'cycle',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: 'CURRENT',
        dropDownList: []
    },
    {
        index: 2,
        label: 'Mfg Plant',
        decorator: 'mfgPlant',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 3,
        label: 'PG',
        decorator: 'pg',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 4,
        label: 'Status',
        decorator: 'status',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 5,
        label: 'Commodity',
        decorator: 'commodity',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 6,
        label: 'Is Validate',
        decorator: 'isValidate',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 7,
        label: 'Owner',
        decorator: 'ownerCosttape',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'input',
        text: ''
    },
    {
        index: 8,
        label: 'Last Modified Date Start',
        decorator: 'sysLastModifiedDateStart',
        required: true,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'date',
        text: ''
    },
    {
        index: 9,
        label: 'Last Modified Date End',
        decorator: 'sysLastModifiedDateEnd',
        required: true,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'date',
        text: ''
    },
    {
        index: 10,
        label: 'Part Number',
        decorator: 'partNumber',
        required: true,
        allowClear: true,
        message: 'Please input partNumber',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
