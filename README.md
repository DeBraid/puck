# Puckalytics 2.0

Same great data with some front end tweaks like using URLs to control data filtering.  Charts to come, suggestions welcome.

## Getting started.

* start server `php -S localhost:3000`

* run chrome from cmd line with: `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security` to avoid CORS blocking API call

## To Do

* fix filters and orderby for ng-repeated tables (non-hard coded: teams vs. HC goalies)
* create route for charts
	* display basic chart like wins, goals for, goals against.
	* generalize chart drawing to accept any facet/type of action
		* ie. ['goals', 'shots', 'corsi', 'fenwick', 'zones']

* Need a share function that has customized params in the URL.
	* tweet api for 1-click tweets
	* input box for copy/paste of url
* what is diff b/w metrics and filter defaults?
	* need to break this out and make them identical? 
	* route params should be the same as the filter boxes (any exceptions?)
	* compile a list of endpoints (urls like ) and assign to their respective section in MainAppConstants (to re-use the new app.getData.service.js )

* limit size of JSON payload by increasing the # of endpoints
	* breakdown based on type: ['goals', 'shots', 'corsi', 'fenwick', 'zones']