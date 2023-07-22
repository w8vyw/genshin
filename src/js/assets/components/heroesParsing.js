import heroesObj from '../data/heroesObj'

if (document.querySelector('.weapons')) {
	for (let key in heroesObj) {
		let groupImg = heroesObj[key].img
		let groupName = heroesObj[key].name
		const heroesHTML = document.querySelector('.heroes')
		heroesHTML.innerHTML += `
			<div class="modal-pick__group">
			<div class="modal-pick__group-heading">
			<img src="${groupImg}" class="modal-pick__group-img" />
			<h3 class="modal-pick__group-title">${groupName}</h3>
			</div>
			<ul class="modal-pick__list">
			</ul>
			</div>
			<div class="modal-pick__decorate-line decorate-line"></div>
			`
		let heroesGroupItemsObj = heroesObj[key].heroes
		for (let key2 in heroesGroupItemsObj) {
			let heroImg = heroesGroupItemsObj[key2].img
			let heroName = heroesGroupItemsObj[key2].name
			const pickLists = document.querySelectorAll('.modal-pick__list')
			switch (groupName) {
				case heroesObj.Anemo.name:
					pickLists[0].innerHTML += `
				<li class='modal-pick__item'>
					<img src="${heroImg}" loading="lazy" class='modal-pick__item-img' />
					<p class='modal-pick__item-name'>${heroName}</p>
				</li>
			`
					break
				case heroesObj.Crio.name:
					pickLists[1].innerHTML += `
				<li class='modal-pick__item'>
					<img src="${heroImg}" loading="lazy" class='modal-pick__item-img' />
					<p class='modal-pick__item-name'>${heroName}</p>
				</li>
			`
					break
				case heroesObj.Dendro.name:
					pickLists[2].innerHTML += `
				<li class='modal-pick__item'>
					<img src="${heroImg}" loading="lazy" class='modal-pick__item-img' />
					<p class='modal-pick__item-name'>${heroName}</p>
				</li>
			`
					break
				case heroesObj.Electro.name:
					pickLists[3].innerHTML += `
				<li class='modal-pick__item'>
					<img src="${heroImg}" loading="lazy" class='modal-pick__item-img' />
					<p class='modal-pick__item-name'>${heroName}</p>
				</li>
			`
					break
				case heroesObj.Geo.name:
					pickLists[4].innerHTML += `
				<li class='modal-pick__item'>
					<img src="${heroImg}" loading="lazy" class='modal-pick__item-img' />
					<p class='modal-pick__item-name'>${heroName}</p>
				</li>
			`
					break
				case heroesObj.Gidro.name:
					pickLists[5].innerHTML += `
				<li class='modal-pick__item'>
					<img src="${heroImg}" loading="lazy" class='modal-pick__item-img' />
					<p class='modal-pick__item-name'>${heroName}</p>
				</li>
			`
					break
				case heroesObj.Piro.name:
					pickLists[6].innerHTML += `
				<li class='modal-pick__item'>
					<img src="${heroImg}" loading="lazy" class='modal-pick__item-img' />
					<p class='modal-pick__item-name'>${heroName}</p>
				</li>
			`
					break
			}
		}
	}
}
