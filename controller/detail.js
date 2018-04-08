const Router = require('koa-router');
const detailRoute = new Router();
const detailService = require('../service/detail');

detailRoute.get('/detail/:id', async (ctx, next) => {
	let id = ctx.params.id;
	let data = await detailService(id)
		.then(res => res)
		.catch(err => err);
	ctx.body = data;
});

module.exports = detailRoute;