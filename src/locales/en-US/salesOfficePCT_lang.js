import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        fixed: 'left',
    },
    {
        title: 'Country/ Region',
        dataIndex: 'country',
        align: 'left',
        width: commonWidth.country,
        sorter: true,
        scopedSlots: { customRender: 'country' },
    },
    {
        title: 'Country/Region Name',
        dataIndex: 'countryName',
        align: 'left',
        width: commonWidth.countryName,
        sorter: true,
        scopedSlots: { customRender: 'countryName' },
    },
    {
        title: 'Sales Org',
        dataIndex: 'salesOrg',
        align: 'left',
        width: commonWidth.salesOrg,
        sorter: true,
        scopedSlots: { customRender: 'salesOrg' },
    },
    {
        title: 'Sales Office',
        dataIndex: 'salesOffice',
        align: 'left',
        width: commonWidth.salesOffice,
        sorter: true,
        scopedSlots: { customRender: 'salesOffice' },
    },
    {
        title: 'Sales Percentage',
        dataIndex: 'salesOfficePct',
        align: 'right',
        width: commonWidth.percentage,
        sorter: true,
        scopedSlots: { customRender: 'salesOfficePct' },
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        sorter: true,
        scopedSlots: { customRender: 'sysLastModifiedBy' },
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        sorter: true,
        scopedSlots: { customRender: 'sysLastModifiedDate' },
    },
    {
        title: '',
        dataIndex: 'operation',
        align: 'center',
        width: 60,
        scopedSlots: { customRender: 'operation' },
    }
]

//edit页面
const editAndDetail_langEn = [
    {
        label: 'country',
        decorator: 'country',
        required: true,
        message: 'Please input country'
    },
    {
        label: 'currency',
        decorator: 'currency',
        required: true,
        message: 'Please input currency'
    },
    {
        label: 'countryName',
        decorator: 'countryName',
        required: true,
        message: 'Please input countryName'
    },
    {
        label: 'salesOrg',
        decorator: 'salesOrg',
        required: true,
        message: 'Please input salesOrg'
    },
    {
        label: 'salesOffice',
        decorator: 'salesOffice',
        required: true,
        message: 'Please input salesOffice'
    },
    {
        label: 'salesOfficePct',
        decorator: 'salesOfficePct',
        required: true,
        message: 'Please input salesOfficePct'
    },
    {
        label: 'countrySalesorgType',
        decorator: 'countrySalesorgType',
        required: true,
        message: 'Please input countrySalesorgType'
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
        label: 'isLegacy',
        decorator: 'isLegacy',
        required: true,
        message: 'Please input isLegacy'
    },
]

export default {
    deltaSize,
    tableTitle_langEn,
    editAndDetail_langEn
}