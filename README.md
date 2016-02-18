# Puckalytics 2.0

Please support the on-going development of the site [via GoFundMe](https://www.gofundme.com/puckalytics).  Thank you! 

Same great data (from [David Johnson](https://twitter.com/hockeyanalysis)) with some front end tweaks (by [Derek Braid](https://twitter.com/Royal_Arse)). 

## New features: 

* charting
* sharing links to filtered tables
* custom URLs to pre-load tables


### More coming soon, please forward suggestions for improvements.

# Contribute

For local development run the following two commands in distinct terminals (*MacOSX*):

* start server `php -S localhost:3000`

* start chrome with `--disable-web-security` flag to avoid CORS blocking. Copy and Paste: `/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --disable-web-security` (else CORS blocking API call)


## To Do

* fix header so that it works on small screens

* move loading spinner on goalies and skaters to header 

* add image preview for shares (twitter card)

* when table is filtered, the chart should only display the data contained in the chart 

* create route for charts
	* display basic chart like wins, goals for, goals against.
	* generalize chart drawing to accept any facet/type of action
		* ie. ['goals', 'shots', 'corsi', 'fenwick', 'zones']

#### Skater

* add charts to skater

* style pagination buttons on skater

* move `UpdateChartData` function into service. [Code:](https://github.com/DeBraid/puck/blob/master/app/bar-chart/bar-chart.directive.js#L37)


* limit size of JSON payloads by increasing the # of endpoints
	* Skaters: breakdown based on type: ['goals', 'shots', 'corsi', 'fenwick', 'zones'], see [full list here](https://github.com/DeBraid/puck/blob/skater/app/skaters/skater_sections.txt).

### Completed TODOs

* (DONE!) fix filters and orderby for ng-repeated tables (non-hard coded: teams vs. HC goalies)

* (DONE!) Add export to .csv funcitonality to tables (must honour filters)

* (DONE!) Need a share function that has customized params in the URL. 
	* tweet api for 1-click tweets
	* button for copy/paste of url (DONE!)

*  (DONE!)what is diff b/w metrics and filter defaults?
	* need to break this out and make them identical? 
	* route params should be the same as the filter boxes (any exceptions?)
	* compile a list of endpoints (urls like ) and assign to their respective section in MainAppConstants (to re-use the new app.getData.service.js )
