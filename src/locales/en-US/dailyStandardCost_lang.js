import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Item',
        dataIndex: 'item',
        align: 'left',
        width: commonWidth.item,
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
        title: 'Brand',
        dataIndex: 'brand',
        align: 'left',
        width: commonWidth.brand,
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
        title: 'BOME',
        dataIndex: 'bomeBomco',
        align: 'right',
        width: commonWidth.bomeBomco,
        sorter: true
    },
    {
        title: 'SW',
        dataIndex: 'swroyalty',
        align: 'right',
        width: commonWidth.swroyalty,
        sorter: true
    },
    {
        title: 'MVA',
        dataIndex: 'mva',
        align: 'right',
        width: commonWidth.mva,
        sorter: true
    },
    {
        title: 'Comp Warr',
        dataIndex: 'compwarr',
        align: 'right',
        width: commonWidth.compwarr,
        sorter: true
    },
    {
        title: 'STD',
        dataIndex: 'stdcost',
        align: 'right',
        width: commonWidth.stdcost,
        sorter: true
    },
    {
        title: 'Calculate By',
        dataIndex: 'sysCreatedBy',
        align: 'left',
        width: commonWidth.sysCreatedBy,
        sorter: true
    },
    {
        title: 'Calculate Date',
        dataIndex: 'sysCreatedDate',
        align: 'left',
        width: commonWidth.sysCreatedDate,
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
        label: 'item',
        decorator: 'item',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input item'
    },
    {
        label: 'priceMask',
        decorator: 'priceMask',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input priceMask'
    },
    {
        label: 'swroyalty',
        decorator: 'swroyalty',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input swroyalty'
    },
    {
        label: 'mva',
        decorator: 'mva',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input mva'
    },
    {
        label: 'glOutfrt',
        decorator: 'glOutfrt',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input glOutfrt'
    },
    {
        label: 'glDomfrt',
        decorator: 'glDomfrt',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input glDomfrt'
    },
    {
        label: 'ogc',
        decorator: 'ogc',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input ogc'
    },
    {
        label: 'bomeBomco',
        decorator: 'bomeBomco',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input bomeBomco'
    },
    {
        label: 'stdcost',
        decorator: 'stdcost',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input stdcost'
    },
    {
        label: 'costTapeForFa',
        decorator: 'costTapeForFa',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input costTapeForFa'
    },
    {
        label: 'bomlBomco',
        decorator: 'bomlBomco',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input bomlBomco'
    },
    {
        label: 'quotation',
        decorator: 'quotation',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input quotation'
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
        label: 'plant',
        decorator: 'plant',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input plant'
    },
    {
        label: 'brand',
        decorator: 'brand',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input brand'
    },
    {
        label: 'prodFamily',
        decorator: 'prodFamily',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input prodFamily'
    },
    {
        label: 'subgeo',
        decorator: 'subgeo',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input subgeo'
    },
    {
        label: 'country',
        decorator: 'country',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input country'
    },
    {
        label: 'eccPlant',
        decorator: 'eccPlant',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input eccPlant'
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
        label: 'ifrt',
        decorator: 'ifrt',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input ifrt'
    },
    {
        label: 'vaoCost',
        decorator: 'vaoCost',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input vaoCost'
    },
    {
        label: 'duty',
        decorator: 'duty',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input duty'
    },
    {
        label: 'devcost',
        decorator: 'devcost',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input devcost'
    },
    {
        label: 'compwarr',
        decorator: 'compwarr',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'dropDown',
        text: '',
        dropDownList: [],
        message: 'Please input compwarr'
    },
]

let filter_langEn = [
    {
        index: 1,
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
        index: 2,
        label: 'Product Family',
        decorator: 'prodFamily',
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
        label: 'Category',
        decorator: 'category',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: 'BOTH',
        dropDownList: []
    }
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
