const Router = require('koa-router');
const homeRoute = new Router();

const homeService = require('../service/home');

homeRoute.get('/home', async (ctx, next) => {
	let data = await homeService()
		.then(res => res)
		.catch(err => err);
	ctx.body = data;
});

module.exports = homeRoute;