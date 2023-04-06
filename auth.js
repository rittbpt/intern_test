const api = require("./connectdatabase");
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (app) {
	app.get('/test', async (req, res) => {
		console.log(encrypt("1"))
	})

	app.post('/register', async (req, res) => {
		try {
			var check = 0
			const { username, password } = req.body
			if (username.trim() == "" || password.trim() == "") {
				check = 1
				res.send({ check })
				return
			}
			const users = await api(`select user_id from test where user_id ='${username}'`)
			if (users.length) {
				check = 2
				res.send({ check })
			}
			else {
				bcrypt.hash(password, saltRounds, async (err, hash) => {
					if (err) throw err;
					console.log(hash);
					if (hash) {
						await api(`insert into test (user_id, user_password) values ('${username}', '${hash}')`)
						check = 3
						res.send({ check })
					}
				});
			}

		}
		catch (error) {
			res.status(400).json({ error: error.message });
		}
	})

	app.post('/login', async (req, res) => {
		try {
			const { username, password } = req.body
			check = 0
			if (username == "" || password == "") {
				check = 1
				res.send({ check })
			}
			else {
				const users = await api(`select * from test where user_id ='${username}'`)
				bcrypt.compare(password, users[0].user_password, function (err, result) {
					if (result) {
						check = 2
						const token = JWT.sign(
							{
								username: users[0].user_id
							},
							"zuHbAry/7IrrSQaynzj4c8i8n1iO+CCqzdyeXgRNlfDdQBUJcX9yrYGc98fqp169/ELDSLwtvzebeQ0nf6WkOiXUhOdStRMhPykd/nJwEdmENXThvX9Map7k1gwvXvciZ48DYVc7nntfN82k+ZXSRX2+rTN8YEK3S7tP/0csBYdQwB6OS5FzMHM1gQvK3VX4QAlC6nDbvLsYOBqZcYsDlvlL/Uglw57wNNpLfwjQQC+zXBFvGnROVNLh//yyBl1kB+YmIZXrnkrUkNbLm7QteW+6nXUWZ1gQOEatjCr9NnYxaY4Ve0QABq0sHzifZ65Bz4HVFptun97VS4LSTJmxeQ==1"
							,
							{ expiresIn: "1h" }
						)
						res.send({
							check: check,
							token: token
						})
						return
					}
					else {
						res.send({ check,status: 200 })
					}
				});
			}
		}
		catch (error) {
			res.status(400).json({ error: error.message });
		}
	})
}



