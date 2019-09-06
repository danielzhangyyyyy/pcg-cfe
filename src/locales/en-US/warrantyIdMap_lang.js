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
        title: 'Warranty ID',
        dataIndex: 'basewarranty',
        align: 'left',
        width: commonWidth.basewarranty,
        sorter: true
    },
    {
        title: 'Ph Code',
        dataIndex: 'phCode',
        align: 'left',
        width: commonWidth.prodH,
        sorter: true
    },
    {
        title: 'Warranty Code',
        dataIndex: 'warrantyCode',
        align: 'left',
        width: commonWidth.warrantyCode,
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
const editAndDetail_langEn =[
    {
        label: 'productGroup',
        decorator: 'productGroup',
        required: true,
        message: 'Please input productGroup'
    },
    {
        label: 'basewarranty',
        decorator: 'basewarranty',
        required: true,
        message: 'Please input basewarranty'
    },
    {
        label: 'brand',
        decorator: 'brand',
        required: true,
        message: 'Please input brand'
    },
    {
        label: 'warrantyCode',
        decorator: 'warrantyCode',
        required: true,
        message: 'Please input warrantyCode'
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
        label: 'sysLastModifiedDate',
        decorator: 'sysLastModifiedDate',
        required: true,
        message: 'Please input sysLastModifiedDate'
    },
    {
        label: 'sysLastModifiedBy',
        decorator: 'sysLastModifiedBy',
        required: true,
        message: 'Please input sysLastModifiedBy'
    },
    {
        label: 'phCode',
        decorator: 'phCode',
        required: true,
        message: 'Please input phCode'
    },
]

let filter_langEn = [
    {
        index: 0,
        label: 'Brand',
        decorator: 'brand',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropdownlist: []
    },
    {
        index: 1,
        label: 'Warranty ID',
        decorator: 'basewarranty',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropdownlist: []
    },
    {
        index: 2,
        label: 'Warranty Code',
        decorator: 'warrantyCode',
        required: false,
        allowClear: true,
        message: 'Please select',
        placeHolder: 'Please select',
        inputType: 'dropDown',
        text: '',
        dropdownlist: []
    }
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn,
    filter_langEn
}
