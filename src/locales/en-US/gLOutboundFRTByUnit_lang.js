import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        align: 'left',
        width: commonWidth.brand,
        sorter: true
    },
    {
        title: 'Plant',
        dataIndex: 'plant',
        align: 'left',
        width: commonWidth.plant,
        sorter: true
    },
    {
        title: 'Geo Type',
        dataIndex: 'geoType',
        align: 'left',
        width: commonWidth.geoType,
        sorter: true
    },
    {
        title: 'Geo Code',
        dataIndex: 'geo',
        align: 'left',
        width: commonWidth.subgeo,
        sorter: true
    },
    {
        title: 'Product Family',
        dataIndex: 'prodFamily',
        align: 'left',
        width: commonWidth.prodFamily,
        sorter: true
    },
    {
        title: 'Machine Type',
        dataIndex: 'machineType',
        align: 'left',
        width: commonWidth.machineType,
        sorter: true
    },
    {
        title: 'Rate Cost',
        dataIndex: 'm1',
        align: 'left',
        width: commonWidth.m,
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

let filter_langEn = [
    {
        index: 1,
        label: 'Cycle',
        decorator: 'cycle',
        required: true,
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
        label: 'Brand',
        decorator: 'brand',
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
        index: 3,
        label: 'Plant',
        decorator: 'plant',
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
        label: 'Geo Type',
        decorator: 'geoType',
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
        label: 'Geo Code',
        decorator: 'geo',
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
        label: 'Product Family',
        decorator: 'prodFamily',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: ['ALL']
    },
    {
        index: 7,
        label: 'Machine Type',
        decorator: 'machineType',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
]

export default {
    deltaSize,
    tableTitle_langEn,
    filter_langEn
}
