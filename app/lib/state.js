class State {


	constructor () {
		this.history = [];
	}

	push(object) {
		this.history.push( object );
	}

}

export default new State();
