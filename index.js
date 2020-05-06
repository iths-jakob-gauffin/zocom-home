const { app } = require('./core');

/* CODE YOUR API HERE */
// Auth middleware = check api key
app.use((req, res, next) => {
	if (req.url === '/' || req.url === '/init' || req.url === '/stream') {
		next();
	} else {
		console.log(req.url);

		//Kika i headers om api key finns.
		let reqApiKey = req.headers['authorization'];
		console.log('OUTPUT ÄR: reqApiKey', reqApiKey);

		//Matchar den nyckeln den som finns sparad i databasen.
		//DEN HÄR GER TILLBAka en array med keys
		let dbKeys = db.get('keys').value();

		//Om ja - kör next.
		if (dbKeys.includes(reqApiKey)) {
			next();
		} else {
			// Om nej så kör vi res.status(500).send("No api for you!")
			res.status(500).send('NO API FOR YOU!');
		}
	}
});

//Routes

const acRoute = require('./routes/acs');
const blindRoute = require('./routes/blinds');
const lightRoute = require('./routes/lights');
const lockRoute = require('./routes/locks');
const cameraRoute = require('./routes/cameras');
const vacuumRoute = require('./routes/vacuums');

// remote > API > db > update > frontend
app.use('/acs', acRoute);
app.use('/blinds', blindRoute);
app.use('/lights', lightRoute);
app.use('/locks', lockRoute);
app.use('/cameras', cameraRoute);
app.use('/vacuums', vacuumRoute);

app.listen(3000, () => {
	console.log('API for smart home 1.1 up n running.');
});
