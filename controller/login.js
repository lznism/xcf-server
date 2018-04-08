const Router = require('koa-router');
const loginRoute = new Router();
const loginModel = require('../models/login');

loginRoute.post('/login', async (ctx, next) => {
    let {username, password} = ctx.request.body;
    let data = await loginModel(username, password);
    ctx.body = data;
});

module.exports = loginRoute;