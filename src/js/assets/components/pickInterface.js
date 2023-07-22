// if (qs('.room')) {
// }
import selectorsObj from './selectorsObj'
import { qs, onclickNothing } from './globalFunctions'
import { modalDisplayToggler } from './modals'
import { teamName1, teamName2, time1, time2 } from '../../backend'
import {
	globalTimerId,
	globalReserveTimerId,
	globalTime,
	timer1,
	reserveTimer1,
	timer2,
	reserveTimer2,
	timeToSelector,
	timeToSelector2,
	timer
} from './timerFunctions'

const itemsToPick = document.querySelectorAll('.modal-pick__item')
const heroesToPick = document.querySelectorAll('.heroes .modal-pick__item')
const weaponsToPick = document.querySelectorAll('.weapons .modal-pick__item')
const unlocked = 'team__item--unlocked'

export function randomHero(destItem) {
	const pick = itemsToPick[Math.floor(Math.random() * (heroesToPick.length + 1))]
	copyImg(pick, destItem)
}

export function randomWeapon(destItem) {
	const pick = itemsToPick[Math.floor(Math.random() * (weaponsToPick.length + 1))]
	copyImg(pick, destItem)
}

function endPicks() {
	qs(selectorsObj.actionNow).textContent = '...'
	qs(selectorsObj.currentTeam).textContent = '...'
	qs(selectorsObj.currentTeamArrow).classList.remove('info-column__decorate-arrow--team-1')
	qs(selectorsObj.currentTeamArrow).classList.remove('info-column__decorate-arrow--team-2')
}

function startContent() {
	endPicks()
	qs(selectorsObj.team1.name).textContent = teamName1
	qs(selectorsObj.team2.name).textContent = teamName2
	timeToSelector2(time1, selectorsObj.team1.timer)
	timeToSelector2(time1, selectorsObj.team2.timer)
	timeToSelector2(time2, selectorsObj.team1.reserveTimer)
	timeToSelector2(time2, selectorsObj.team2.reserveTimer)
}
startContent()

function currentTeam(teamName, teamNumber) {
	qs(selectorsObj.currentTeam).textContent = teamName
	if (teamNumber === 1) {
		qs(selectorsObj.currentTeamArrow).classList.remove('info-column__decorate-arrow--team-2')
		qs(selectorsObj.currentTeamArrow).classList.add('info-column__decorate-arrow--team-1')
	} else if (teamNumber === 2) {
		qs(selectorsObj.currentTeamArrow).classList.remove('info-column__decorate-arrow--team-1')
		qs(selectorsObj.currentTeamArrow).classList.add('info-column__decorate-arrow--team-2')
	}
}

export function unlockItem(srcItem, modalName) {
	qs(srcItem).classList.add(unlocked)
	qs(srcItem).onclick = () => modalDisplayToggler(modalName)
	srcItem.includes('ban') ? (qs(selectorsObj.actionNow).textContent = 'Запрещает') : (qs(selectorsObj.actionNow).textContent = 'Выбирает')
	srcItem.includes('team-1') ? currentTeam(teamName1, 1) : currentTeam(teamName2, 2)
}

function copyImg(srcItem, destItem) {
	const srcImg = srcItem.querySelector('img').src
	const img = document.createElement('img')
	img.src = srcImg
	qs(destItem).append(img)
	srcItem.classList.add('modal-pick__item--locked')
}

export function lockItem() {
	onclickNothing('.team__item--unlocked')
	qs('.team__item--unlocked').classList.remove(unlocked)
}

qs(selectorsObj.startBtn).onclick = () => {
	if (qs(selectorsObj.startBtn).getAttribute('data-start-btn') !== 'off') {
		qs(selectorsObj.startBtn).setAttribute('data-start-btn', 'off')
		unlockItem(selectorsObj.team1.ban1, 'heroes')
		timer(time1, 1, time2, 0, selectorsObj.team1.ban1, selectorsObj.team2.ban1, 'heroes')
	}
}

