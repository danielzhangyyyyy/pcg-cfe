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
        dataIndex: 'prdFamily',
        align: 'left',
        width: commonWidth.prodFamily,
        sorter: true
    },
    {
        title: 'Item',
        dataIndex: 'item',
        align: 'left',
        width: commonWidth.item,
        sorter: true
    },
    {
        title: 'Item Desc',
        dataIndex: 'itemDesc',
        align: 'left',
        width: commonWidth.itemDesc,
        sorter: true
    },
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'productGroup',
        decorator: 'productGroup',
        required: true,
        message: 'Please input productGroup'
    },
    {
        label: 'item',
        decorator: 'item',
        required: true,
        message: 'Please input item'
    },
    {
        label: 'brand',
        decorator: 'brand',
        required: true,
        message: 'Please input brand'
    },
    {
        label: 'prdFamily',
        decorator: 'prdFamily',
        required: true,
        message: 'Please input prdFamily'
    },
    {
        label: 'itemDesc',
        decorator: 'itemDesc',
        required: true,
        message: 'Please input itemDesc'
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
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn
}