const Router = require('koa-router');
const router = new Router();

const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(path.resolve(__dirname, '../controller'));

files.forEach(file => {
	const route = require(path.resolve(__dirname, '../controller', file));
	router.use('/api', route.routes(), route.allowedMethods());
});

module.exports = router;