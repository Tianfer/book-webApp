const con = document.getElementById('con')
const input = document.getElementById('input')
const url = '/search/list?val='

// 记下原本的html
const searchCon = document.querySelector('.search-content')
const html = searchCon.innerHTML
// 搜索是的文字
const none = document.querySelector('.search-content-none')

input.onclick = function() {
	let val = con.value || 'none'
	none.innerHTML = '查找中......'
	searchBook(val).then((books) => {
		if(books != '[]') {
			let arr = JSON.parse(books)
			let len = arr.length
			console.log(arr.length)
			let text = ''
			let summary = 'substring(summary, 1, 80)'
			for(let i = 0; i < 2; i++) {
				if(arr[i].value == 0) {
					arr[i].value = '免费'
				}
				text += '<div class="search-content-book">'+
							'<a href="/detail/'+arr[i].id+'">'+
								'<div class="sbb-content">'+
									'<img class="search-book-img" src="'+arr[i].cover+'">'+
									'<div class="search-book-box">'+
										'<div class="sbb-title">'+arr[i].title+'</div>'+
										'<div class="sbb-author">'+arr[i].author+'</div>'+
										'<div class="sbb-summary">'+arr[i].summary+'</div>'+
										'<div class="sbb-value">'+arr[i].value+'</div>'+
									'</div>'+
								'</div>'+
							'</a>'+	
						'</div>'
			}

			searchCon.innerHTML = text
		} else {
			searchCon.innerHTML = html
		}
	})

}

function searchBook(id) {
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