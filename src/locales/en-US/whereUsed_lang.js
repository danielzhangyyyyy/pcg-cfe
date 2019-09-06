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
        title: 'Top Level',
        dataIndex: 'topLevel',
        align: 'left',
        width: commonWidth.item,
        sorter: true
    },
    {
        title: 'Top Level Type',
        dataIndex: 'topLevelType',
        align: 'left',
        width: commonWidth.itemType,
        sorter: true
    },
    {
        title: 'Part Number',
        dataIndex: 'partNumber',
        align: 'left',
        width: commonWidth.item,
        sorter: true
    },
    {
        title: 'Description',
        dataIndex: 'description',
        align: 'left',
        width: commonWidth.description,
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
    },
  
 ]

 let filter_langEn = [{
    index: 0,
    label: 'Part',
    decorator: 'partNumber',
    required: true,
    allowClear: true,
    message: 'Please input item',
    placeHolder: 'Please input',
    inputType: 'input',
    text: ''
},{
//     index: 1,
//     label: 'Cycle',
//     decorator: 'cycle',
//     required: true,
//     allowClear: true,
//     message: 'Please select cycle',
//     placeHolder: 'Please select',
//     inputType: 'dropDown',
//     text: 'CURRENT',
//     dropDownList: [],
// },{
    index: 2,
    label: 'Brand',
    decorator: 'brand',
    required: false,
    allowClear: true,
    message: 'Please select brand',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    text: ''
},{
    index: 3,
    label: 'Product Family',
    decorator: 'prodFamily',
    required: false,
    allowClear: true,
    message: 'Please select product family',
    placeHolder: 'Please select',
    inputType: 'dropDown',
    dropDownList: [],
    text: ''
}]

export default {
    deltaSize,
    tableTitle_langEn,
    filter_langEn
    // editAndDetail_langEn
}
