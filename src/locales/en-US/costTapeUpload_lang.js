import commonWidth from "./columnCommonWidth_lang.js"

const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Product Group',
        dataIndex: 'productGroup',
        align: 'left',
        width: commonWidth.productGroup,
        sorter: true
    },
    {
        title: 'Part Number',
        dataIndex: 'partNumber',
        align: 'left',
        width: commonWidth.part,
        sorter: true
    },
    {
        title: 'Mfg Plant',
        dataIndex: 'mfgPlant',
        align: 'left',
        width: commonWidth.plant,
        sorter: true
    },
    {
        title: 'Cost Elem',
        dataIndex: 'costElem',
        align: 'left',
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
        title: 'Is Validate',
        dataIndex: 'isValidate',
        align: 'left',
        width: commonWidth.isValidate,
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
        title: 'Owner',
        dataIndex: 'ownerCosttape',
        align: 'left',
        width: commonWidth.ownerCosttape,
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
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        sorter: true
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        sorter: true
    }
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'Product Group',
        decorator: 'productGroup',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input productGroup'
    },
    {
        label: 'Part Number',
        decorator: 'partNumber',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input partNumber'
    },
    {
        label: 'Mfg Plant',
        decorator: 'mfgPlant',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input mfgPlant'
    },
    {
        label: 'Cost Elem',
        decorator: 'costElem',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input costElem'
    },
    {
        label: 'PG',
        decorator: 'pg',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input pg'
    },
    {
        label: 'Status',
        decorator: 'status',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input status'
    },
    {
        label: 'Spec',
        decorator: 'spec',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input spec'
    },
    {
        label: 'Commodity',
        decorator: 'commodity',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input commodity'
    },
    {
        label: 'Is Validate',
        decorator: 'isValidate',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input isValidate'
    },
    {
        label: 'Cycle',
        decorator: 'cycle',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input isValidate'
    },
    {
        label: 'Description',
        decorator: 'Description',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input description'
    },
    {
        label: 'Base Currency',
        decorator: 'currencyName',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input currencyName'
    },
    {
        label: 'm1',
        decorator: 'm1',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m1'
    },
    {
        label: 'm2',
        decorator: 'm2',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m2'
    },
    {
        label: 'm3',
        decorator: 'm3',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m3'
    },
    {
        label: 'm4',
        decorator: 'm4',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m4'
    },
    {
        label: 'm5',
        decorator: 'm5',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m5'
    },
    {
        label: 'm6',
        decorator: 'm6',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m6'
    },
    {
        label: 'm7',
        decorator: 'm7',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m7'
    },
    {
        label: 'm8',
        decorator: 'm8',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m8'
    },
    {
        label: 'm9',
        decorator: 'm9',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m9'
    },
    {
        label: 'm10',
        decorator: 'm10',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m10'
    },
    {
        label: 'm11',
        decorator: 'm11',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m11'
    },
    {
        label: 'm12',
        decorator: 'm12',
        required: true,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input m12'
    },
    {
        label: 'New Part Number',
        decorator: 'newPartNumber',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input newPartNumber'
    },
    {
        label: 'Owner',
        decorator: 'ownerCosttape',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input ownerCosttape'
    }
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
        label: 'Cost Elem',
        decorator: 'costElem',
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
        index: 5,
        label: 'status',
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
        index: 6,
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
        index: 7,
        label: 'Spec',
        decorator: 'spec',
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
        index: 8,
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
        index: 9,
        label: 'Owner',
        decorator: 'ownerCosttape',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 10,
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
        index: 11,
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
        index: 12,
        label: 'Part Number',
        decorator: 'partNumber',
        required: true,
        allowClear: true,
        message: 'Please input partNumber',
        placeHolder: 'Please input',
        inputType: 'partNumber',
        text: ''
    },
    // {
    //     index: 12,
    //     label: 'Part Number',
    //     decorator: 'partNumber',
    //     required: false,
    //     allowClear: true,
    //     editDisabled: false,
    //     message: 'Please select',
    //     placeHolder: 'Please select',
    //     inputType: 'input',
    //     text: ''
    // },
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
