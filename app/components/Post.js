export default class extends HTMLElement {

	static get observedAttributes () {
		return [
			'data-slug',
			'data-id'
		]
	}

	constructor () {
		super()
		this.render()
	}

	async render () {
		const root = this.shadowRoot || this.attachShadow( { mode: 'open' } )
		let param = {};
		if ( this.getAttribute( 'data-slug' ) ) {
			param = { slug: this.getAttribute( 'data-slug' ) }
		}
		const post = await (new wp.api.collections.Posts()).fetch(  { data: {slug: this.getAttribute( 'data-slug' )} } )
		root.innerHTML = this.html( post[0] );
	}

	html ( { title, content } ) {
		return `
		<article>
			<h2>${title.rendered}</h2>
			${content.rendered}
		</article>`
	}
}

