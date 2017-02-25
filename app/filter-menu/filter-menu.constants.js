angular
	.module('puckalyticsMainApp')
	.constant('filterMenuConstants', {
		situation_options : [
			{
				title: '5v5 Play',
				values: [
					{ value : '5v5' , label : '5v5' },
					{ value : '5v5close' , label : '5v5 Close' },
					{ value : '5v5tied' , label : '5v5 Tied' },
					{ value : '5v5leading' , label : '5v5 Leading' },
					{ value : '5v5trailing' , label : '5v5 Trailing' },
					{ value : '5v5up1' , label : '5v5 Up1' },
					{ value : '5v5up2' , label : ' Up 2+' },
					{ value : '5v5down1' , label : '5v5 Down 1' },
					{ value : '5v5down2' , label : '5v5 Down 2+' },
				] 
			},{
				title: 'Other Situations',
				values: [
					{ value : '4v4' , label : '4v4' },
					{ value : 'all' , label : 'All Situations' },
				] 
			},{
				title: 'Home-Road Splits',
				values: [
					{ value : '5v5home' , label : '5v5 Home' },
					{ value : '5v5close_home' , label : '5v5 Close Home' },
					{ value : '5v5tied_home' , label : '5v5 Tied Home' },
					{ value : '5v5leading_home' , label : '5v5 Leading Home' },
					{ value : '5v5trailing_home' , label : '5v5 Trailing Home' },
					{ value : '5v5road' , label : '5v5 Road' },
					{ value : '5v5close_road' , label : '5v5 Close Road' },
					{ value : '5v5tied_road' , label : '5v5 Tied Road' },
					{ value : '5v5leading_road' , label : '5v5 Leading Road' },
					{ value : '5v5trailing_road' , label : '5v5 Trailing Road' },
				] 
			},
			{
				title: 'Special Teams',
				values: [
					{ value : '5v4' , label : '5v4' },
					{ value : '4v5' , label : '4v5' },
					{ value : 'PP' , label : 'All PP' },
					{ value : 'SH' , label : 'All SH' },
				] 
			},{
				title: 'Zone Start Adjusted 5v5',
				values: [
					{ value : 'f10' , label : '5v5 (ZS Adj.)' },
					{ value : '5v5home_f10' , label : '5v5 Home (ZS Adj.)' },
					{ value : '5v5road_f10' , label : '5v5 Road (ZS Adj.)' },
					{ value : '5v5close_f10' , label : '5v5 Close (ZS Adj.)' },
					{ value : '5v5tied_f10' , label : '5v5 Tied (ZS Adj.)' },
					{ value : '5v5up1_f10' , label : '5v5 Up1 (ZS Adj.)' },
					{ value : '5v5up2_f10' , label : '5v5 Up 2+ (ZS Adj.)' },
					{ value : '5v5down1_f10' , label : '5v5 Down 1 (ZS Adj.)' },
					{ value : '5v5down2_f10' , label : '5v5 Down + (ZS Adj.)' },
					{ value : '5v5leading_f10' , label : '5v5 Leading (ZS Adj.)' },
					{ value : '5v5trailing_f10' , label : '5v5 Trailing (ZS Adj.)' },
				]
			
			},{
				title: 'Even/Odd Seconds',
				values: [
					{ value : '5v5even' , label : '5v5 Even Seconds' },
					{ value : '5v5odd' , label : '5v5 Odd Seconds' },
				] 
			}
	],
	season_options : [
			{
				title: 'Single Seasons',
				values: [
					{ value : '201617' , label : '2016-17' },
					{ value : '201516' , label : '2015-16' },
					{ value : '201415' , label : '2014-15' },
					{ value : '201314' , label : '2013-14' },
					{ value : '201213' , label : '2012-13' },
					{ value : '201112' , label : '2011-12' },
					{ value : '201011' , label : '2010-11' },
					{ value : '200910' , label : '2009-10' },
					{ value : '200809' , label : '2008-09' },
					{ value : '200708' , label : '2007-08' },
				] 
			},{
				title: '2 Seasons',
				values : [
					{ value : '201517' , label : '2015-17(2yr)' },
					{ value : '201416' , label : '2014-16(2yr)' },
					{ value : '201315' , label : '2013-15(2yr)' },
					{ value : '201214' , label : '2012-14(2yr)' },
					{ value : '201113' , label : '2011-13(2yr)' },
					{ value : '201012' , label : '2010-12(2yr)' },
					{ value : '200911' , label : '2009-11(2yr)' },
					{ value : '200810' , label : '2008-10(2yr)' },
					{ value : '200709' , label : '2007-09(2yr)' }
				]
			},{
				title : "3 Seasons",
				values: [
					{value  : "201417" , label : '2014-17(3yr)'},
					{value  : "201316" , label : '2013-16(3yr)'},
					{value  : "201215" , label : '2012-15(3yr)'},
					{value  : "201114" , label : '2011-14(3yr)'},
					{value  : "201013" , label : '2010-13(3yr)'},
					{value  : "200912" , label : '2009-12(3yr)'},
					{value  : "200811" , label : '2008-11(3yr)'},
					{value  : "200710" , label : '2007-10(3yr)'},
				]
			},{
				title : "4 Seasons",
				values: [
					{value  : "201317" , label : '2013-17(4yr)'},
					{value  : "201216" , label : '2012-16(4yr)'},
					{value  : "201115" , label : '2011-15(4yr)'},
					{value  : "201014" , label : '2010-14(4yr)'},
					{value  : "200913" , label : '2009-13(4yr)'},
					{value  : "200812" , label : '2008-12(4yr)'},
					{value  : "200711" , label : '2007-11(4yr)'},
				]
			},{
				title : "5 Seasons",
				values : [
					{value  : "201015" , label : '2010-15(5yr)'},
					{value  : "200914" , label : '2009-14(5yr)'},
					{value  : "200813" , label : '2008-13(5yr)'},
					{value  : "200712" , label : '2007-12(5yr)'},
				]
			},{
				title : "6 Seasons",
				values : [
					{value  : "200915" , label : '2009-15(6yr)'},
					{value  : "200814" , label : '2008-14(6yr)'},
					{value  : "200713" , label : '2007-13(6yr)'},
				]
			}, 
			{
				title : "7 Seasons",
				values : [
					{value  : "200815" , label : '2008-15(7yr)'},
					{value  : "200714" , label : '2007-14(7yr)'},
				]
			},{
				title : "8 Seasons",
				values : [
					{value  : "200715" , label : '2007-15(8yr)'},
				]
			} 
		]
	});