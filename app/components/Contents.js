import route from '../lib/route.js'

export default class extends HTMLElement {

	static get observedAttributes () {
	}

	constructor () {
		super()
		this.render()
	}

	async render () {
		const root = this.shadowRoot || this.attachShadow( { mode: 'open' } )
		root.innerHTML = this.html();
	}

	html ( id = 0 ) {
		let slug = '';
		const query = route();
		if (! query.matched) {
			return `<polylith-posts></polylith-posts>`
		}
		if (query.matched.name === 'post' || query.matched.name === 'page') {
			slug = query.vars[1];
			return `<polylith-post data-slug="${slug}"></polylith-post>`
		}

	}

}


