'use strict';


app.service( 'checkToken' , [ 'store' , 'jwtHelper', function( store , jwtHelper) {

	var token = store.get( 'token' );
	console.log(token);
	if ( token )
		token = jwtHelper.decodeToken( token );
	else
		token = false;
	this.payload = function () {
		return token;
	};

	this.loggedIn = function () {
		console.log(token);
		if ( token )
			return true;
		else
			return false;
	};

	this.isAdmin = function () {
		if ( token.role == 'admin' )
			return true;
		else
			return false;
	};

	this.raw = function () {
		return store.get( 'token' );
	};

	this.del = function () {
		store.remove( 'token' );
	};

	this.getTime = function()
	{
		return time;
	};

}]);