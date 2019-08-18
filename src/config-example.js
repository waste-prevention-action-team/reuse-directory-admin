const CONFIG = {
    site_title: 'Reuse Directory Admin',
    admin_users: ['<admin-email>@gmail.com'],
    google_api_key: '',
    google_oauth_client_id: '',
    google_sheet_id: '',
    google_sheet_schema: {
        items: {
            sheetIndex: 0,
            sheetName: 'Items',
            columns: 'A:E',
            searchableColumns: [1, 2, 3]
        },
        locations: {
            sheetIndex: 1,
            sheetName: 'Locations',
            columns: 'A:J',
            searchableColumns: []
        },
        relations: {
            sheetIndex: 2,
            sheetName: 'Relations',
            columns: 'A:H',
            fk_maps: {
                Items: 1,
                Locations: 1
            },
            searchableColumns: []
        },
        categories: {
            sheetIndex: 3,
            sheetName: 'Categories',
            columns: 'A:B'
        },
        resources: {
            sheetIndex: 4,
            sheetName: 'Resources',
            columns: 'A:C'
        }
    }
}

module.exports = CONFIG
