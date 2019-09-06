// list页面表头
const tableTitle_langZh = [
    {
        fixed: 'left',
    },
    {
        title: 'PRODUCT_GROUP',
        dataIndex: 'productGroup',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'PLANT',
        dataIndex: 'plant',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'PLANT_TYPE',
        dataIndex: 'plantType',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'PLANT_DESC',
        dataIndex: 'plantDesc',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'ACTION',
        dataIndex: 'action',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'STATUS',
        dataIndex: 'status',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'SYS_CREATED_DATE',
        dataIndex: 'sysCreatedDate',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'SYS_CREATED_BY',
        dataIndex: 'sysCreatedBy',
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
    {
        title: 'SYS_LAST_MODIFIED_BY',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'PLANT_COUNTRY',
        dataIndex: 'plantCountry',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'MM_PLANT',
        dataIndex: 'mmPlant',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'PLANT_CITY',
        dataIndex: 'plantCity',
        align: 'left',
        width: 300,
        sorter: true
    },
]

//edit页面
const editAndDetail_langZh =[
    {
        label: 'PRODUCT_GROUP',
        decorator: 'productGroup',
        required: true,
        message: '请输入PRODUCT_GROUP'
    },
    {
        label: 'PLANT',
        decorator: 'plant',
        required: true,
        message: '请输入PLANT'
    },
    {
        label: 'PLANT_TYPE',
        decorator: 'plantType',
        required: true,
        message: '请输入PLANT_TYPE'
    },
    {
        label: 'PLANT_DESC',
        decorator: 'plantDesc',
        required: true,
        message: '请输入PLANT_DESC'
    },
    {
        label: 'ACTION',
        decorator: 'action',
        required: true,
        message: '请输入ACTION'
    },
    {
        label: 'STATUS',
        decorator: 'status',
        required: true,
        message: '请输入STATUS'
    },
    {
        label: 'SYS_CREATED_DATE',
        decorator: 'sysCreatedDate',
        required: true,
        message: '请输入SYS_CREATED_DATE'
    },
    {
        label: 'SYS_CREATED_BY',
        decorator: 'sysCreatedBy',
        required: true,
        message: '请输入SYS_CREATED_BY'
    },
    {
        label: 'SYS_LAST_MODIFIED_DATE',
        decorator: 'sysLastModifiedDate',
        required: true,
        message: '请输入SYS_LAST_MODIFIED_DATE'
    },
    {
        label: 'SYS_LAST_MODIFIED_BY',
        decorator: 'sysLastModifiedBy',
        required: true,
        message: '请输入SYS_LAST_MODIFIED_BY'
    },
    {
        label: 'PLANT_COUNTRY',
        decorator: 'plantCountry',
        required: true,
        message: '请输入PLANT_COUNTRY'
    },
    {
        label: 'MM_PLANT',
        decorator: 'mmPlant',
        required: true,
        message: '请输入MM_PLANT'
    },
    {
        label: 'PLANT_CITY',
        decorator: 'plantCity',
        required: true,
        message: '请输入PLANT_CITY'
    },
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh
}