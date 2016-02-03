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

where `players[0]` is : 

```javascript
{
	PID: '4312355231',
	player: [ {}, {}, {} ],
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