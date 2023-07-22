export function qs(selector) {
	return document.querySelector(selector)
}

export function onclickNothing(selector) {
	qs(selector).onclick = e => e.preventDefault()
}