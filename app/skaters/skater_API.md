## Purposed Puckalytics API: 

Given our sections: ['goals', corsi' , 'fenwick', etc ]

the payload for a given `section`, ie. *fenwick*, would be a JSON object, with properties: 

```javascript
{
	metrics : [ 'FF', 'FA', 'FF60', etc ],
	players : [ {}, {}, {}, etc ],
	is_shown : boolean ,
	is_loaded : boolean ,
}
```

* `is_shown` can be stored on `$scope` and used toggle visibility.
* `is_loaded` tells the front-end not to make another API call, just flip `is_shown` from `false` to `true`.
* `metrics` is an array of strings which make up the keys for our `player` data, below, and are the headings for the columns (keys used in `ng-repeat`'s in the html. 

* `players[0]` is an array of Objects, each with two (three?) properties : 

```javascript
{
	PID: '4312355231',
	player: [ {}, {}, {} ],
	is_shown : boolean , // optional, replaces checkboxFilter?
}
```

and `player`, and `Object`, with properties for each `section.metric` (above): 

```javascript
{
	FA: 44
}, 
{
	FF: 41
},
{
	FF60: 2.22
},
{
	etc
}

```