import {html, render} from 'https://unpkg.com/lit-html@0.9.0/lib/lit-extended'
import {repeat} from 'https://unpkg.com/lit-html@0.9.0/lib/repeat.js'

export default class extends HTMLElement {

	static get observedAttributes () {
		return [
			'data-posts'
		]
	}

	constructor () {
		super()
		this.render()
	}

	async render () {
		const root = this.shadowRoot || this.attachShadow( { mode: 'open' } )
		const posts = await (new wp.api.collections.Posts()).fetch()
		render( this.html( posts ), root )
	}

	html ( posts ) {
		return html`
		  <ul>
			${ repeat( posts, ( i ) => i.id, ( { title, content, link, id } ) => html`
			  <li><a href="${link}" on-click="${(event) => this.onClick(event)}">${title.rendered}</a></li>` )}
		  </ul>
		`;
	}

	onClick ( event ) {
		//event.preventDefault();
		//window.history.pushState( {}, null, event.currentTarget.getAttribute( 'href' ) );
	}
}


