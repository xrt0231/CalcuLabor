require('dotenv').config();

const { PORT_TEST, PORT, NODE_ENV, API_VERSION } = process.env;

//Express Initiation
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const fetch = require('node-fetch');

const Quagga = require('quagga').default;

app.use(express.static('public'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

//API routes
app.use('/api/' + API_VERSION,
	[
		require('./server/routes/dashboard_route'),
		require('./server/routes/hour_route'),
		require('./server/routes/schedule_route'),
		require('./server/routes/standard_route'),
		require('./server/routes/user_route'),
		require('./server/routes/production_route')
	]
);

// Page not found
app.use(function (req, res, next) {
	res.status(404).sendFile(__dirname + '/public/404.html');
});

// Error handling
app.use(function (err, req, res, next) {
	console.log(err);
	res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
	console.log('Listen to port: 3000');
});

module.exports = app;