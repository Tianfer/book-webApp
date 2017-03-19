const query = require('../config/config.js')

// index页
exports.index = async(ctx) => {
	let title = '豆瓣读书'
	let sqlTimeUpd = 'select id, title, author, value, cover from book order by timeupd desc'
	let booksNew = await query(sqlTimeUpd)

	let sqlTimeCom = 'select id, title, author, value, cover from book order by number desc'
	let booksHot = await query(sqlTimeCom)

	let type = '漫画'
	let sqlTimetyp = 'select id, title, author, value, cover from book where type REGEXP "'+type+'" order by timeupd desc'
	let booksDraw = await query(sqlTimetyp)

	let sqlTimeval = 'select id, title, author, value, cover from book where value=0.0 order by timeupd desc'
	let booksFree = await query(sqlTimeval)

	if(global.username == 'undefined') {
		// 将cookie这个string类型转为json
		let Cookies = {}
	    let cookie = ctx.request.header.cookie
	    let arr = cookie.split(';')
	    arr.forEach(item => {
	    	let parts = item.split('=')
	    	Cookies[parts[0].trim()] = (parts[1] || '').trim();
	    })
	    if(Cookies.bookUser) {
	    	// 如果查找到
	    	let str = 'bookUser' + ':' + Cookies.bookUser
	    	let sql = 'select data from _mysql_session_store where id="'+str+'";'
	    	let reback = await query(sql)
	    	if(reback.length != 0) {
	    		data = reback[0].data
	    		let json = JSON.parse(data)
	    		global.username = json.username
	    	}
	    }
	}
	await ctx.render('index', {
		title,
		booksNew,
		booksHot,
		booksDraw,
		booksFree
	})
}

// 详情页
exports.detail = async(ctx) => {
	let id = ctx.params.id;
	let sql = 'select * from book where id='+id
	let books = await query(sql)
	// 返回结果中只会有一个值
	let book = books[0]
	// 命名网页的title
	let title = book.title
	await ctx.render('detail', {
		title,
		book,
	})
}

// 加入新书页
exports.add = async(ctx) => {
	let title = '后台书本录入页'
	let book = {
		id: '',
		title: '',
		score: '',
		author: '',
		type: '',
		time: '',
		length: '',
		value: '',
		summary: '',
		list: '',
		tag: '',
		provider: '',
		comment: '',
		number: '',
		cover: '',
	}
	await ctx.render('bookAdd', {
		title,
		book
	})
}

// 保存新书
exports.save = async(ctx) => {
	let b = ctx.request.body.book
	// 存入时间
	let timeupd = new Date().getTime()
	console.log(timeupd)
	let sql = 'insert into book (title, score, author, type, timepub, length, value, summary, list, tag, provider, comment, number, cover, timeupd) values ("'+b.title+'", '+b.score+', "'+b.author+'", "'+b.type+'", "'+b.timepub+'", "'+b.length+'", '+b.value+', "'+b.summary+'", "'+b.list+'", "'+b.tag+'", "'+b.provider+'", "'+b.comment+'", '+b.number+', "'+b.cover+'", '+timeupd+');'
	// console.log(sql)
	await query(sql)
	ctx.redirect('/admin/book/list')
}

// 更新书
exports.saveUpdate = async(ctx) => {
	let b = ctx.request.body.book
	// 存入时间
	let timeupd = new Date().getTime()
	let sql = 'update book set title="'+b.title+'", score='+b.score+', author="'+b.author+'", type="'+b.type+'", timepub="'+b.timepub+'", length="'+b.length+'", value='+b.value+', summary="'+b.summary+'", list="'+b.list+'", tag="'+b.tag+'", provider="'+b.provider+'", comment="'+b.comment+'", number='+b.number+', cover="'+b.cover+'", timeupd='+timeupd+' where id='+b.id+';'
	await query(sql)
	ctx.redirect('/admin/book/list')
}

// 列表
exports.list = async(ctx) => {
	let title = '后台书本列表页'
	let sql = 'select * from book'
	let books = await query(sql)
	await ctx.render('bookList', {
		title,
		books,
	})
}

// 更新书前
exports.update = async(ctx) => {
	let title = '后台书本更新页'
	let id = ctx.request.query.id
	let sql = 'select * from book where id='+id
	let books = await query(sql)
	// 更新只能更新一本书
	let book = books[0]
	await ctx.render('bookAdd', {
		title,
		book
	})
}

// 删除
exports.del = async(ctx) => {
	let id = ctx.request.query.id
	let sql = 'delete from book where id='+id
	let reback = await query(sql)
	// 判断是否进行了删除操作
	if(reback.affectedRows) {
		ctx.body = '删除成功'
	} else {
		ctx.body = '该数据已经不存在'
	}
}

// 查找页
exports.search = async(ctx) => {
	let title = '搜索|豆瓣阅读'
	await ctx.render('search', {
		title,
	})
}

// 查找结果
exports.searchList = async(ctx) => {
	let val = ctx.request.query.val
	// 查找标题中可能含有的字符
	let sqlTitle = 'select id, title, author, summary, value, cover from book where title REGEXP "'+val+'" order by timeupd desc'
	let bookTitle = await query(sqlTitle)
	// 查找作者中可能含有的字符
	let sqlAuthor = 'select id, title, author, summary, value, cover from book where author REGEXP "'+val+'" order by timeupd desc'
	let bookAuthor = await query(sqlAuthor)
	let books = bookTitle.concat(bookAuthor)
	console.log(books)
	ctx.body = books
}





