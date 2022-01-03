var config = {
    development: {
        // url: 
        database: {
            host: 'localhost',
            username: 'root',
            password: 'password',
            port: 3306,
            db: 'boba'
        },
        server: {
            host: 'localhost',
            port: 3000
        }
    },
    production: {
        // url: 
        database: {
            host: 'localhost',
            port: 3306,
            db: 'boba'
        },
        server: {
            host: 'localhost',
            port: 3000
        }
    }
}

module.exports = config;