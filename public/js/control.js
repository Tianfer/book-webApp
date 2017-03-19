const swiperControl = new Swiper('.swiper-container', {
	// 滑动的控制条
	scrollbar:'.swiper-scrollbar',
	// 控制条默认不现实
	scrollbarHide : true,
	// 可以控制控制条来滑动
	scrollbarDraggable : true,
	// 当前展示多少个slide
	slidesPerView: 'auto',
	// 自由不贴合
	freeMode: true
})