const query = require('../config/config.js')

exports.session = async(ctx, next) => {
	if(global.username == 'undefined') {
		// 将cookie这个string类型转为json
		let Cookies = getCookie(ctx)
	    if(Cookies.bookUser) {
	    	// 如果查找到
	    	let str = 'bookUser' + ':' + Cookies.bookUser
	    	let sql = 'select data from _mysql_session_store where id="'+str+'";'
	    	console.log(sql)
	    	let reback = await query(sql)
	    	console.log(reback)
	    	data = reback[0].data
	    	let json = JSON.parse(data)
	    	global.username = json.username
	    }
	}
	next()
}

exports.del = async(ctx, next) => {
	let Cookies = getCookie(ctx)
	let str = 'bookUser' + ':' + Cookies.bookUser
	let sql = 'delete from _mysql_session_store where id="'+str+'";'
	// 删除session
	let reback = await query(sql)
	if(reback.affectedRows != 0) {
		let cookie = ctx.request.header.cookie
		let reg = /bookUser(.*);/
		let s = cookie.replace(/bookUser(.*);/, '')
		ctx.request.header.cookie = s
		global.username = 'undefined'
		ctx.body = '退出成功'
		// console.log(s)
	} else {
		ctx.body = '退出失败'
	}
}

function getCookie(ctx) {
	let Cookies = {}
	let cookie = ctx.request.header.cookie
    let arr = cookie.split(';')
    arr.forEach(item => {
    	let parts = item.split('=')
    	Cookies[parts[0].trim()] = (parts[1] || '').trim();
    })
    return Cookies
}