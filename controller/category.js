const Router = require('koa-router');
const categoryRoute = new Router();
const categoryService = require('../service/category');

categoryRoute.get('/category', async (ctx, next) => {
	let data = await categoryService()
		.then(res => res)
		.catch(err => err);
	ctx.body = data;
});

module.exports = categoryRoute;
