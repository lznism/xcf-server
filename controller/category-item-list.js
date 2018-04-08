const Router = require('koa-router');
const categoryItemListRoute = new Router();
const categoryItemListService = require('../service/category-item-list');

categoryItemListRoute.get('/category-item-list/:id', async (ctx, next) => {
	let id = ctx.params.id;
	let page = ctx.query.page || 1;
	let data = await categoryItemListService(id, page)
		.then(res => res)
		.catch(err => err);
	ctx.body = data;
});

module.exports = categoryItemListRoute;