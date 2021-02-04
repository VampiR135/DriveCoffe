if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
		position = position || 0;
		return this.indexOf(searchString, position) === position;
	};
}

function scrollToElement(className) {
	const errorInputOffset = parseInt(document.querySelector(`.${className}`).getBoundingClientRect().top + window.pageYOffset - 70);
	window.scrollTo({
		top: errorInputOffset,
		left: 0,
		behavior: 'smooth'
	});
}

window.onload = function (container, options) {

	function checkFixedHeader() {
		const offsetTop = window.pageYOffset,
			header = document.querySelector('header');
		if(offsetTop !== 0) {
			if(!header.classList.contains('header--fixed')) header.classList.add('header--fixed');
		} else {
			if(header.classList.contains('header--fixed')) header.classList.remove('header--fixed');
		}
	}
	// изменение стилей хэдера при скролле
	window.addEventListener('scroll', function() {
		checkFixedHeader();
	});

	checkFixedHeader();

	// переключатель мобильной версии
	const header = document.querySelector('header'),
				menu_switcher = document.querySelector('.header_menu_switcher ');

	menu_switcher.onclick = () => {
		if(header.classList.contains('header--open')) {
			header.classList.remove('header--open');
			document.body.style.overflow = '';
		} else {
			header.classList.add('header--open');
			document.body.style.overflow = 'hidden';
		}
	};

	// слайдер на главной
	const homeSlider = document.querySelector('.home_slider');
	if(homeSlider) {
		const home_slider = new Swiper('.home_slider', {
			loop: true,
			slidesPerView: 'auto',
			spaceBetween: 30,
			centeredSlides: true,
			slideToClickedSlide: true,
			pagination: {
				el: '.home_slider_pagination',
				clickable: true,
			},
			breakpoints: {
				576: {}
			}
		});
	}

	// слайдер локации
	const locationsSlider = document.querySelector('.locations_slider');
	if(locationsSlider) {
		const home_slider = new Swiper('.locations_slider', {
			loop: true,
			slidesPerView: 1,
			centeredSlides: true,
			spaceBetween: 30,
			pagination: {
				el: '.locations_slider_pagination',
				clickable: true,
			},
			on: {
				slideChange: () => {
					const slide_id = document.querySelector('.swiper-slide-active');
					window.openMarkerBaloon(slide_id.getAttribute('data-id'));
				},
			},
		});
	}

	// валидация и отправка форм
	const serializeForm = (form) => {
		return Array.prototype.slice.call(form.elements) // convert form elements to array
			.reduce(function(acc,cur){   // reduce
				let elem = {type : cur.type, name : cur.name, value : cur.value}; // get needed keys
				if(['checkbox','radio'].indexOf(cur.type) !==-1){
					elem.checked = cur.checked;
				} else if(cur.type === 'select-multiple'){
					elem.value=[];
					for(let i = 0;i < cur.length;i++){
						elem.value.push({
							value : cur.options[i].value,
							selected : cur.options[i].selected
						});
					}
				}
				if(elem.name) acc.push(elem);
				return acc;
			},[]);
	};

	// парсинг Cookie
	function getCookie(name) {
		let cookieValue = null;
		if (document.cookie && document.cookie !== '') {
			let cookies = document.cookie.split(';');
			for (let i = 0; i < cookies.length; i++) {
				let cookie = cookies[i].trim();
				if (cookie.substring(0, name.length + 1) === (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}

	const csrftoken = getCookie('csrftoken');

	const submitForm = function (form, id) {
		const pathList = {
						'vacancy_form': '/api/v1/vacancy/',
						'feedback_form': '/api/v1/feedback/'
					},
					data = serializeForm(form),
					dataJSON = {};

		for(let i = 0; i < data.length; i++) {
			dataJSON[data[i].name] = data[i].value;
		}

		const request = new XMLHttpRequest();
		request.open('POST', pathList[id], true);
		request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		request.setRequestHeader('X-CSRFToken', csrftoken);
		request.setRequestHeader('X-Forwarded-Proto', location.protocol.replace(':', ''));

		request.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if(this.status >= 200 && this.status < 300) {
					Toastify({
						text: 'Данные успешно отправлены',
						close: false,
						gravity: 'top',
						position: 'center',
						backgroundColor: '#99d99e',
						stopOnFocus: true,
						className: 'toastify_message',
					}).showToast();
				} else {
					Toastify({
						text: 'Произошла ошибка на сервере',
						close: false,
						gravity: 'top',
						position: 'center',
						backgroundColor: '#ffb2b2',
						stopOnFocus: true,
						className: 'toastify_message',
					}).showToast();
				}
			}
		};

		request.onerror = function() {
			Toastify({
				text: 'Произошла непредвиденная ошибка',
				close: false,
				gravity: 'top',
				position: 'center',
				backgroundColor: '#ffb2b2',
				stopOnFocus: true,
				className: 'toastify_message',
			}).showToast();
		};

		request.send(JSON.stringify(dataJSON));
	};

	const formList = document.querySelectorAll('form');

	if(formList.length) {
		for(let i = 0; i < formList.length; i++) {
			formList[i].addEventListener('submit', (event) => {
				event.preventDefault();
				if (new Wellidate(formList[i], options).form()) {
					submitForm(formList[i], formList[i].getAttribute('data-type'));
				}
			}, false)
		}
	}

	// маска для телефона
	const phoneList = document.querySelectorAll('[data-phone]');
	if(phoneList.length) {
		for(let i = 0; i < phoneList.length; i++) {
			phoneList[i].oninput = function(e) {
				if (!e.isTrusted) {
					return;
				}
				let x = this.value.replace(/\D/g, '').match(/([0-9])(\d{0,3})(\d{0,3})(\d{0,4})/);
				if(x !== null) this.value = !x[2] ? x[1] : x[1] + ( !x[3] ? x[2] : '(' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : ''));
				let event = document.createEvent('Event');
				event.initEvent('input', false, true);
				// args: string type, boolean bubbles, boolean cancelable
				phoneList[i].dispatchEvent(event);
			}
		}
	}

	// переключение карты
	const locationsList = document.querySelectorAll('.locations_list_item');
	if(locationsList.length) {
		for(let i = 0; i < locationsList.length; i++) {
			locationsList[i].onclick = () => {
				const id = locationsList[i].getAttribute('data-id');
				window.openMarkerBaloon(id);
				scrollToElement('map-container');
			}
		}
	}

	const video = document.querySelector('.banner_video');
	// Parallax(element, speed, direction)
	if(video) {
		new Parallax(video, 2, true);
	}
};

//Yandex maps
if(window.ymaps) {
	let myMap, objectManager;
	const locationList = {
		"type": "FeatureCollection",
		"features": [
			{
				"type": "Feature",
				"id": 0,
				"geometry": {"type": "Point", "coordinates": [53.497424, 49.293479]},
				"properties": {
					"balloonContent": "<p><b>Drive Coffee Concept Bar</b></p><p>ул. Спортивная, 1и</p>",
					"clusterCaption": "cluster_1",
					"hintContent": "Drive Coffee Concept Bar"
				},
				"options": {
					"iconColor": "#ff0000"
				}
			},
			{
				"type": "Feature",
				"id": 1,
				"geometry": {"type": "Point", "coordinates": [53.500095, 49.273175]},
				"properties": {
					"balloonContent": "<p><b>Drive Coffee Vega</b></p><p>ул. Юбилейная, 40г</p>",
					"clusterCaption": "cluster_1",
					"hintContent": "Drive Coffee Vega"
				},
				"options": {
					"iconColor": "#ff0000"
				}
			},
			{
				"type": "Feature",
				"id": 2,
				"geometry": {"type": "Point", "coordinates": [53.472830, 49.478180]},
				"properties": {
					"balloonContent": "<p><b>Drive Coffee Komsa</b></p><p>ул. Коммунистическая, 92г</p>",
					"clusterCaption": "cluster_1",
					"hintContent": "Drive Coffee Komsa"
				},
				"options": {
					"iconColor": "#ff0000"
				}
			},
			{
				"type": "Feature",
				"id": 3,
				"geometry": {"type": "Point", "coordinates": [53.510417, 49.410619]},
				"properties": {
					"balloonContent": "<p><b>Drive Coffee Zhilina</b></p><p>ул. Жилина, 9</p>",
					"clusterCaption": "cluster_1",
					"hintContent": "Drive Coffee Zhilina"
				},
				"options": {
					"iconColor": "#ff0000"
				}
			},
			{
				"type": "Feature",
				"id": 4,
				"geometry": {"type": "Point", "coordinates": [53.539840, 49.389528]},
				"properties": {
					"balloonContent": "<p><b>Drive Coffee ParkHouse/Lime</b></p><p>ул. Автозаводское шоссе, 10в</p>",
					"clusterCaption": "cluster_1",
					"hintContent": "Drive Coffee ParkHouse/Lime"
				},
				"options": {
					"iconColor": "#ff0000"
				}
			},
			{
				"type": "Feature",
				"id": 5,
				"geometry": {"type": "Point", "coordinates": [53.508960, 49.272400]},
				"properties": {
					"balloonContent": "<p><b>Drive Coffee Park</b></p><p>Парк Победы Автозаводского района</p>",
					"clusterCaption": "cluster_1",
					"hintContent": "Drive Coffee Park"
				},
				"options": {
					"iconColor": "#ff0000"
				}
			},
			{
				"type": "Feature",
				"id": 6,
				"geometry": {"type": "Point", "coordinates": [53.501852, 49.252380]},
				"properties": {
					"balloonContent": "<p><b>Drive Coffee Naba</b></p><p>Набережная 6 квартала</p>",
					"clusterCaption": "cluster_1",
					"hintContent": "Drive Coffee Naba"
				},
				"options": {
					"iconColor": "#ff0000"
				}
			},
			{
				"type": "Feature",
				"id": 7,
				"geometry": {"type": "Point", "coordinates": [53.522170, 49.414788]},
				"properties": {
					"balloonContent": "<p><b>Drive Coffee</b></p>",
					"clusterCaption": "cluster_1",
					"hintContent": "Drive Coffee"
				},
				"options": {
					"iconColor": "#ff0000"
				}
			}
		]
	};

	const openMarkerBaloon = (id) => {
		const objectState = window.objectManager.getObjectState(id);
		if (objectState.isClustered) {
			window.objectManager.clusters.state.set('activeObject', window.objectManager.objects.getById(id));
			window.objectManager.clusters.balloon.open(objectState.cluster.id);
		} else {
			window.objectManager.objects.balloon.open(id);
		}
		let markerCoordinates = locationList.features.filter(item => item.id === parseInt(id))[0].geometry.coordinates;
		myMap.setCenter(markerCoordinates, myMap.getZoom());
	};

	ymaps.ready(init);

	function init () {
		myMap = new ymaps.Map('map', {
			center: [53.500068, 49.273561],
			zoom: 17,
			controls: ['zoomControl', 'searchControl', 'fullscreenControl']
		}, {
			searchControlProvider: 'yandex#search'
		});

		objectManager = new ymaps.ObjectManager({
			clusterize: true,
			gridSize: 32,
			clusterDisableClickZoom: true
		});
		objectManager.objects.options.set('preset', 'twirl#redIcon');
		objectManager.objects.options.set('iconColor', '#ff0000');
		objectManager.clusters.options.set('preset', 'islands#redClusterIcons');
		myMap.geoObjects.add(objectManager);

		objectManager.add(locationList);

		window.openMarkerBaloon(0);
	}
}
