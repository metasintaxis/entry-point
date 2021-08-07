const express = require('express');
const path = require('path');

const app = express();

const port = 5000; 

app.set('port', process.env.PORT || port);

app.use('/app', express.static(path.join(__dirname, '../../client/')));
app.use('/app/*', express.static(path.join(__dirname, '../../client/')));

app.get('/*', (request, response) => {
	response.redirect('/app');
});

app.listen(app.get('port'), function () {
	console.log(`App listening at the port ${port}!`);
});
