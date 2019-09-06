import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Plant',
        dataIndex: 'plant',
        align: 'left',
        width: commonWidth.plant,
        sorter: true
    },
    {
        title: 'Geo',
        dataIndex: 'geo',
        align: 'left',
        width: commonWidth.subgeo,
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
        title: 'MOT',
        dataIndex: 'freightType',
        align: 'left',
        width: commonWidth.freightType,
        sorter: true
    },
    {
        title: 'Rate',
        dataIndex: 'rate',
        align: 'right',
        width: commonWidth.rate,
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
        index: 2,
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
        index: 3,
        label: 'Geo',
        decorator: 'geo',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    }
]

export default {
    deltaSize,
    tableTitle_langEn,
    filter_langEn
}
