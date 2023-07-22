import weaponsObj from '../data/weaponsObj'

if (document.querySelector('.weapons')) {
	for (let key in weaponsObj) {
		let groupName = weaponsObj[key].name
		const weaponsHTML = document.querySelector('.weapons')
		weaponsHTML.innerHTML += `
			<div class="modal-pick__group">
			<div class="modal-pick__group-heading">
			<h3 class="modal-pick__group-title">${groupName}</h3>
			</div>
			<ul class="modal-pick__list">
			</ul>
			</div>
			<div class="modal-pick__decorate-line decorate-line"></div>
			`
		let weaponsGroupItemsObj = weaponsObj[key].weapons
		for (let key2 in weaponsGroupItemsObj) {
			let weaponImg = weaponsGroupItemsObj[key2].img
			let weaponName = weaponsGroupItemsObj[key2].name
			const pickLists = document.querySelectorAll('.modal-pick__list')
			switch (groupName) {
				case weaponsObj.swordsOneHand.name:
					pickLists[7].innerHTML += `
				<li class='modal-pick__item'>
					<img src="${weaponImg}" loading="lazy" class='modal-pick__item-img' />
					<p class='modal-pick__item-name'>${weaponName}</p>
				</li>
			`
					break
				case weaponsObj.swordsTwoHands.name:
					pickLists[8].innerHTML += `
				<li class='modal-pick__item'>
					<img src="${weaponImg}" loading="lazy" class='modal-pick__item-img' />
					<p class='modal-pick__item-name'>${weaponName}</p>
				</li>
			`
					break
				case weaponsObj.Bows.name:
					pickLists[9].innerHTML += `
				<li class='modal-pick__item'>
					<img src="${weaponImg}" loading="lazy" class='modal-pick__item-img' />
					<p class='modal-pick__item-name'>${weaponName}</p>
				</li>
			`
					break
				case weaponsObj.Spears.name:
					pickLists[10].innerHTML += `
				<li class='modal-pick__item'>
					<img src="${weaponImg}" loading="lazy" class='modal-pick__item-img' />
					<p class='modal-pick__item-name'>${weaponName}</p>
				</li>
			`
					break
				case weaponsObj.Catalizators.name:
					pickLists[11].innerHTML += `
				<li class='modal-pick__item'>
					<img src="${weaponImg}" loading="lazy" class='modal-pick__item-img' />
					<p class='modal-pick__item-name'>${weaponName}</p>
				</li>
			`
					break
			}
		}
	}
}
