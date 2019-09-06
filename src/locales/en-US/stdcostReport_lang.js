let filter_langEn = [{
    index: 0,
    label: 'Cycle',
    decorator: 'cycle',
    required: true,
    allowClear: false,
    message: 'Please select cycle',
    placeHolder: 'Cycle',
    inputType: 'dropDown',
    dropDownList: [],
    text: 'CURRENT'
}, {
    index: 1,
    label: 'Brand',
    decorator: 'brand',
    required: false,
    allowClear: true,
    message: 'Please select brand',
    placeHolder: 'Brand',
    inputType: 'dropDown',
    dropDownList: [],
    // text: ''
}, {
    index: 2,
    label: 'Product Family',
    decorator: 'prodFamily',
    required: false,
    allowClear: true,
    message: 'Please select product family',
    placeHolder: 'Product Family',
    inputType: 'dropDown',
    dropDownList: [],
    // text: ''
}, {
    index: 3,
    label: 'Plant',
    decorator: 'plant',
    required: false,
    allowClear: true,
    message: 'Please select Plant',
    placeHolder: 'Plant',
    inputType: 'dropDown',
    dropDownList: [],
    // text: ''
}, {
    index: 4,
    label: 'Subgeo',
    decorator: 'subgeo',
    required: false,
    allowClear: true,
    message: 'Please select Subgeo',
    placeHolder: 'Subgeo',
    inputType: 'dropDown',
    dropDownList: [],
    // text: ''
}, {
    index: 5,
    label: 'Category',
    decorator: 'category',
    required: true,
    allowClear: false,
    message: 'Please select Category',
    placeHolder: 'Category',
    inputType: 'dropDown',
    dropDownList: [],
    text: 'Both_WB'
}]

export default {
    filter_langEn
}
