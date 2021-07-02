const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use('/app', express.static(path.join(__dirname, '../client/')));
app.use('/app/*', express.static(path.join(__dirname, '../client/')));
app.get('/', (request, response) => {
	response.redirect('/app');
});

app.listen(app.get('port'), function () {
	console.log('App listening at the port 3000!');
});
