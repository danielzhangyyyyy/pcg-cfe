import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Cto',
        dataIndex: 'cto',
        align: 'left',
        width: commonWidth.cto,
        sorter: true
    },
    {
        title: 'Characterisc',
        dataIndex: 'character',
        align: 'left',
        width: commonWidth.characteristic,
        sorter: true
    },
    {
        title: 'Values',
        dataIndex: 'value',
        align: 'left',
        width: commonWidth.value,
        sorter: true
    },
    {
        title: 'Variant',
        dataIndex: 'variant',
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
        title: 'Sales Org',
        dataIndex: 'salesOrg',
        align: 'left',
        width: commonWidth.salesOrg,
        sorter: true
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        align: 'left',
        width: commonWidth.brand,
        sorter: true
    },
    {
        title: 'Family',
        dataIndex: 'family',
        align: 'left',
        width: commonWidth.prodFamily,
        sorter: true
    },
    {
        title: 'Prod H',
        dataIndex: 'prodH',
        align: 'left',
        width: commonWidth.prodH,
        sorter: true
    },
    {
        title: 'Current SBB Cost',
        dataIndex: 'currentSbbCost',
        align: 'right',
        width: commonWidth.currentSbbCost,
        sorter: true
    },
    {
        title: 'Current VK Cost',
        dataIndex: 'currentVkCost',
        align: 'right',
        width: commonWidth.currentVkCost,
        sorter: true
    },
    {
        title: 'Latest SBB Cost',
        dataIndex: 'latestSbbCost',
        align: 'right',
        width: commonWidth.latestSbbCost,
        sorter: true
    },
    {
        title: 'Latest VK Cost',
        dataIndex: 'latestVkCost',
        align: 'right',
        width: commonWidth.latestVkCost,
        sorter: true
    },
    {
        title: 'Delta SBB Cost',
        dataIndex: 'deltaSbbCost',
        align: 'right',
        width: commonWidth.deltaSbbCost,
        sorter: true
    },
    {
        title: 'Delta VK Cost',
        dataIndex: 'deltaVkCost',
        align: 'right',
        width: commonWidth.deltaVkCost,
        sorter: true
    },
    {
        title: 'Is Warranty',
        dataIndex: 'isWarranty',
        align: 'left',
        width: commonWidth.isWarranty,
        sorter: true
    },
    {
        title: 'Latest Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        sorter: true
    },
]


let filter_langEn = [
    {
        index: 1,
        label: 'CTO',
        decorator: 'cto',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 2,
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
        index: 3,
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
        index: 4,
        label: 'Product Family',
        decorator: 'family',
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
        label: 'Charactieristic',
        decorator: 'character',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 6,
        label: 'Values',
        decorator: 'value',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 7,
        label: 'Variant',
        decorator: 'variant',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 8,
        label: 'Sales Org',
        decorator: 'salesOrg',
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
        label: 'SBB',
        decorator: 'sbb',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'input',
        text: ''
    },
    {
        index: 10,
        label: 'Is Warranty',
        decorator: 'isWarranty',
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
        index: 11,
        label: 'Current SBB Cost',
        decorator: 'currentSbbCost',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'Please input',
        inputType: 'selectInput',
        text: ''
    },
    {
        index: 12,
        label: 'Latest SBB Cost',
        decorator: 'latestSbbCost',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'selectInput',
        text: ''
    },
    {
        index: 13,
        label: 'Delta SBB Cost',
        decorator: 'deltaSbbCost',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'selectInput',
        text: ''
    },
    {
        index: 14,
        label: 'Current VK Cost',
        decorator: 'currentVkCost',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'selectInput',
        text: ''
    },
    {
        index: 15,
        label: 'Latest VK Cost',
        decorator: 'latestVkCost',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'selectInput',
        text: ''
    },
    {
        index: 16,
        label: 'Delta VK Cost',
        decorator: 'deltaVkCost',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'selectInput',
        text: ''
    },
]

export default {
    tableTitle_langEn,
    deltaSize,
    filter_langEn
}
