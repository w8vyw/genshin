export function modalDisplayToggler(modalName) {
	modalName = '.' + modalName
	if (document.querySelector(modalName)) {
		modalName = modalName.replace('.', '')
		let modalOverlay = '[data-modal-overlay="' + modalName + '"]'
		modalName = '.' + modalName
		document.querySelector(modalName).classList.toggle('modal--opened')
		document.querySelector(modalOverlay).classList.toggle('overlay--active')
		document.querySelector(modalOverlay).onclick = () => {
			document.querySelector(modalName).classList.toggle('modal--opened')
			document.querySelector(modalOverlay).classList.toggle('overlay--active')
		}
	}
}

export function createModal(modalName) {
	modalName = '.' + modalName
	if (document.querySelector(modalName)) {
		modalName = modalName.replace('.', '')
		let modalTriggers = '[data-modal-trigger="' + modalName + '"]'
		document.querySelectorAll(modalTriggers).forEach(trigger => (trigger.onclick = () => modalDisplayToggler(modalName)))
	}
}

createModal('create-room')
createModal('result')
createModal('password')
createModal('heroes')
createModal('weapons')
