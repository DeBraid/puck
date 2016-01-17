
angular
	.module('puckalyticsMainApp.getParamsFromUrl', [])
	.factory('getParamsFromUrl', [ 
		urlParamsToScopeFactory 
	]);

function urlParamsToScopeFactory () {
	return {
		get : params_to_scope_fn
	}
	
	function params_to_scope_fn (params, _scope) {
		if (!params) { return; }

		for(param in params) {
		    if (param.length) {
				_scope[param] = params[param];	
		    };
		}		
	}
}