itemsToPick.forEach(item =>
	item.addEventListener('click', () => {
		if (qs(selectorsObj.team1.ban1).classList.contains(unlocked)) {
			clearInteravls()
			copyImg(item, selectorsObj.team1.ban1)
			lockItem(selectorsObj.team1.ban1)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team2.ban1, 'heroes')
			timer(time1, 2, time2, 0, selectorsObj.team1.ban1, selectorsObj.team2.ban1, 'heroes')
		} else if (qs(selectorsObj.team2.ban1).classList.contains(unlocked)) {
			clearInteravls()
			copyImg(item, selectorsObj.team2.ban1)
			lockItem(selectorsObj.team1.ban1)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team1.pick1, 'heroes')
			timer(
				time1,
				1,
				globalTime.team1.reserveTimer.sec,
				globalTime.team1.reserveTimer.min,
				selectorsObj.team2.ban1,
				selectorsObj.team1.pick1,
				'heroes'
			)
		} else if (qs(selectorsObj.team1.pick1).classList.contains(unlocked)) {
			clearInteravls()
			copyImg(item, selectorsObj.team1.pick1)
			lockItem(selectorsObj.team1.pick1)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team2.pick1, 'heroes')
		} else if (qs(selectorsObj.team2.pick1).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team2.pick1)
			lockItem(selectorsObj.team2.pick1)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team2.pick2, 'heroes')
		} else if (qs(selectorsObj.team2.pick2).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team2.pick2)
			lockItem(selectorsObj.team2.pick2)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team1.pick2, 'heroes')
		} else if (qs(selectorsObj.team1.pick2).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team1.pick2)
			lockItem(selectorsObj.team1.pick2)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team1.pick3, 'heroes')
		} else if (qs(selectorsObj.team1.pick3).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team1.pick3)
			lockItem(selectorsObj.team1.pick3)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team2.pick3, 'heroes')
		} else if (qs(selectorsObj.team2.pick3).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team2.pick3)
			lockItem(selectorsObj.team2.pick3)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team2.ban2, 'heroes')
		} else if (qs(selectorsObj.team2.ban2).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team2.ban2)
			lockItem(selectorsObj.team2.ban2)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team1.ban2, 'heroes')
		} else if (qs(selectorsObj.team1.ban2).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team1.ban2)
			lockItem(selectorsObj.team1.ban2)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team2.pick4, 'heroes')
		} else if (qs(selectorsObj.team2.pick4).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team2.pick4)
			lockItem(selectorsObj.team2.pick4)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team1.pick4, 'heroes')
		} else if (qs(selectorsObj.team1.pick4).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team1.pick4)
			lockItem(selectorsObj.team1.pick4)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team1.pick5, 'heroes')
		} else if (qs(selectorsObj.team1.pick5).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team1.pick5)
			lockItem(selectorsObj.team1.pick5)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team2.pick5, 'heroes')
		} else if (qs(selectorsObj.team2.pick5).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team2.pick5)
			lockItem(selectorsObj.team2.pick5)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team2.pick6, 'heroes')
		} else if (qs(selectorsObj.team2.pick6).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team2.pick6)
			lockItem(selectorsObj.team2.pick6)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team1.pick6, 'heroes')
		} else if (qs(selectorsObj.team1.pick6).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team1.pick6)
			lockItem(selectorsObj.team1.pick6)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team1.ban3, 'heroes')
		} else if (qs(selectorsObj.team1.ban3).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team1.ban3)
			lockItem(selectorsObj.team1.ban3)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team2.ban3, 'heroes')
		} else if (qs(selectorsObj.team2.ban3).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team2.ban3)
			lockItem(selectorsObj.team2.ban3)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team2.pick7, 'heroes')
		} else if (qs(selectorsObj.team2.pick7).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team2.pick7)
			lockItem(selectorsObj.team2.pick7)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team1.pick7, 'heroes')
		} else if (qs(selectorsObj.team1.pick7).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team1.pick7)
			lockItem(selectorsObj.team1.pick7)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team2.pick8, 'heroes')
		} else if (qs(selectorsObj.team2.pick8).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team2.pick8)
			lockItem(selectorsObj.team1.pick8)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team1.pick8, 'heroes')
		} else if (qs(selectorsObj.team1.pick8).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team1.pick8)
			lockItem(selectorsObj.team1.pick8)
			modalDisplayToggler('heroes')
			unlockItem(selectorsObj.team1.ban4, 'weapons')
		} else if (qs(selectorsObj.team1.ban4).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team1.ban4)
			lockItem(selectorsObj.team1.ban4)
			modalDisplayToggler('weapons')
			unlockItem(selectorsObj.team2.ban4, 'weapons')
		} else if (qs(selectorsObj.team2.ban4).classList.contains(unlocked)) {
			copyImg(item, selectorsObj.team2.ban4)
			lockItem(selectorsObj.team2.ban4)
			modalDisplayToggler('weapons')
			endPicks()
		}
	})
)

function clearInteravls() {
	clearInterval(globalTimerId)
	clearInterval(globalReserveTimerId)
	timeToSelector2(time1, selectorsObj.team1.timer)
	timeToSelector2(time1, selectorsObj.team2.timer)
}

function testFunc1(msg) {
	console.log(msg)
}
function testFunc2(msg) {
	console.log(msg)
}

function testFunc3(func1, func2) {
	func1
	func2
}

testFunc3(testFunc1('123'), testFunc2('456'))
