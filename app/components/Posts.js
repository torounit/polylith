import {html, render} from 'https://unpkg.com/lit-html@0.9.0/lib/lit-extended'

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
		const posts = await (new wp.api.collections.Posts()).fetch()
		let contents = html( posts.map( post => this.html( post ) ) );
		render( contents, this.shadowRoot || this.attachShadow( { mode: 'open' } ) )
	}

	html ( { title, content, link } ) {
		return `
		<article>
			<h2><a href="${link}">${title.rendered}</a></h2>
			<div>${content.rendered}</div>
		</article>
		`
	}
}


