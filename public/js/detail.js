const show = document.querySelector('.detail-summary')
const con = document.querySelector('.detail-summary-con')
const icon = document.querySelector('.detail-summary-icon')
let height = con.offsetHeight

// 判断简介打开状态
let flag = 1

show.onclick = function() {
	if(flag) {
		con.style.height = 'auto'
		icon.style.transform = 'rotate(180deg)'
		flag = 0
	} else {
		con.style.height = height + 'px'
		icon.style.transform = 'rotate(0deg)'
		flag = 1
	}
}