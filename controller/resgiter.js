const Router = require('koa-router');
const registerRoute = new Router();
const registerModel = require('../models/register');

registerRoute.post('/register', async (ctx, next) => {
    let {username, password} = ctx.request.body;
    let data = await registerModel(username, password);
    ctx.body = data;
});

module.exports = registerRoute;