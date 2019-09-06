import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    /* {
        title: 'product Group',
        dataIndex: 'productGroup',
        align: 'left',
        width: 200,
        sorter: true
    }, */
    {
        title: 'Plant',
        dataIndex: 'plant',
        align: 'left',
        width: commonWidth.plant,
        sorter: true
    },
    {
        title: 'Plant Type',
        dataIndex: 'plantType',
        align: 'left',
        width: commonWidth.plantType,
        sorter: true
    },
    {
        title: 'Plant Desc',
        dataIndex: 'plantDesc',
        align: 'left',
        width: commonWidth.plantDesc,
        sorter: true
    },
    {
        title: 'Plant Country/Region',
        dataIndex: 'plantCountry',
        align: 'left',
        width: commonWidth.country,
        sorter: true
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        sorter: true
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        sorter: true
    },
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'Product Group',
        decorator: 'productGroup',
        required: true,
        message: 'Please input productGroup',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'Plant',
        decorator: 'plant',
        required: true,
        message: 'Please input plant',
        editDisabled: true,
        inputType: 'input',
        text: ''
    },
    {
        label: 'Plant Type',
        decorator: 'plantType',
        required: true,
        message: 'Please input plantType',
        editDisabled: false,
        inputType: 'dropDown',
        dropDownList: ['DC', 'IN_HOUSE', 'OEM'],
        text: ''

    },
    {
        label: 'Plant Desc',
        decorator: 'plantDesc',
        required: false,
        message: 'Please input plantDesc',
        editDisabled: false,
        inputType: 'input',
        text: ''
    },
    {
        label: 'Plant Country/Region',
        decorator: 'plantCountry',
        required: true,
        message: 'Please input plant Country/Region',
        editDisabled: false,
        inputType: 'dropDown',
        dropDownList: [],
        text: ''
    }
]

let filter_langEn = [{
    index: 0,
    label: 'Plant',
    decorator: 'plant',
    required: false,
    allowClear: true,
    message: 'Please select',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    text: '',
    dropDownList: []

},
{
    index: 1,
    label: 'Plant Type',
    decorator: 'plantType',
    required: false,
    allowClear: true,
    message: 'Please select',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    text: '',
    dropDownList: []
}]
export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
