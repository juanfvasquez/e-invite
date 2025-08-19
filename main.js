;(function () {
	const names = [
		'Abuelos ',
		'Juliana Bedoya e Hijas',
		'Jhon Jairo Salazar y Familia',
		'Familia Bedoya Jaramillo',
		'Omar Chica y Esposa ',
		'Jorge Iván Marín y Familia',
		'Andrés Chica y Familia',
		'Julio Castro y Esposa',
		'Elroy Harms y Esposa',
		'Andrés Fonseca y Familia',
		'Diego Mosquera y Esposa',
		'Jeisson Henao y Familia',
		'Luz Dary López ',
		'Luz Elena Henao',
		'Graciela Henao',
		'Fernando Soto y Familia ',
		'Alfredo Villa y Familia',
		'Oscar Rodríguez y Familia',
		'Rubén Mazo y Familia',
		'Arnulfo Ramírez y Familia',
		'Tomás Ramírez ',
		'Juan Esteban Bernal',
		'Maria Lucía Ramírez ',
		'Juan Martín López ',
		'Cristopher Vanegas',
		'Juan Martín Clavijo',
		'Silvana Ospina',
		'Salomé Aristizabal ',
		'Samantha Forero',
		'Juan Esteban Marín ',
		'Juan Andrés Alvarez ',
		'Juan Fernando Isaza',
		'Juan Martín Alzate',
		'Simón Vargas',
		'Valery Cárdenas ',
		'Sofia Buriticá',
		'Sara Grisales',
		'Salomé Londoño',
		'Jacobo Granada',
		'Mia Rivera',
		'Andrés Rudas',
		'Johan Agudelo',
		'Rubén Castaño y Familia',
		'Jorge Eduardo Ospina y Familia',
		'Andrés Parra',
		'Jonathan Castro y Esposa ',
		'Edivan Villegas y Esposa',
		'Carlos Andrés Chaura y Familia',
		'Alberto, Nathalia e hijos',
	]
	const ratio = 4.5
	const box = document.querySelector('.box')
	const date = dayjs('2025-09-20T15:00:00')
	let interval

	const audio = new Audio('./assets/sound.mp3')
	audio.loop = true
	audio.volume = 0.4

	document.addEventListener('click', () => {
		audio.play().catch((err) => console.log('Error reproduciendo audio:', err))
	})

	const addName = () => {
		let nameElement = document.querySelector('.name')
		if (nameElement) {
			nameElement.remove()
		}
		const indexStr = new URLSearchParams(window.location.search).get('invitado')
		if (!indexStr) return
		const index = parseInt(indexStr)
		const name = names[index - 1]
		if (!name) return
		nameElement = document.createElement('div')
		nameElement.classList.add('name')
		nameElement.textContent = name
		const boxWidth = document.querySelector('.box').offsetWidth
		nameElement.style.fontSize = `${boxWidth * 0.055}px`
		nameElement.style.top = `${boxWidth / 2.8}px`
		box.appendChild(nameElement)
	}

	const addTimeObjects = (days, hours, minutes, seconds) => {
		let timeElement = document.querySelector('.time')
		if (timeElement) {
			timeElement.remove()
		}
		const boxWidth = document.querySelector('.box').offsetWidth
		const top = boxWidth * 1.576
		console.log('🚀 ~ addTimeObjects ~ top:', top)
		timeElement = document.createElement('div')
		timeElement.classList.add('time')
		timeElement.style.top = `${top}px`
		timeElement.style.fontSize = `${boxWidth * 0.065}px`
		timeElement.style.color = 'white'
		timeElement.innerHTML = `
					<div class="time-item-value">${
						days.toString().length === 1 ? '0' : ''
					}${days}</div>

					<div class="time-item-dots">:</div>

					<div class="time-item-value">${
						hours.toString().length === 1 ? '0' : ''
					}${hours}</div>

          <div class="time-item-dots">:</div>

					<div class="time-item-value">${
						minutes.toString().length === 1 ? '0' : ''
					}${minutes}</div>

          <div class="time-item-dots">:</div>

					<div class="time-item-value">${
						seconds.toString().length === 1 ? '0' : ''
					}${seconds}</div>
			`
		box.appendChild(timeElement)
	}

	const addTime = () => {
		clearInterval(interval)
		interval = setInterval(() => {
			const now = dayjs()
			console.log('🚀 ~ addTime ~ now:', now)
			console.log('🚀 ~ addTime ~ date:', date)
			console.log('🚀 ~ addTime ~ now.isAfter(date):', now.isAfter(date))
			if (now.isAfter(date)) {
				addTimeObjects(0, 0, 0, 0)
				return
			}
			const diff = Math.abs(now.diff(date, 'second'))
			const days = Math.floor(diff / 86400)
			let remainingTime = diff % 86400
			const hours = Math.floor(remainingTime / 3600)
			remainingTime %= 3600
			const minutes = Math.floor(remainingTime / 60)
			const seconds = remainingTime % 60
			addTimeObjects(days, hours, minutes, seconds)
		}, 1000)
	}

	const addLocationButton = () => {
		let locationButton = document.querySelector('.location-button-wrapper')
		if (locationButton) {
			locationButton.remove()
		}
		locationButton = document.createElement('div')
		locationButton.classList.add('location-button-wrapper')
		locationButton.innerHTML = `
      <div class="location-button">Cómo llegar</div>
    `
		const boxWidth = document.querySelector('.box').offsetWidth
		const top = boxWidth * 2.01
		locationButton.style.top = `${top}px`

		locationButton.addEventListener('click', () => {
			window.open('https://maps.app.goo.gl/UaMu5wyQgMzbhMw5A?g_st=aw', '_blank')
		})

		box.appendChild(locationButton)
	}

	const addConfirmButton = () => {
		let confirmButton = document.querySelector('.confirm-button-wrapper')
		if (confirmButton) {
			confirmButton.remove()
		}
		confirmButton = document.createElement('div')
		confirmButton.classList.add('confirm-button-wrapper')
		confirmButton.innerHTML = `
      <div class="confirm-button">Confirma aquí</div>
    `
		const boxWidth = document.querySelector('.box').offsetWidth
		const top = boxWidth * 4.12
		confirmButton.style.top = `${top}px`

		const name = document.querySelector('.name').textContent
		confirmButton.addEventListener('click', () => {
			window.open(
				`https://wa.me/+573234113020?text=${name}: Confirmo asistencia`,
				'_blank'
			)
		})

		box.appendChild(confirmButton)
	}

	window.addEventListener('load', () => {
		const windowWidth = window.innerWidth
		if (windowWidth < 900) {
			box.style.width = `${windowWidth}px`
			box.style.height = `${windowWidth * ratio}px`
		} else {
			box.style.width = `900px`
			box.style.height = `${900 * ratio}px`
		}

		addName()
		addTime()
		addLocationButton()
		addConfirmButton()
	})

	window.addEventListener('beforeunload', () => {
		clearInterval(interval)
	})

	window.addEventListener('resize', () => {
		const windowWidth = window.innerWidth
		if (windowWidth < 900) {
			box.style.width = `${windowWidth}px`
			box.style.height = `${windowWidth * ratio}px`
		} else {
			box.style.width = `900px`
			box.style.height = `${900 * ratio}px`
		}
		setTimeout(() => {
			addName()
			addTime()
			addLocationButton()
			addConfirmButton()
		}, 100)
	})
})()
