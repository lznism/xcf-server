const Router = require('koa-router');
const searchRoute = new Router();
const searchService = require('../service/search');

searchRoute.get('/search/:keywords', async (ctx, next) => {
	let keywords = ctx.params.keywords;
	let data = await searchService(keywords)
		.then(res => res)
		.catch(err => err);
	ctx.body = data;
});

module.exports = searchRoute;