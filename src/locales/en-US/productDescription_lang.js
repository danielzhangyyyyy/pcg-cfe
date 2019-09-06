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
        title: 'Product Family',
        dataIndex: 'eccProdFamily',
        align: 'left',
        width: commonWidth.prodFamily,
        sorter: true
    },
    {
        title: 'Product',
        dataIndex: 'item',
        align: 'left',
        width: commonWidth.item,
        sorter: true
    },
    {
        title: 'Description',
        dataIndex: 'itemDesc',
        align: 'left',
        width: commonWidth.itemDesc,
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
    }
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'Brand',
        decorator: 'brand',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input brand'
    },
    {
        label: 'Product Family',
        decorator: 'eccProdFamily',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input Product Family'
    },
    {
        label: 'Product',
        decorator: 'item',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input Product'
    },
    {
        label: 'Description',
        decorator: 'itemDesc',
        required: false,
        allowClear: true,
        editDisabled: false,
        inputType: 'input',
        text: '',
        message: 'Please input Description'
    },
    {
        label: 'Last Modified Date',
        decorator: 'sysLastModifiedDate',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input sysLastModifiedDate'
    },
    {
        label: 'Last Modified By',
        decorator: 'sysLastModifiedBy',
        required: false,
        allowClear: true,
        editDisabled: true,
        inputType: 'input',
        text: '',
        message: 'Please input sysLastModifiedBy'
    }
]

let filter_langEn = [
    // {
    //     index: 1,
    //     label: 'Brand',
    //     decorator: 'brand',
    //     required: true,
    //     allowClear: true,
    //     editDisabled: false,
    //     message: 'Please select',
    //     placeHolder: 'Please select',
    //     inputType: 'dropDown',
    //     text: '',
    //     dropDownList: []
    // },
    // {
    //     index: 2,
    //     label: 'Product Family',
    //     decorator: 'eccProdFamily',
    //     required: true,
    //     allowClear: true,
    //     editDisabled: false,
    //     message: 'Please select',
    //     placeHolder: 'Please select',
    //     inputType: 'dropDown',
    //     text: '',
    //     dropDownList: []
    // },
    {
        index: 3,
        label: 'Product',
        decorator: 'item',
        required: false,
        allowClear: true,
        editDisabled: false,
        message: 'Please select',
        placeHolder: 'Please select',
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
