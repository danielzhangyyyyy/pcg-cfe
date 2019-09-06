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
        title: 'I2 Plant',
        dataIndex: 'i2Plant',
        align: 'left',
        width: commonWidth.plant,
        sorter: true
    },
    {
        title: 'ECC Plant',
        dataIndex: 'eccPlant',
        align: 'left',
        width: commonWidth.plant,
        sorter: true
    },
    {
        title: 'Subgeo',
        dataIndex: 'subgeo',
        align: 'left',
        width: commonWidth.subgeo,
        sorter: true
    },
    {
        title: 'Currency',
        dataIndex: 'currencyName',
        align: 'left',
        width: commonWidth.baseCurrency,
        sorter: true
    },
    {
        title: 'Software Royalty',
        dataIndex: 'swr',
        align: 'left',
        width: commonWidth.swr,
        sorter: true
    },
    {
        title: 'Last Modify By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        sorter: true
    },
    {
        title: 'Last Modify Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        sorter: true
    },
]

let filter_langEn = [
    {
        index: 0,
        label: 'Brand',
        decorator: 'brand',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Brand',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 1,
        label: 'I2 Plant',
        decorator: 'i2Plant',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select I2 Plant',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 2,
        label: 'ECC Plant',
        decorator: 'eccPlant',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select ECC Plant',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 3,
        label: 'Currency',
        decorator: 'currencyName',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select Currency',
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