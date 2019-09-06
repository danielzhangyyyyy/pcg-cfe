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
        dataIndex: 'prodFamily',
        align: 'left',
        width: commonWidth.prodFamily,
        sorter: true
    },
    {
        title: 'Machine Type',
        dataIndex: 'machineType',
        align: 'left',
        width: commonWidth.machineType,
        sorter: true
    },
    {
        title: 'Weight (kg)',
        dataIndex: 'weight',
        align: 'right',
        width: commonWidth.weight,
        sorter: true
    },
    {
        title: 'Created By',
        dataIndex: 'sysCreatedBy',
        align: 'left',
        width: commonWidth.sysCreatedBy,
        sorter: true
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        sorter: true
    }
]

export default {
    deltaSize,
    tableTitle_langEn
}
