const api = require("./connectdatabase");

module.exports = function (app) {
	app.get('/show', async (req, res) => {
		try {
			const iduser =  await api(`select user_id from test`)
			res.send(iduser)
		}
		catch (error) {
			res.status(400).json({ error: error.message });
		}
	})
}



