# Puckalytics 2.0

Please support the on-going development of the site [via GoFundMe](https://www.gofundme.com/puckalytics).  Thank you! 

Same great data (from [David Johnson](https://twitter.com/hockeyanalysis)) with some front end tweaks (by [Derek Braid](https://twitter.com/Royal_Arse)). 

Overhauling the routing to make pages sharable once filtered, custom URL params so you can use text-only for navigation. 

### Charts to come soon, please forward suggestions for improvements.


## Local Development 

* start server `php -S localhost:3000`

* run chrome from cmd line with: `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security` to avoid CORS blocking API call

## To Do

* limit size of JSON payloads by increasing the # of endpoints
	* Skaters: breakdown based on type: ['goals', 'shots', 'corsi', 'fenwick', 'zones'], see [full list here](https://github.com/DeBraid/puck/blob/skater/app/skaters/skater_sections.txt).

* fix filters and orderby for ng-repeated tables (non-hard coded: teams vs. HC goalies)

* create route for charts
	* display basic chart like wins, goals for, goals against.
	* generalize chart drawing to accept any facet/type of action
		* ie. ['goals', 'shots', 'corsi', 'fenwick', 'zones']


* (DONE!) Need a share function that has customized params in the URL. 
	* tweet api for 1-click tweets
	* button for copy/paste of url (DONE!)

*  (DONE!)what is diff b/w metrics and filter defaults?
	* need to break this out and make them identical? 
	* route params should be the same as the filter boxes (any exceptions?)
	* compile a list of endpoints (urls like ) and assign to their respective section in MainAppConstants (to re-use the new app.getData.service.js )