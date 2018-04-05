import {html, render} from 'https://unpkg.com/lit-html@0.9.0/lib/lit-extended'

export default class extends HTMLElement {

	static get observedAttributes () {
		return [ 'name','url' ]
	}

	constructor () {
		super()
		this.setName();
		this.render();
	}

	/**
	 * render
	 */
	render() {
		const root = this.shadowRoot || this.attachShadow({mode: 'open'});
		root.innerHTML = this.html();
	}

	/**
	 * @param endpoint
	 * @returns {Promise<void>}
	 */
	async setName( endpoint ) {
		let response = await fetch( window.wpApiSettings.root );
		let data = await response.json()
		this.setAttribute('name', data.name)
		this.setAttribute('url', data.url)
	}

	/**
	 *
	 * @returns String
	 */
	html () {
		let name = this.getAttribute('name');
		if( name ) {
			return `<a href="${this.getAttribute('url')}">${this.getAttribute('name')}</a>`
		}
		return ``
	}

	// Respond to attribute changes.
	attributeChangedCallback() {
		this.render()
	}
}

