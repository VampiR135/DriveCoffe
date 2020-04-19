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
			centeredSlides: true,
			slideToClickedSlide: true,
			pagination: {
				el: '.home_slider_pagination',
				clickable: true,
			},
			breakpoints: {
				576: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				768: {
					spaceBetween: 30
				},
				992: {
					spaceBetween: 30
				}
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

		request.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if(this.status === 200) {
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
			}
		}
	}
};

//Yandex maps
if(window.ymaps) {
	let myMap, objectManager;

	const openMarkerBaloon = (id) => {
		const objectState = window.objectManager.getObjectState(id);
		if (objectState.isClustered) {
			window.objectManager.clusters.state.set('activeObject', window.objectManager.objects.getById(id));
			window.objectManager.clusters.balloon.open(objectState.cluster.id);
		} else {
			window.objectManager.objects.balloon.open(id);
		}
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
		const data = {
			"type": "FeatureCollection",
			"features": [
				{
					"type": "Feature",
					"id": 0,
					"test": "Юбилейная",
					"geometry": {"type": "Point", "coordinates": [53.500064, 49.273558]},
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
					"id": 1,
					"test": "Коммунистическая",
					"geometry": {"type": "Point", "coordinates": [53.472816, 49.478163]},
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
					"id": 2,
					"test": "Автозаводское",
					"geometry": {"type": "Point", "coordinates": [53.539356, 49.390381]},
					"properties": {
						"balloonContent": "<p><b>Drive Coffee ParkHouse/Lime</b></p><p>ул. Автозаводское шоссе, 10</p>",
						"clusterCaption": "cluster_1",
						"hintContent": "Drive Coffee ParkHouse/Lime"
					},
					"options": {
						"iconColor": "#ff0000"
					}
				},
				{
					"type": "Feature",
					"id": 3,
					"test": "Набережная",
					"geometry": {"type": "Point", "coordinates": [53.501852, 49.252380]},
					"properties": {
						"balloonContent": "<p><b>Drive Coffee Naba</b></p><p>Работаем с мая по август</p>",
						"clusterCaption": "cluster_1",
						"hintContent": "Drive Coffee Naba"
					},
					"options": {
						"iconColor": "#ff0000"
					}
				}
			]
		};

		objectManager.add(data);

		window.openMarkerBaloon(0);
	}
}
