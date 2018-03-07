import {html, render} from 'https://unpkg.com/lit-html@0.9.0/lib/lit-extended'

export default class extends HTMLElement {

	constructor () {
		super()
		this.render()
	}

	async render () {
		$post = this.html();
		render( $post, this.shadowRoot || this.attachShadow( { mode: 'open' } ) )
	}

	html () {
		return html`<article>1</article>`
	}
}

