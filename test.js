const { response } = require("express");

async function RegisterForm(req,res) {
	const respone = await fetch("http://localhost:8000/register", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data),
	});		
	return response.json()
}




