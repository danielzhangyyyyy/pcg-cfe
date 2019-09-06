import commonWidth from  "./columnCommonWidth_lang.js"
const deltaSize = commonWidth.deltaSize

const tableTitle_langEn = [
    {
        title: 'Cost Elem',
        dataIndex: 'costElem',
        align: 'left',
        width: commonWidth.costElem,
        // sorter: true,
    },
    {
        title: 'Base Currency',
        dataIndex: 'currencyName',
        align: 'left',
        width: commonWidth.baseCurrency,
        // sorter: true
    },
    {
        title: 'm1',
        dataIndex: 'm1',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm2',
        dataIndex: 'm2',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm3',
        dataIndex: 'm3',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm4',
        dataIndex: 'm4',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm5',
        dataIndex: 'm5',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm6',
        dataIndex: 'm6',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm7',
        dataIndex: 'm7',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm8',
        dataIndex: 'm8',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm9',
        dataIndex: 'm9',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm10',
        dataIndex: 'm10',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm11',
        dataIndex: 'm11',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'm12',
        dataIndex: 'm12',
        align: 'right',
        width: commonWidth.m,
        // sorter: true
    },
    {
        title: 'Last Modified By',
        dataIndex: 'sysLastModifiedBy',
        align: 'left',
        width: commonWidth.sysLastModifiedBy,
        // sorter: true
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'left',
        width: commonWidth.sysLastModifiedDate,
        // sorter: true
    }
]

const netCostBomModelList_langEn = [
    {
        title: 'Item',
        dataIndex: 'item',
        align: 'left',
        width: commonWidth.item,
        // sorter: true,
    },
    {
        title: 'Plant',
        dataIndex: 'plant',
        align: 'left',
        width: commonWidth.plant,
        // sorter: true,
    },
    {
        title: 'Country/ Region',
        dataIndex: 'country',
        align: 'left',
        width: commonWidth.country,
        // sorter: true,
    }
]

export default {
    deltaSize,
    tableTitle_langEn,
    netCostBomModelList_langEn
}
