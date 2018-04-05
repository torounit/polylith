import pathToRegexp from 'https://unpkg.com/@basaltjs/path-to-regexp-es6@1.7.0/index.js'

const route = () => {
	let vars = null;
	let query = window.polylith.permastructs.find( function( permastruct ) {
		let re = pathToRegexp( permastruct.struct )
		vars = re.exec(location.pathname)
		return vars;
	} );

	return {
		matched: query,
		vars: vars
	}
};

export default route;
