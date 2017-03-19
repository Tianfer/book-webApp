const psl = document.querySelector('.header-func-psl')
const show = document.querySelector('.psl-hidden')
// 判断打开与否状态
let flag = 1
console.log(psl)

if(psl) {
	psl.onclick = function() {
		if(flag) {
			show.style.display = 'block'
			flag = 0
		} else {
			show.style.display = 'none'
			flag = 1
		}
	}

	show.onclick = function() {
		let xmlhttp = new XMLHttpRequest()
		xmlhttp.open('get', '/session/del')
		xmlhttp.onreadystatechange = hander
		xmlhttp.send()
		
		function hander() {
			if(xmlhttp.readyState != 4) {
				return
			}
			if(xmlhttp.status == 200) {
				window.location.href='/'
			} else {
				alert('退出错误')
			}
		}
	}
}