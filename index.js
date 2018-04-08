const Koa = require('koa');
const app = new Koa();

const router = require('./routes');

app.use(router.routes());
app.listen(3000, () => console.log('listening on port 3000'));