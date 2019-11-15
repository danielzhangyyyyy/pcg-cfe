import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Characteristic',
        dataIndex: 'atnam',
        align: 'left',
        width: commonWidth.characteristic,
        sorter: true
    },
    {
        title: 'Values',
        dataIndex: 'atwrt',
        align: 'left',
        width: commonWidth.value,
        sorter: true
    },
    {
        title: 'Variant',
        dataIndex: 'varcond',
        align: 'left',
        width: commonWidth.variant,
        sorter: true
    },
    {
        title: 'SBB',
        dataIndex: 'sbb',
        align: 'left',
        width: commonWidth.sbb,
        sorter: true
    },
    {
        title: 'BOM Quantity',
        dataIndex: 'qtyper',
        align: 'left',
        width: commonWidth.sbbUnitQty,
        sorter: true
    },
    {
        title: 'Cost Plant',
        dataIndex: 'plant',
        align: 'left',
        width: commonWidth.costPlant,
        sorter: true
    },
    {
        title: 'Cost Type',
        dataIndex: 'costType',
        align: 'left',
        width: commonWidth.costType,
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
        title: 'lm1',
        dataIndex: 'lm1',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'lm2',
        dataIndex: 'lm2',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'lm3',
        dataIndex: 'lm3',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'lm4',
        dataIndex: 'lm4',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'lm5',
        dataIndex: 'lm5',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'lm6',
        dataIndex: 'lm6',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'lm7',
        dataIndex: 'lm7',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'lm8',
        dataIndex: 'lm8',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'lm9',
        dataIndex: 'lm9',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'lm10',
        dataIndex: 'lm10',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'lm11',
        dataIndex: 'lm11',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    },
    {
        title: 'lm12',
        dataIndex: 'lm12',
        align: 'right',
        width: commonWidth.m,
        sorter: true
    }
]


let filter_langEn = [
    {
        index: 0,
        label: 'Cycle',
        decorator: 'cycle',
        required: true,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: 'CURRENT',
        dropDownList: []
    },
    {
        index: 1,
        label: 'Assembly',
        decorator: 'model',
        required: true,
        allowClear: true,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'autoComplete',
        text: '',
        dropDownList: []
    },
    {
        index: 2,
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
        index: 3,
        label: 'Brand',
        decorator: 'modelBrand',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 4,
        label: 'Product Family',
        decorator: 'modelFamily',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 5,
        label: 'Country/Region',
        decorator: 'country',
        required: true,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 6,
        label: 'Cost Type',
        decorator: 'costType',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 7,
        label: 'Characteristic',
        decorator: 'atanm',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
    {
        index: 8,
        label: 'Value',
        decorator: 'atwrt',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropDownList: []
    },
]

export default {
    tableTitle_langEn,
    filter_langEn,
    deltaSize
}
