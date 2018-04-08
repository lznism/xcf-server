const Router = require('koa-router');
const exploreRoute = new Router();
const exploreService = require('../service/explore');

exploreRoute.get('/explore/:type', async (ctx, next) => {
	let type = ctx.params.type;
	let data = await exploreService(type)
		.then(res => res)
		.catch(err => err);
	ctx.body = data;
});

module.exports = exploreRoute;