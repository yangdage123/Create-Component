module.exports = {
    baseUrl: 'src/component',
    fileUrl: 'statistical/collection-mission-board',
    headerClass: 'styles.header_wrap_view',
    headers: [{
        label: '商品编码',
        type: 'Input',
        bind: 'a',
    }],
    list: {
        columns: [{
                title: '',
                dataIndex: '',
            },

            {
                title: '',
                dataIndex: '',
            }
        ],
    },
    saga: 'pda',
};