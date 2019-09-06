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
        title: 'ITEM',
        dataIndex: 'item',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'PRICE_MASK',
        dataIndex: 'priceMask',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'SWROYALTY',
        dataIndex: 'swroyalty',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'MVA',
        dataIndex: 'mva',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'GL_OUTFRT',
        dataIndex: 'glOutfrt',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'GL_DOMFRT',
        dataIndex: 'glDomfrt',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'OGC',
        dataIndex: 'ogc',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'BOME_BOMCO',
        dataIndex: 'bomeBomco',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'STDCOST',
        dataIndex: 'stdcost',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'COST_TAPE_FOR_FA',
        dataIndex: 'costTapeForFa',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'BOML_BOMCO',
        dataIndex: 'bomlBomco',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'QUOTATION',
        dataIndex: 'quotation',
        align: 'right',
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
        title: 'PLANT',
        dataIndex: 'plant',
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
        title: 'PROD_FAMILY',
        dataIndex: 'prodFamily',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'SUBGEO',
        dataIndex: 'subgeo',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'COUNTRY',
        dataIndex: 'country',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'ECC_PLANT',
        dataIndex: 'eccPlant',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'CURRENCY_NAME',
        dataIndex: 'currencyName',
        align: 'left',
        width: 300,
        sorter: true
    },
    {
        title: 'IFRT',
        dataIndex: 'ifrt',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'VAO_COST',
        dataIndex: 'vaoCost',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'DUTY',
        dataIndex: 'duty',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'DEVCOST',
        dataIndex: 'devcost',
        align: 'right',
        width: 300,
        sorter: true
    },
    {
        title: 'COMPWARR',
        dataIndex: 'compwarr',
        align: 'right',
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
        label: 'ITEM',
        decorator: 'item',
        required: true,
        message: '请输入ITEM'
    },
    {
        label: 'PRICE_MASK',
        decorator: 'priceMask',
        required: true,
        message: '请输入PRICE_MASK'
    },
    {
        label: 'SWROYALTY',
        decorator: 'swroyalty',
        required: true,
        message: '请输入SWROYALTY'
    },
    {
        label: 'MVA',
        decorator: 'mva',
        required: true,
        message: '请输入MVA'
    },
    {
        label: 'GL_OUTFRT',
        decorator: 'glOutfrt',
        required: true,
        message: '请输入GL_OUTFRT'
    },
    {
        label: 'GL_DOMFRT',
        decorator: 'glDomfrt',
        required: true,
        message: '请输入GL_DOMFRT'
    },
    {
        label: 'OGC',
        decorator: 'ogc',
        required: true,
        message: '请输入OGC'
    },
    {
        label: 'BOME_BOMCO',
        decorator: 'bomeBomco',
        required: true,
        message: '请输入BOME_BOMCO'
    },
    {
        label: 'STDCOST',
        decorator: 'stdcost',
        required: true,
        message: '请输入STDCOST'
    },
    {
        label: 'COST_TAPE_FOR_FA',
        decorator: 'costTapeForFa',
        required: true,
        message: '请输入COST_TAPE_FOR_FA'
    },
    {
        label: 'BOML_BOMCO',
        decorator: 'bomlBomco',
        required: true,
        message: '请输入BOML_BOMCO'
    },
    {
        label: 'QUOTATION',
        decorator: 'quotation',
        required: true,
        message: '请输入QUOTATION'
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
        label: 'PLANT',
        decorator: 'plant',
        required: true,
        message: '请输入PLANT'
    },
    {
        label: 'BRAND',
        decorator: 'brand',
        required: true,
        message: '请输入BRAND'
    },
    {
        label: 'PROD_FAMILY',
        decorator: 'prodFamily',
        required: true,
        message: '请输入PROD_FAMILY'
    },
    {
        label: 'SUBGEO',
        decorator: 'subgeo',
        required: true,
        message: '请输入SUBGEO'
    },
    {
        label: 'COUNTRY',
        decorator: 'country',
        required: true,
        message: '请输入COUNTRY'
    },
    {
        label: 'ECC_PLANT',
        decorator: 'eccPlant',
        required: true,
        message: '请输入ECC_PLANT'
    },
    {
        label: 'CURRENCY_NAME',
        decorator: 'currencyName',
        required: true,
        message: '请输入CURRENCY_NAME'
    },
    {
        label: 'IFRT',
        decorator: 'ifrt',
        required: true,
        message: '请输入IFRT'
    },
    {
        label: 'VAO_COST',
        decorator: 'vaoCost',
        required: true,
        message: '请输入VAO_COST'
    },
    {
        label: 'DUTY',
        decorator: 'duty',
        required: true,
        message: '请输入DUTY'
    },
    {
        label: 'DEVCOST',
        decorator: 'devcost',
        required: true,
        message: '请输入DEVCOST'
    },
    {
        label: 'COMPWARR',
        decorator: 'compwarr',
        required: true,
        message: '请输入COMPWARR'
    },
]

export default {
    tableTitle_langZh,
    editAndDetail_langZh
}