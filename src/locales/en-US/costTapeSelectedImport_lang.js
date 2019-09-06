import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Part Number',
        dataIndex: 'partNumber',
        align: 'left',
        fixed: 'left',
        width: commonWidth.part,
        defaultWidth:150,
        sorter: true
    },
    {
        title: 'Mfg Plant',
        dataIndex: 'mfgPlant',
        align: 'left',
        fixed: 'left',
        width: commonWidth.plant,
        defaultWidth:120,
        sorter: true
    },
    {
        title: 'Cost Elem',
        dataIndex: 'costElem',
        align: 'left',
        fixed: 'left',
        width: commonWidth.costElem,
        defaultWidth:120,
        sorter: true
    },
    {
        title: 'PG',
        dataIndex: 'pg',
        align: 'left',
        width: commonWidth.productGroup,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'Status',
        dataIndex: 'status',
        align: 'left',
        width: commonWidth.status,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'Spec',
        dataIndex: 'spec',
        align: 'left',
        width: commonWidth.spec,
        defaultWidth:300,
        sorter: true
    },
    {
        title: 'Commodity',
        dataIndex: 'commodity',
        align: 'left',
        width: commonWidth.commodity,
        defaultWidth:150,
        sorter: true
    },
    {
        title: 'Is Validate',
        dataIndex: 'isValidate',
        align: 'left',
        width: commonWidth.isValidate,
        defaultWidth:150,
        sorter: true
    },
    {
        title: 'Description',
        dataIndex: 'description',
        align: 'left',
        width: commonWidth.description,
        defaultWidth:300,
        sorter: true
    },
    {
        title: 'Base Currency',
        dataIndex: 'currencyName',
        align: 'left',
        width: commonWidth.baseCurrency,
        defaultWidth:150,
        sorter: true
    },
    {
        title: 'm1',
        dataIndex: 'm1',
        align: 'right',
        width: commonWidth.m,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'm2',
        dataIndex: 'm2',
        align: 'right',
        width: commonWidth.m,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'm3',
        dataIndex: 'm3',
        align: 'right',
        width: commonWidth.m,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'm4',
        dataIndex: 'm4',
        align: 'right',
        width: commonWidth.m,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'm5',
        dataIndex: 'm5',
        align: 'right',
        width: commonWidth.m,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'm6',
        dataIndex: 'm6',
        align: 'right',
        width: commonWidth.m,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'm7',
        dataIndex: 'm7',
        align: 'right',
        width: commonWidth.m,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'm8',
        dataIndex: 'm8',
        align: 'right',
        width: commonWidth.m,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'm9',
        dataIndex: 'm9',
        align: 'right',
        width: commonWidth.m,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'm10',
        dataIndex: 'm10',
        align: 'right',
        width: commonWidth.m,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'm11',
        dataIndex: 'm11',
        align: 'right',
        width: commonWidth.m,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'm12',
        dataIndex: 'm12',
        align: 'right',
        width: commonWidth.m,
        defaultWidth:100,
        sorter: true
    },
    {
        title: 'New Part Number',
        dataIndex: 'newPartNumber',
        align: 'left',
        width: commonWidth.part,
        defaultWidth:200,
        sorter: true
    },
    {
        title: 'Owner',
        dataIndex: 'ownerCosttape',
        align: 'left',
        width: commonWidth.ownerCosttape,
        defaultWidth:200,
        sorter: true
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        defaultWidth:200,
        sorter: true
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        defaultWidth:200,
        sorter: true
    }
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
        index: 0,
        label: 'Part Number',
        decorator: 'partNumber',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input Part Number',
        placeHolder: 'Part Number',
        inputType: 'input',
        text: ''
    },
    {
        index: 1,
        label: 'Mfg Plant',
        decorator: 'mfgPlant',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Mfg Plant',
        placeHolder: 'Mfg Plant',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 2,
        label: 'Cost Elem',
        decorator: 'costElem',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Cost Elem',
        placeHolder: 'Cost Elem',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 3,
        label: 'Commodity',
        decorator: 'commodity',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Commodity',
        placeHolder: 'Commodity',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 4,
        label: 'Spec',
        decorator: 'spec',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Spec',
        placeHolder: 'Spec',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 5,
        label: 'Owner',
        decorator: 'ownerCosttape',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input Owner',
        placeHolder: 'Owner',
        inputType: 'input',
        text: ''
    },
    {
        index: 6,
        label: 'Last Modified Date Start',
        decorator: 'sysLastModifiedDateStart',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Last Modified Date Start',
        placeHolder: 'Last Modified Date Start',
        inputType: 'date',
        text: ''
    },
    {
        index: 7,
        label: 'Last Modified Date End',
        decorator: 'sysLastModifiedDateEnd',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Last Modified Date End',
        placeHolder: 'Last Modified Date End',
        inputType: 'date',
        text: ''
    },
    {
        index: 8,
        label: 'Is Validate',
        decorator: 'isValidate',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Is Validate',
        placeHolder: 'Is Validate',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 9,
        label: 'Last Modified By',
        decorator: 'lastModifiedBy',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Last Modified By',
        placeHolder: 'Last Modified By',
        inputType: 'input',
        text: ''
    }
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
