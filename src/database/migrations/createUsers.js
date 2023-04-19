const createUsers = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT (strftime('%d-%m-%Y %H:%M:%S', 'now', 'localtime')),
    updated_at TIMESTAMP DEFAULT (strftime('%d-%m-%Y %H:%M:%S', 'now', 'localtime'))
    );`





module.exports = {
    createUsers,

}
