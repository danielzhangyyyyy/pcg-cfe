// list页面表头
const tableTitle_langZh = [
    {
        fixed: 'left',
    },
    {
        title: 'COUNTRY',
        dataIndex: 'country',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'CURRENCY',
        dataIndex: 'currency',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'COUNTRY_NAME',
        dataIndex: 'countryName',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'SALES_ORG',
        dataIndex: 'salesOrg',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'SALES_OFFICE',
        dataIndex: 'salesOffice',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'SALES_OFFICE_PCT',
        dataIndex: 'salesOfficePct',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'COUNTRY_SALESORG_TYPE',
        dataIndex: 'countrySalesorgType',
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
        title: 'IS_LEGACY',
        dataIndex: 'isLegacy',
        align: 'left',
        width: 300,
        sorter: true
    },
]

//edit页面
const editAndDetail_langZh =[
    {
        label: 'COUNTRY',
        decorator: 'country',
        required: true,
        message: '请输入COUNTRY'
    },
    {
        label: 'CURRENCY',
        decorator: 'currency',
        required: true,
        message: '请输入CURRENCY'
    },
    {
        label: 'COUNTRY_NAME',
        decorator: 'countryName',
        required: true,
        message: '请输入COUNTRY_NAME'
    },
    {
        label: 'SALES_ORG',
        decorator: 'salesOrg',
        required: true,
        message: '请输入SALES_ORG'
    },
    {
        label: 'SALES_OFFICE',
        decorator: 'salesOffice',
        required: true,
        message: '请输入SALES_OFFICE'
    },
    {
        label: 'SALES_OFFICE_PCT',
        decorator: 'salesOfficePct',
        required: true,
        message: '请输入SALES_OFFICE_PCT'
    },
    {
        label: 'COUNTRY_SALESORG_TYPE',
        decorator: 'countrySalesorgType',
        required: true,
        message: '请输入COUNTRY_SALESORG_TYPE'
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
        label: 'IS_LEGACY',
        decorator: 'isLegacy',
        required: true,
        message: '请输入IS_LEGACY'
    },
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh
}