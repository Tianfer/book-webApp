const mysql = require('mysql')
const pool = mysql.createPool({
	host: '127.0.0.1',
	user: 'root',
	password: '12345678',
	database: 'book'
})

let query = function(sql) {
	return new Promise((resolve, reject) => {
		pool.getConnection(function(err, connection) {
			if(err) {
				reject(err)
			} else {
				connection.query(sql, (err, results, field) => {
					if(err) {
						reject(err)
					} else {
						resolve(results)
					}
					connection.release()
				})
			}
		})
	})
}

module.exports = query