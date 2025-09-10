const app = Vue.createApp({
	data() {
		return {
			freeIp: 0,
			displayedList: [],
			nonWorkingList: [],
			ipUsed: [],
		}
	},
	methods: {
		addIp(idx) {
			const ip = this.displayedList[idx]

			if (this.nonWorkingList.includes(ip)) {
				this.toggleNonWorking(ip)
				return
			}

			if (this.ipUsed.includes(ip)) {
				const index = this.ipUsed.indexOf(ip)
				this.ipUsed.splice(index, 1)
			} else {
				this.ipUsed.push(ip)
			}

			localStorage.setItem('ipUsed', JSON.stringify(this.ipUsed))
		},

		getFreeIp() {
			const freeList = this.displayedList.filter(
				el => !this.ipUsed.includes(el) && !this.nonWorkingList.includes(el)
			)

			if (freeList.length === 0) {
				this.freeIp = null
				return null
			}

			const randomIndex = Math.floor(Math.random() * freeList.length)
			this.freeIp = freeList[randomIndex]

			return this.freeIp
		},

		addNonWorking() {
			if (!this.freeIp) return
			this.toggleNonWorking(this.freeIp)
		},

		toggleNonWorking(ip) {
			const index = this.nonWorkingList.indexOf(ip)

			if (index === -1) {
				this.nonWorkingList.push(ip)
			} else {
				this.nonWorkingList.splice(index, 1)
			}

			localStorage.setItem(
				'nonWorkingList',
				JSON.stringify(this.nonWorkingList)
			)
		},

		getButtonStyle(ip) {
			if (this.nonWorkingList.includes(ip)) {
				return { backgroundColor: '#b33b3b', color: '#fafaf5' }
			}
			if (this.ipUsed.includes(ip)) {
				return { opacity: 0.35 }
			}
			return { backgroundColor: '#48bb59', color: '#fafaf5' }
		},
	},
	mounted() {
		for (let i = 1; i < 256; i++) {
			this.displayedList.push(i)
		}

		const usedIpList = JSON.parse(localStorage.getItem('ipUsed'))
		if (usedIpList) {
			this.ipUsed = usedIpList
		}

		const nonWorking = JSON.parse(localStorage.getItem('nonWorkingList'))
		if (nonWorking) {
			this.nonWorkingList = nonWorking
		}

		this.getFreeIp()
	},
})

app.mount('#root')
