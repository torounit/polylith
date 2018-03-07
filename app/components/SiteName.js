import {html, render} from 'https://unpkg.com/lit-html@0.9.0/lib/lit-extended'

export default class extends HTMLElement {

	static get observedAttributes () {
		return [ 'name' ]
	}

	constructor () {
		super()
		this.setName()
	}

	/**
	 * render
	 */
	render() {
		render((this.html()), this.shadowRoot || this.attachShadow({mode: 'open'}))
	}

	/**
	 * @param endpoint
	 * @returns {Promise<void>}
	 */
	async setName( endpoint ) {
		let response = await fetch( window.wpApiSettings.root );
		let data = await response.json()
		this.setAttribute('name', data.name)
	}

	/**
	 *
	 * @returns TemplateResult
	 */
	html () {
		return html`<span>${this.getAttribute('name')}</span>`
	}

	// Respond to attribute changes.
	attributeChangedCallback() {
		this.render()
	}
}

