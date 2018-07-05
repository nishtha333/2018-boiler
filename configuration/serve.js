/* eslint-disable no-console */
const chalk = require('chalk');
const express = require('express');
const http = require('http');
const path = require('path');
const notifier = require('node-notifier');
const expressStaticGzip = require('express-static-gzip');
const { applicationName } = require('../boilerconfig');

const app = express();
const server = http.createServer(app);
const rootPath = process.cwd();

const PORT = 6969;

const publicPath = path.join(rootPath, './dist');

app.get('/*', (req, res, next) => {
	if (req.originalUrl) {
		console.log(chalk.green('Request made by client to: '), chalk.cyan(`http://localhost:${PORT}${req.originalUrl}`));
	}

	next();
});

app.use(expressStaticGzip(publicPath));

server.listen(PORT, () => {
	console.log(chalk.green(`${applicationName} has begun serving files on PORT ${PORT}.`));
	notifier.notify({
		title: `${applicationName}`,
		message: `${applicationName}'s on port ${PORT}.`,
		sound: true,
	});
});

console.log(chalk.green('Reached end of Server Setup!'));