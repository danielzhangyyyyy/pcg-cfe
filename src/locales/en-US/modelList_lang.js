import commonWidth from "./columnCommonWidth_lang.js"

const deltaSize = commonWidth.deltaSize
// list页面表头
const tableTitle_langEn = [
    {
        title: 'Brand',
        dataIndex: 'brand',
        align: 'left',
        width: commonWidth.brand,
        sorter: true
    },
    {
        title: 'Product Family',
        dataIndex: 'aspPrdFamily',
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
        title: 'Description',
        dataIndex: 'itemDesc',
        align: 'left',
        width: commonWidth.itemDesc,
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
        title: 'Subgeo',
        dataIndex: 'subgeo',
        align: 'left',
        width: commonWidth.subgeo,
        sorter: true
    },
    {
        title: 'Country/ Region',
        dataIndex: 'country',
        align: 'left',
        width: commonWidth.country,
        sorter: true
    },
    {
        title: 'Bom Plant',
        dataIndex: 'bomPlant',
        align: 'left',
        width: commonWidth.bomPlant,
        sorter: true
    },
    {
        title: 'Item Type',
        dataIndex: 'itemType',
        align: 'left',
        width: commonWidth.itemType,
        sorter: true
    },
    {
        title: 'Last Modified Date',
        dataIndex: 'sysLastModifiedDate',
        align: 'right',
        width: commonWidth.sysLastModifiedDate,
        sorter: true
    }
]

let filter_langEn = [
    {
        index: 1,
        label: 'ITEM',
        decorator: 'item',
        required: true,
        allowClear: true,
        editDisabled: false,
        message: 'Please input',
        placeHolder: 'eg: SN20F22189;0000000VC304;',
        inputType: 'input',
        text: ''
    }
]

export default {
    deltaSize,
    tableTitle_langEn,
    filter_langEn
}
