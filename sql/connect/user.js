const query = require('../config/config.js')

exports.user = async(ctx) => {
	let title = '用户登录'
	await ctx.render('user', {
		title,
	})
}

exports.signin = async(ctx) => {
	let title = '登录界面'
	await ctx.render('signin', {
		title,
	})
}

exports.signup = async(ctx) => {
	let title = '注册界面'
	await ctx.render('signin', {
		title,
	})
}

exports.in = async(ctx) => {
	let body = ctx.request.body.user
	let sqlSearch = 'select * from user where username="'+body.username+'";'
	let reback = await query(sqlSearch)
	if(reback[0].password == body.password) {
		// 存入session
		ctx.session = {
			username: reback[0].username,
		}
		global.username = reback[0].username
		ctx.redirect('/')
	} else {
		let title = '登录界面'
		await ctx.render('signin', {
			title,
		})
	}
}

exports.add = async(ctx) => {
	let body = ctx.request.body.user
	let sqlSearch = 'select * from user where username="'+body.username+'";'
	let reback = await query(sqlSearch)
	if(reback.length == 0) {
		let sqlInsert = 'insert into user (username, password) values ("'+body.username+'", "'+body.password+'");'
		let re = await query(sqlInsert)
		// 存入session
		ctx.session = {
			username: reback[0].username,
		}
		global.username = reback[0].username
		ctx.redirect('/')
	} else {
		let title = '注册界面'
		await ctx.render('signin', {
			title,
		})
	}
}