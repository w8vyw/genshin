import { time1, time2 } from '../../backend'
import { modalDisplayToggler } from './modals'
import { randomHero, randomWeapon, lockItem, unlockItem } from './pickInterface'
import selectorsObj from './selectorsObj'

export let globalTimerId
export let globalReserveTimerId

export const globalTime = {
	team1: {
		reserveTimer: {
			sec: 0,
			min: 0
		}
	},
	team2: {
		reserveTimer: {
			sec: 0,
			min: 0
		}
	}
}

export function timeToSelector2(sec, selector) {
	let min = Math.trunc(sec / 60)
	sec = sec % 60
	if (min < 10) {
		min = '0' + min
	}
	if (sec < 10) {
		sec = '0' + sec
	}
	document.querySelector(selector).textContent = min + ':' + sec
}

export function timeToSelector(min, sec, selector) {
	if (min < 10) {
		min = '0' + min
	}
	if (sec < 10) {
		sec = '0' + sec
	}
	document.querySelector(selector).textContent = min + ':' + sec
}

export function timer(sec, team, sec2, min2, destItem, nextItem, nextModal) {
	let min = Math.trunc(sec / 60)
	sec = sec % 60
	if (team === 1) {
		timeToSelector(min, sec, selectorsObj.team1.timer)
	} else {
		timeToSelector(min, sec, selectorsObj.team2.timer)
	}
	globalTimerId = setInterval(() => {
		if (min === 0 && sec === 0) {
			reserveTimer(sec2, min2, team, destItem, nextItem, nextModal)
			return clearInterval(globalTimerId)
		} else {
			if (sec === 0) {
				min -= 1
				sec = 59
			} else {
				sec -= 1
			}
			if (team === 1) {
				timeToSelector(min, sec, selectorsObj.team1.timer)
			} else {
				timeToSelector(min, sec, selectorsObj.team2.timer)
			}
		}
	}, 1000)
}

export function reserveTimer(sec, min, team, destItem, nextItem, nextModal) {
	if (min === 0) {
		min = Math.trunc(sec / 60)
	}
	sec = sec % 60
	if (team === 1) {
		timeToSelector(min, sec, selectorsObj.team1.reserveTimer, nextItem, nextModal)
		globalTime.team1.reserveTimer.sec = sec
		globalTime.team1.reserveTimer.min = min
	} else {
		timeToSelector(min, sec, selectorsObj.team2.reserveTimer)
		globalTime.team2.reserveTimer.sec = sec
		globalTime.team2.reserveTimer.min = min
	}
	globalReserveTimerId = setInterval(() => {
		if (min === 0 && sec === 0) {
			if (destItem.includes('ban-4')) {
				randomWeapon(destItem)
			} else {
				randomHero(destItem)
			}
			lockItem()
			unlockItem(nextItem, nextModal)
			document.querySelector(nextItem).onclick = () => {
				modalDisplayToggler(nextModal)
				timer(time1, 1, time2, 0, nextItem, selectorsObj.team1.pick1, 'heroes')
			}
			return clearInterval(globalReserveTimerId)
		} else {
			if (sec === 0) {
				min -= 1
				sec = 59
			} else {
				sec -= 1
			}
			if (team === 1) {
				timeToSelector(min, sec, selectorsObj.team1.reserveTimer)
				globalTime.team1.reserveTimer.sec = sec
				globalTime.team1.reserveTimer.min = min
			} else {
				timeToSelector(min, sec, selectorsObj.team2.reserveTimer)
				globalTime.team2.reserveTimer.sec = sec
				globalTime.team2.reserveTimer.min = min
			}
		}
	}, 1000)
}
