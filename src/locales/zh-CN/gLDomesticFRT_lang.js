// list页面表头
const tableTitle_langZh = [
    {
        fixed: 'left',
    },
    {
        title: 'CYCLE',
        dataIndex: 'cycle',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'PRODUCT_GROUP',
        dataIndex: 'productGroup',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'BRAND',
        dataIndex: 'brand',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'DC',
        dataIndex: 'dc',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'GEO_TYPE',
        dataIndex: 'geoType',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'GEO',
        dataIndex: 'geo',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'PROD_FAMILY',
        dataIndex: 'prodFamily',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'FEE',
        dataIndex: 'fee',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'RATE',
        dataIndex: 'rate',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'SYS_LAST_MODIFIED_BY',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'SYS_LAST_MODIFIED_DATE',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: 300,
        sorter: true
    },
]

//edit页面
const editAndDetail_langZh =[
    {
        label: 'CYCLE',
        decorator: 'cycle',
        required: true,
        message: '请输入CYCLE'
    },
    {
        label: 'PRODUCT_GROUP',
        decorator: 'productGroup',
        required: true,
        message: '请输入PRODUCT_GROUP'
    },
    {
        label: 'BRAND',
        decorator: 'brand',
        required: true,
        message: '请输入BRAND'
    },
    {
        label: 'DC',
        decorator: 'dc',
        required: true,
        message: '请输入DC'
    },
    {
        label: 'GEO_TYPE',
        decorator: 'geoType',
        required: true,
        message: '请输入GEO_TYPE'
    },
    {
        label: 'GEO',
        decorator: 'geo',
        required: true,
        message: '请输入GEO'
    },
    {
        label: 'PROD_FAMILY',
        decorator: 'prodFamily',
        required: true,
        message: '请输入PROD_FAMILY'
    },
    {
        label: 'FEE',
        decorator: 'fee',
        required: true,
        message: '请输入FEE'
    },
    {
        label: 'RATE',
        decorator: 'rate',
        required: true,
        message: '请输入RATE'
    },
    {
        label: 'SYS_LAST_MODIFIED_BY',
        decorator: 'sysLastModifiedBy',
        required: true,
        message: '请输入SYS_LAST_MODIFIED_BY'
    },
    {
        label: 'SYS_LAST_MODIFIED_DATE',
        decorator: 'sysLastModifiedDate',
        required: true,
        message: '请输入SYS_LAST_MODIFIED_DATE'
    },
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh
}