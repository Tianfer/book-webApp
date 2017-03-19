const del = document.querySelectorAll('.bookListDel')
const len = del.length
const url = '/admin/book/del?id='
for(let i = 0; i < len; i++) {
	del[i].onclick = function(e) {
		let tr = del[i].parentNode.parentNode
		let td = tr.firstChild
		let id = td.innerText
		bookDel(id).then((text) => {
			if(text == '删除成功') {
				let _this = tr
				tr.parentNode.removeChild(_this)
			}
		})
	}
}

function bookDel(id) {
	var promise = new Promise(function(resolve, reject) {
		let xmlhttp = new XMLHttpRequest()
		xmlhttp.open('get', url+id)
		xmlhttp.onreadystatechange = hander
		xmlhttp.send()
		
		function hander() {
			if(xmlhttp.readyState != 4) {
				return
			}
			if(xmlhttp.status == 200) {
				resolve(xmlhttp.response)
			} else {
				reject(xmlhttp.status)
			}
		}
	})
	return promise
}