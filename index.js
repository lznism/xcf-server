const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

const router = require('./routes');
app.keys = ['XCF SESSION KEY'];
app.use(session({
    key: 'XCF-SESSION',
    maxAge: 1800000
}, app));
app.use(bodyParser());
app.use(router.routes());
app.listen(3000, () => console.log('listening on port 3000'));