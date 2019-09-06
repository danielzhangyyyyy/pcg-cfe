import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Machine Type',
        dataIndex: 'machinetype',
        align: 'left',
        width: commonWidth.machineType,
        sorter: true
    },
    {
        title: 'Product Family',
        dataIndex: 'prodFamily',
        align: 'left',
        width: commonWidth.prodFamily,
        sorter: true,
    },
    {
        title: 'Product Type',
        dataIndex: 'productType',
        align: 'left',
        width: commonWidth.productType,
        sorter: true,
    },
    {
        title: 'EOL Status',
        dataIndex: 'eolStatus',
        align: 'left',
        width: commonWidth.eolStatus,
        sorter: true
    },
    {
        title: 'eolStartdate',
        dataIndex: 'eolStartdate',
        align: 'left',
        width: commonWidth.eolStartdate,
        sorter: true
    },
    {
        title: 'eolEnddate',
        dataIndex: 'eolEnddate',
        align: 'left',
        width: commonWidth.eolEnddate,
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
    /* {
        title: 'productGroup',
        dataIndex: 'productGroup',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'brand',
        dataIndex: 'brand',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'series',
        dataIndex: 'series',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'subseries',
        dataIndex: 'subseries',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'action',
        dataIndex: 'action',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'status',
        dataIndex: 'status',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'sysCreatedDate',
        dataIndex: 'sysCreatedDate',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'sysCreatedBy',
        dataIndex: 'sysCreatedBy',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'prodhBrand',
        dataIndex: 'prodhBrand',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'seriesCode',
        dataIndex: 'seriesCode',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'prodH',
        dataIndex: 'prodH',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'groupText',
        dataIndex: 'groupText',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'brandText',
        dataIndex: 'brandText',
        align: 'left',
        width: 300,
        sorter: true
    },*/
]

//edit页面
const editAndDetail_langEn =[
    {
        label: 'Machine Type',
        decorator: 'machinetype',
        required: false,
        message: 'Please input machinetype',
        editDisabled: true,
        inputType: 'input',
        allowClear: true,
        text: ''
    },
    {
        label: 'Product Family',
        decorator: 'prodFamily',
        required: false,
        message: 'Please input prodFamily',
        editDisabled: false,
        inputType: 'input',
        allowClear: true,
        text: ''
    },
    {
        label: 'Product Type',
        decorator: 'productType',
        required: false,
        message: 'Please input productType',
        editDisabled: true,
        inputType: 'input',
        allowClear: true,
        text: ''
    },
    {
        label: 'EOL Status',
        decorator: 'eolStatus',
        required: true,
        editDisabled: false,
        message: 'Please input eolStatus',
        inputType: 'dropDown',
        allowClear: true,
        dropDownList: [],
        text: ''
    },
    {
        label: 'eolStartdate',
        decorator: 'eolStartdate',
        required: true,
        editDisabled: true,
        message: 'Please input eolStartdate',
        inputType: 'input',
        allowClear: true,
        text: ''
    },
    {
        label: 'eolEnddate',
        decorator: 'eolEnddate',
        required: true,
        editDisabled: true,
        message: 'Please input eolEnddate',
        inputType: 'input',
        allowClear: true,
        text: ''
    }/*,
    {
        label: 'sysLastModifiedBy',
        decorator: 'sysLastModifiedBy',
        required: true,
        editDisabled: true,
        message: 'Please input sysLastModifiedBy',
        inputType: 'input',
        allowClear: true,
        text: ''
    },
    {
        label: 'sysLastModifiedDate',
        decorator: 'sysLastModifiedDate',
        required: true,
        editDisabled: true,
        message: 'Please input sysLastModifiedDate',
        inputType: 'input',
        allowClear: true,
        text: ''
    } ,
    {
        label: 'productGroup',
        decorator: 'productGroup',
        required: true,
        message: 'Please input productGroup',
        editDisabled: false,
        inputType: 'input',
    },
    {
        label: 'brand',
        decorator: 'brand',
        required: true,
        message: 'Please input brand'
    },
    {
        label: 'series',
        decorator: 'series',
        required: true,
        message: 'Please input series'
    },
    {
        label: 'subseries',
        decorator: 'subseries',
        required: true,
        message: 'Please input subseries'
    },
    {
        label: 'action',
        decorator: 'action',
        required: true,
        message: 'Please input action'
    },
    {
        label: 'status',
        decorator: 'status',
        required: true,
        message: 'Please input status'
    },
    {
        label: 'sysCreatedDate',
        decorator: 'sysCreatedDate',
        required: true,
        message: 'Please input sysCreatedDate'
    },
    {
        label: 'sysCreatedBy',
        decorator: 'sysCreatedBy',
        required: true,
        message: 'Please input sysCreatedBy'
    },
    {
        label: 'prodhBrand',
        decorator: 'prodhBrand',
        required: true,
        message: 'Please input prodhBrand'
    },
    {
        label: 'seriesCode',
        decorator: 'seriesCode',
        required: true,
        message: 'Please input seriesCode'
    },
    {
        label: 'prodH',
        decorator: 'prodH',
        required: true,
        message: 'Please input prodH'
    },
    {
        label: 'groupText',
        decorator: 'groupText',
        required: true,
        message: 'Please input groupText'
    },
    {
        label: 'brandText',
        decorator: 'brandText',
        required: true,
        message: 'Please input brandText'
    }, */
]

let filter_langEn = [{
    index: 0,
    label: 'Machine Type',
    decorator: 'machinetype',
    required: true,
    allowClear: true,
    message: 'Please input machine type',
    placeHolder: 'Please input',
    inputType: 'input',
    text: ''
},
{
    index: 1,
    label: 'Product Family',
    decorator: 'prodFamily',
    required: false,
    allowClear: true,
    message: 'Please select product family',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    dropDownList: [],
    text: ''
},
{
    index: 2,
    label: 'Product Type',
    decorator: 'productType',
    required: false,
    allowClear: true,
    message: 'Please select product type',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    dropDownList: [],
    text: ''
},
{
    index: 3,
    label: 'EOL Status',
    decorator: 'eolStatus',
    required: false,
    allowClear: true,
    message: 'Please select EOL tatus',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    dropDownList: [],
    text: ''
}]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
