// const axios = require('axios');
// const xml2js = require('xml2js');

// const rssConfig = {
// 	urlList: [
// 		'https://hacks.mozilla.org/feed/',
// 		'https://developer.ibm.com/docloud/blog/feed/',
// 		'https://developer.salesforce.com/blogs/feed'
// 	]
// };

// const parseXml = (XmlString) => {
// 	const promise = new Promise((resolve, reject) => {
// 		xml2js.parseString(XmlString, (error, result) => {
// 			if (error) {
// 				reject(error);
// 			} else {
// 				resolve(result);
// 			}
// 		});
// 	});

// 	return promise;
// };

// const fetchStoriesRouter = (req, res) => {
// 	const feedsUrl = rssConfig.urlList;
// 	let promiseValues = null;
// 	let responseValues = new Array();

// 	const calloutPromises = feedsUrl.map((url) => {
// 		const promise = axios.get(url);
// 		return promise;
// 	});

// 	Promise.all(calloutPromises).then((responses) => {
// 		promiseValues = responses.map((response) => {
// 			return parseXml(response.data);
// 		});

// 		Promise.all(promiseValues).then((feedChannels) => {
// 			responseValues = feedChannels.map((channel) => {
// 				return channel;
// 			});

// 			res.send(responseValues);
// 		});
// 	});
// };

// exports.fetchStoriesRouter = fetchStoriesRouter;
