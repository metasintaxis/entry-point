// const axios = require('axios');

// const projectsConfig = {
// 	orgReposUrl: 'https://api.github.com/orgs/ANAGRAMA-PROJECT/repos'
// };

// const fetchProjectRepos = async (req, res) => {
// 	let projects = [];
// 	const responses = await axios.get(projectsConfig.orgReposUrl);
// 	const repositories = responses.data;

// 	const topicPromises = repositories.map((repository) => {
// 		const urlTopics = `https://api.github.com/repos/${repository.owner.login}/${repository.name}/topics`;
// 		const promise = axios.get(urlTopics, {
// 			headers: {
// 				Accept: 'application/vnd.github.mercy-preview+json'
// 			}
// 		});
// 		return promise;
// 	});

// 	Promise.all(topicPromises).then((responses) => {
// 		for (const repository of repositories) {
// 			const project = { ...repository };

// 			const currentTopicsResponse = responses.filter((response) => {
// 				return response.config.url.includes(repository.owner.login);
// 			});

// 			project.__topics = currentTopicsResponse[0].data.names;
// 			projects.push(project);

// 			res.send(projects);
// 		}
// 	});
// };

// exports.fetchProjectRepos = fetchProjectRepos;
