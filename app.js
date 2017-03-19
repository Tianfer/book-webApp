const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const home = new Router()
const views = require('koa-views')
const path = require('path')
const static = require('koa-static')
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

// 加载自定义的模块
const Book = require('./sql/connect/book')
const User = require('./sql/connect/user')
const Session = require('./sql/connect/session')

app.use(convert(static(path.join(__dirname, './public'))))

app.use(bodyParser())

app.use(views(path.join(__dirname, 'views/pages'), {
	extension: 'pug',
}))

// 配置存储session信息的mysql
const store = new MysqlSession({
  user: 'root',
  password: '12345678',
  database: 'book',
  host: '127.0.0.1',
})
// 存放sessionId的cookie配置
const time = new Date().getTime() + 3600000
const cookie = {
  maxAge: 3600000, // 浏览器中的存储时间 默认为关闭浏览器实效
  expires: time,  // 服务器中存储的实效时间
}
app.use(session({
  	key: 'bookUser',
  	store: store,
  	cookie: cookie
}))
// 定义一个未知的username
global.username = global.username || 'undefined'

home.get('/', Book.index)

home.get('/search', Book.search)

home.get('/admin/book/add', Book.add)

home.post('/admin/book', Book.save)

home.post('/admin/bookup', Book.saveUpdate)

home.get('/admin/book/list', Book.list)

home.get('/admin/book/update', Book.update)

home.get('/admin/book/del', Book.del)

home.get('/detail/:id', Book.detail)

home.get('/search/list', Book.searchList)

home.get('/user', User.user)

home.get('/user/signin', User.signin)

home.get('/user/signup', User.signup)

home.post('/user/signin/in', User.in)

home.post('/user/signup/add', User.add)

home.get('/session/del', Session.del)

// app.use(home.routes()).use(Session.session, home.allowedMethods)
app.use(home.routes()).use(home.allowedMethods)

app.listen(3000)
console.log('This is running at 3000')