$.continuousCalendar={};$.continuousCalendar.version="3.0.2";$.continuousCalendar.released="2013-04-13";(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery"],b)}else{a.DateTime=b(a.jQuery)}})(this,function(b){var c=function(i,j,g,f,h,k){if(arguments.length==0){this.date=new Date()}else{if(i instanceof Date){this.date=new Date(i.getTime())}else{if(typeof i=="string"){this.date=new Date(i)}else{if(typeof i=="number"){this.date=e(i,j-1,g,f,h,k)}else{throw Error("None of supported parameters was used for constructor: "+Array.prototype.slice.call(arguments).join(", "))}}}}function e(p,q,n,m,o,r){r=r||0;var l=new Date(p,q,n,m,o,r||0,0);if(l.toString()=="Invalid Date"||q!=l.getMonth()||p!=l.getFullYear()||n!=l.getDate()||m!=l.getHours()||o!=l.getMinutes()||r!=l.getSeconds()){throw Error("Invalid Date: "+p+"/"+q+"/"+n+" "+m+":"+o+":"+r)}return l}};c.SUNDAY=0;c.MONDAY=1;c.TUESDAY=2;c.WEDNESDAY=3;c.THURSDAY=4;c.FRIDAY=5;c.SATURDAY=6;b.each(["getTime","getFullYear","getDate","getDay","getHours","getMinutes","getSeconds","getMilliseconds"],function(f,e){c.prototype[e]=function(){return this.date[e]()}});c.fromDateTime=function(h,i,f,e,g){return new c(h,i,f,e,g)};c.fromDate=function(f,g,e){return c.fromDateTime(f,g,e,0,0)};c.fromDateObject=function(e){return c.fromMillis(e.getTime())};c.prototype.toISOString=function(){return b.map([this.getFullYear(),(this.getMonth()),this.getDate()],e).join("-")+"T"+b.map([this.getHours(),this.getMinutes(),this.getSeconds()],e).join(":");function e(f){return f<10?"0"+f:""+f}};c.prototype.getMonth=function(){return this.date.getMonth()+1};c.fromIsoDate=function(e){var g=/^\d{4}-[01]\d-[0-3]\d(T[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))?$/;if(!g.test(e)){throw Error(e+" is not valid ISO Date (YYYY-MM-DD or YYYY-MM-DDTHH:MM)")}var f=d(e.split("T")[0]);return c.fromDate(f.year,f.month,f.day)};c.fromIsoDateTime=function(f){var i=/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?)/;if(!i.test(f)){throw Error(f+" is not valid ISO Date (YYYY-MM-DDTHH:MM)")}var h=f.split("T");var g=a(h.length==2&&h[1]);var e=d(h[0]);return new c(e.year,e.month,e.day,g.hours,g.minutes,g.seconds)};function d(f){var e=f.split("-");return{year:+e[0],month:+e[1],day:+e[2]}}function a(e){if(e){var f=e.split(":");return{hours:+f[0],minutes:+f[1],seconds:+f[2]||0}}else{return{hours:0,minutes:0}}}c.prototype.withResetMS=function(){var e=this.clone();e.date.setMilliseconds(0);return e};c.prototype.withTime=function(g,f){if(typeof g=="string"){var e=g.split(":");g=e[0];f=e[1]}var i=this.clone();i.date.setHours(g);i.date.setMinutes(f);i.date.setSeconds(0);i.date.setMilliseconds(0);return i};c.SECOND=1000;c.MINUTE=60*c.SECOND;c.HOUR=60*c.MINUTE;c.DAY=24*c.HOUR;c.WEEK=7*c.DAY;c.now=function(){if(typeof c._now=="undefined"){c._now=new c()}return c._now};c.getDaysInMonth=function(f,g){if(g>12||g<1){throw new Error("Month must be between 1-12")}var e=f*12+g;return c.fromDate(Math.floor(e/12),e%12+1,1).minusDays(1).getDate()};c.getDayInYear=function(f,g,e){return c.fromDate(f,1,1).distanceInDays(c.fromDate(f,g,e))+1};c.prototype.getDaysInMonth=function(){return c.getDaysInMonth(this.getFullYear(),this.getMonth())};c.prototype.getDayInYear=function(){return c.getDayInYear(this.getFullYear(),this.getMonth(),this.getDate())};c.prototype.plusDays=function(h){var f=this.clone();var e=this.getHours();f.date.setTime(this.getTime()+h*c.DAY);var g=e-f.getHours();if(g!=0){if(g>12){g-=24}if(g<-12){g+=24}f.date.setTime(f.getTime()+(g*c.HOUR))}return f};c.prototype.minusDays=function(e){return this.plusDays(-e)};c.prototype.compareTo=function(f){if(!f){return 1}var e=this.getTime();var g=f.getTime();if(e<g){return -1}else{if(e>g){return 1}else{return 0}}};c.prototype.isToday=function(){return this.equalsOnlyDate(c.now())};c.prototype.getWeekInYear=function(f){if(f!="US"&&f!="ISO"){throw ("Week numbering system must be either US or ISO, was "+f)}var e=new Date(this.getFullYear(),0,1).getDay();if(f=="US"){return Math.ceil((this.getDayInYear()+e)/7)}var i=4;var h=this.getDay();if(h==0){h=7}if(e==0){e=7}if(this.getMonth()==12&&this.getDate()>=29&&(this.getDate()-h)>27){return 1}if(this.getMonth()==1&&this.getDate()<4&&h>i){return new c(new Date(this.getFullYear()-1,11,31)).getWeekInYear("ISO")}var g=Math.ceil((this.getDayInYear()+e-1)/7);if(e>i){g--}return g};c.prototype.clone=function(){return new c(this.date)};c.fromMillis=function(e){return new c(new Date(e))};c.prototype.isOddMonth=function(){return this.getMonth()%2==0};c.prototype.equalsOnlyDate=function(e){if(!e){return false}return this.getMonth()==e.getMonth()&&this.getDate()==e.getDate()&&this.getFullYear()==e.getFullYear()};c.prototype.isBetweenDates=function(f,e){if(f.getTime()>e.getTime()){throw Error("start date can't be after end date")}return this.compareTo(f)>=0&&this.compareTo(e)<=0};c.prototype.firstDateOfMonth=function(){return c.fromDate(this.getFullYear(),this.getMonth(),1)};c.prototype.lastDateOfMonth=function(){return c.fromDate(this.getFullYear(),this.getMonth(),this.getDaysInMonth())};c.prototype.distanceInDays=function(e){var g=parseInt(this.getTime()/c.DAY,10);var f=parseInt(e.getTime()/c.DAY,10);return(f-g)};c.prototype.withWeekday=function(e){return this.plusDays(e-this.getDay())};c.prototype.getOnlyDate=function(){return c.fromDate(this.getFullYear(),this.getMonth(),this.getDate())};c.prototype.isWeekend=function(){return this.getDay()==6||this.getDay()==0};c.prototype.toString=function(){return this.toISOString()};c.prototype.getFirstDateOfWeek=function(e){var f=e?e.firstWeekday:c.MONDAY;if(f<this.getDay()){return this.plusDays(f-this.getDay())}else{if(f>this.getDay()){return this.plusDays(f-this.getDay()-7)}else{return this.clone()}}};c.daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];c.y2kYear=50;c.monthNumbers={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};return c});(function(a,b){if(typeof define==="function"&&define.amd){define(["./DateTime"],b)}else{a.DateFormat=b(a.DateTime)}})(this,function(DateTime){var DateFormat={};DateFormat.parseFunctions={count:0};DateFormat.parseRegexes=[];DateFormat.formatFunctions={count:0};DateFormat.hoursAndMinutes=function(hours,minutes){return(Math.round((hours+minutes/60)*100)/100).toString()};DateFormat.format=function(dateTime,format,locale){if(DateFormat.formatFunctions[format]==null){DateFormat.createNewFormat(dateTime,format,locale)}var func=DateFormat.formatFunctions[format];return dateTime[func]()};DateFormat.shortDateFormat=function(dateTime,locale){return DateFormat.format(dateTime,locale?locale.shortDateFormat:"n/j/Y",locale)};DateFormat.formatRange=function(dateRange,locale){if(dateRange._hasTimes){return locale.daysLabel(dateRange.days())+" "+locale.hoursLabel(dateRange.hours(),dateRange.minutes())}else{return DateFormat.shortDateFormat(dateRange.start,locale)+" - "+DateFormat.shortDateFormat(dateRange.end,locale)}};DateFormat.formatDefiningRangeDuration=function(dateRange,locale){var years=parseInt(dateRange.days()/360,10);if(years>0){return locale.yearsLabel(years)}var months=parseInt(dateRange.days()/30,10);if(months>0){return locale.monthsLabel(months)}return locale.daysLabel(dateRange.days())};DateFormat.getGMTOffset=function(dateTime){return(dateTime.date.getTimezoneOffset()>0?"-":"+")+DateFormat.leftPad(Math.floor(dateTime.getTimezoneOffset()/60),2,"0")+DateFormat.leftPad(dateTime.getTimezoneOffset()%60,2,"0")};DateFormat.leftPad=function(val,size,ch){var result=String(val);if(ch==null){ch=" "}while(result.length<size){result=ch+result}return result};DateFormat.escape=function(string){return string.replace(/('|\\)/g,"\\$1")};DateFormat.parse=function(input,locale){if(input=="today"){return DateTime.now()}var date=new Date(input);if(isNaN(date.getTime())){throw Error('Could not parse date from "'+input+'"')}return new DateTime(date,locale)};DateFormat.patterns={ISO8601LongPattern:"Y-m-d H:i:s",ISO8601ShortPattern:"Y-m-d",ShortDatePattern:"n/j/Y",FiShortDatePattern:"j.n.Y",FiWeekdayDatePattern:"D j.n.Y",FiWeekdayDateTimePattern:"D j.n.Y k\\lo G:i",LongDatePattern:"l, F d, Y",FullDateTimePattern:"l, F d, Y g:i:s A",MonthDayPattern:"F d",ShortTimePattern:"g:i A",LongTimePattern:"g:i:s A",SortableDateTimePattern:"Y-m-d\\TH:i:s",UniversalSortableDateTimePattern:"Y-m-d H:i:sO",YearMonthPattern:"F, Y"};DateFormat.parseTime=function(timeStr){var splittedTime=splitTime(timeStr.replace(/:|,/i,"."));var time=[+(splittedTime[0]),+(splittedTime[1])];return(isHour(time[0])&&isMinute(time[1]))?time:null;function splitTime(timeStr){if(timeStr.indexOf(".")!=-1){return timeStr.split(".")}switch(timeStr.length){case 4:return[timeStr.slice(0,2),timeStr.slice(2,4)];case 3:return[timeStr.slice(0,1),timeStr.slice(1,3)];case 2:return[timeStr,0];default:return[-1,-1]}}function isMinute(minutes){return !isNaN(minutes)&&minutes>=0&&minutes<=59}function isHour(hours){return !isNaN(hours)&&hours>=0&&hours<=23}};DateFormat.createNewFormat=function(dateTime,format,locale){var funcName="format"+DateFormat.formatFunctions.count++;DateFormat.formatFunctions[format]=funcName;var code="DateTime.prototype."+funcName+" = function(){return ";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true}else{if(special){special=false;code+="'"+DateFormat.escape(ch)+"' + "}else{code+=DateFormat.getFormatCode(ch,locale)}}}eval(code.substring(0,code.length-3)+";}")};DateFormat.getFormatCode=function(character){switch(character){case"d":return"DateFormat.leftPad(this.getDate(), 2, '0') + ";case"D":return"locale.shortDayNames[this.getDay()] + ";case"j":return"this.getDate() + ";case"l":return"locale.dayNames[this.getDay()] + ";case"w":return"this.getDay() + ";case"z":return"this.getDayInYear() + ";case"F":return"locale.monthNames[this.getMonth()-1] + ";case"m":return"DateFormat.leftPad(this.getMonth(), 2, '0') + ";case"M":return"locale.monthNames[this.getMonth()-1].substring(0, 3) + ";case"n":return"(this.getMonth()) + ";case"t":return"this.getDaysInMonth() + ";case"Y":return"this.getFullYear() + ";case"y":return"('' + this.getFullYear()).substring(2, 4) + ";case"a":return"(this.getHours() < 12 ? 'am' : 'pm') + ";case"A":return"(this.getHours() < 12 ? 'AM' : 'PM') + ";case"g":return"((this.getHours() %12) ? this.getHours() % 12 : 12) + ";case"G":return"this.getHours() + ";case"h":return"DateFormat.leftPad((this.getHours() %12) ? this.getHours() % 12 : 12, 2, '0') + ";case"H":return"DateFormat.leftPad(this.getHours(), 2, '0') + ";case"i":return"DateFormat.leftPad(this.getMinutes(), 2, '0') + ";case"s":return"DateFormat.leftPad(this.getSeconds(), 2, '0') + ";case"O":return"DateFormat.getGMTOffset(this) + ";case"Z":return"(this.getTimezoneOffset() * -60) + ";default:return"'"+DateFormat.escape(character)+"' + "}};return DateFormat});(function(a,b){if(typeof define==="function"&&define.amd){define(["./DateTime","./DateFormat"],b)}else{a.DateLocale=b(a.DateTime,a.DateFormat)}})(this,function(b,a){var c={FI:{id:"FI",monthNames:["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],dayNames:["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"],shortDayNames:["su","ma","ti","ke","to","pe","la"],yearsLabel:function(d){return d+" "+(d=="1"?"vuosi":"vuotta")},monthsLabel:function(d){return d+" "+(d=="1"?"kuukausi":"kuukautta")},daysLabel:function(d){return d+" "+(d=="1"?"päivä":"päivää")},hoursLabel:function(e,f){var d=a.hoursAndMinutes(e,f).replace(".",",");return d+" "+(d=="1"?"tunti":"tuntia")},shortDateFormat:"j.n.Y",weekDateFormat:"D j.n.Y",dateTimeFormat:"D j.n.Y k\\lo G:i",firstWeekday:b.MONDAY},EN:{id:"EN",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],yearsLabel:function(d){return d+" "+(d=="1"?"Year":"Years")},monthsLabel:function(d){return d+" "+(d=="1"?"Months":"Months")},daysLabel:function(d){return d+" "+(d=="1"?"Day":"Days")},hoursLabel:function(e,f){var d=a.hoursAndMinutes(e,f);return d+" "+(d=="1"?"Hour":"Hours")},shortDateFormat:"n/j/Y",weekDateFormat:"D n/j/Y",dateTimeFormat:"D n/j/Y G:i",firstWeekday:b.SUNDAY},AU:{id:"AU",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],yearsLabel:function(d){return d+" "+(d=="1"?"Year":"Years")},monthsLabel:function(d){return d+" "+(d=="1"?"Months":"Months")},daysLabel:function(d){return d+" "+(d=="1"?"Day":"Days")},hoursLabel:function(e,f){var d=a.hoursAndMinutes(e,f);return d+" "+(d=="1"?"Hour":"Hours")},shortDateFormat:"j/n/Y",weekDateFormat:"D j/n/Y",dateTimeFormat:"D j/n/Y G:i",firstWeekday:b.SUNDAY},ET:{id:"ET",monthNames:["Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni","Juuli","August","September","Oktoober","November","Detsember"],dayNames:["Pühapäev","Esmaspäev","Teisipäev","Kolmapäev","Neljapäev","Reede","Laupäev"],shortDayNames:["P","E","T","K","N","R","L"],yearsLabel:function(d){return d+" "+(d=="1"?"Aasta":"Aastat")},monthsLabel:function(d){return d+" "+(d=="1"?"Kuu":"Kuud")},daysLabel:function(d){return d+" "+(d=="1"?"Päev":"Päeva")},hoursLabel:function(e,f){var d=a.hoursAndMinutes(e,f).replace(".",",");return d+" "+(d=="1"?"Tund":"Tundi")},shortDateFormat:"j.n.Y",weekDateFormat:"D j.n.Y",dateTimeFormat:"D j.n.Y k\\l G:i",firstWeekday:b.MONDAY},RU:{id:"RU",monthNames:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],dayNames:["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],shortDayNames:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],yearsLabel:function(d){return d+" "+(d=="1"?"Год":"Года")},monthsLabel:function(d){return d+" "+(d=="1"?"Месяц":"Месяца")},daysLabel:function(d){return d+" "+(d=="1"?"День":"Дня")},hoursLabel:function(e,f){var d=a.hoursAndMinutes(e,f).replace(".",",");return d+" "+(d=="1"?"Минута":"Минуты")},shortDateFormat:"j.n.Y",weekDateFormat:"D j.n.Y",dateTimeFormat:"D j.n.Y k\\lo G:i",firstWeekday:b.MONDAY},SV:{id:"SV",monthNames:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],dayNames:["Söndag","Måndag","Tisdag","Onsdag","Torsdag","Fredag","Lördag"],shortDayNames:["Sö","Må","Ti","On","To","Fr","Lö"],yearsLabel:function(d){return d+" "+(d=="1"?"År":"År")},monthsLabel:function(d){return d+" "+(d=="1"?"Månad":"Månader")},daysLabel:function(d){return d+" "+(d=="1"?"Dag":"Dagar")},hoursLabel:function(e,f){var d=a.hoursAndMinutes(e,f).replace(".",",");return d+" "+(d=="1"?"Minut":"Minuter")},shortDateFormat:"j.n.Y",weekDateFormat:"D j.n.Y",dateTimeFormat:"D j.n.Y k\\lo G:i",firstWeekday:b.MONDAY}};c.fromArgument=function(d){if(typeof d=="string"){return c[d.toUpperCase()]}else{return d}};return c});(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","./DateTime","./DateFormat"],b)}else{a.DateRange=b(a.jQuery,a.DateTime,a.DateFormat)}})(this,function(b,c,a){function d(f,e){if(!f||!e){throw ("two dates must be specified, date1="+f+", date2="+e)}this.start=(f.compareTo(e)>0?e:f);this.end=(f.compareTo(e)>0?f:e);this._days=0;this._hours=0;this._minutes=0;this._valid=true}d.prototype={_setDaysHoursAndMinutes:function(){if(this._hasTimes){var e=parseInt((this.end.getTime()-this.start.getTime()),10);this._days=parseInt(e/c.DAY,10);e=e-(this._days*c.DAY);this._hours=parseInt(e/c.HOUR,10);e=e-(this._hours*c.HOUR);this._minutes=parseInt(e/c.MINUTE,10)}},_dateWithTime:function(e,f){return e.withTime(f[0],f[1])},hours:function(){return this._hours},minutes:function(){return this._minutes},hasDate:function(e){return e.isBetweenDates(this.start,this.end)},isValid:function(){return this._valid&&this.end.getTime()-this.start.getTime()>=0},days:function(){return this._hasTimes?this._days:Math.round(this.start.distanceInDays(this.end)+1)},shiftDays:function(e){return new d(this.start.plusDays(e),this.end.plusDays(e))},expandTo:function(f){var e=this.start.clone();var g=this.end.clone();if(f.compareTo(this.start)<0){e=f}else{if(f.compareTo(this.end)>0){g=f}}return new d(e,g)},expandDaysTo:function(e){return new d(this.start,this.start.plusDays(e-1))},hasValidSize:function(e){return e<0||this.days()>=e},hasValidSizeAndEndsOnWorkWeek:function(e){return this.hasValidSize(e)&&this.hasEndsOnWeekend()},and:function(e){var g=this.start.compareTo(e.start)>0?this.start:e.start;var f=this.end.compareTo(e.end)>0?e.end:this.end;return g.compareTo(f)<0?new d(g,f):d.emptyRange()},isInside:function(e){return this.start.compareTo(e.start)>=0&&this.end.compareTo(e.end)<=0},hasEndsOnWeekend:function(){return this.start.isWeekend()||this.end.isWeekend()},withTimes:function(i,h){var g=a.parseTime(i);var e=a.parseTime(h);var f=this.clone();if(g&&e){f._valid=true;f._hasTimes=true;f.start=this._dateWithTime(this.start,g);f.end=this._dateWithTime(this.end,e);f._setDaysHoursAndMinutes()}else{f._valid=false}return f},clone:function(){return new d(this.start,this.end)},toString:function(){return["DateRange:",this.start.toString(),"-",this.end.toString(),this._days,"days",this._hours,"hours",this._minutes,"minutes",this._valid?"valid":"invalid"].join(" ")},isPermittedRange:function(g,e,f){return this.hasValidSize(g)&&(!(e&&this.hasEndsOnWeekend()))&&this.isInside(f)},shiftInside:function(f){if(this.days()>f.days()){return d.emptyRange()}var g=this.start.distanceInDays(f.start);var e=this.end.distanceInDays(f.end);if(g>0){return this.shiftDays(g)}if(e<0){return this.shiftDays(e)}return this}};d=b.extend(d,{emptyRange:function(){function e(){this.start=null;this.end=null;this.days=function(){return 0};this.shiftDays=b.noop;this.hasDate=function(){return false};this.clone=function(){return d.emptyRange()};this.expandDaysTo=function(){return this};this.hasEndsOnWeekend=function(){return false};this.isPermittedRange=function(){return true}}return new e()},rangeWithMinimumSize:function(k,j,f,i){if(g()){var e=k.expandDaysTo(j);if(f&&e.hasEndsOnWeekend()){var h=e.shiftDays(l(e.end.getDay())).shiftInside(i);while(!h.isPermittedRange(j,f,i)||h.end.compareTo(i.end)>0){if(!h.isPermittedRange(j,false,i)){return d.emptyRange()}h=h.shiftDays(1)}e=h}if(!e.isPermittedRange(j,false,i)){return d.emptyRange()}return e}return k;function g(){return j&&k.days()<=j}function l(m){return -((m+1)%7+1)}}});return d})
/*!
 * Tiny Scrollbar 1.66
 * http://www.baijs.nl/tinyscrollbar/
 *
 * Copyright 2010, Maarten Baijs
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Date: 13 / 11 / 2011
 * Depends on library: jQuery
 * 
 */
;(function(a){a.tiny=a.tiny||{};a.tiny.scrollbar={options:{axis:"y",wheel:40,scroll:true,size:"auto",sizethumb:"auto"}};a.fn.tinyscrollbar=function(c){var c=a.extend({},a.tiny.scrollbar.options,c);this.each(function(){a(this).data("tsb",new b(a(this),c))});return this};a.fn.tinyscrollbar_update=function(c){return a(this).data("tsb").update(c)};function b(p,f){var j=this;var s=p;var i={obj:a(".viewport",p)};var g={obj:a(".overview",p)};var d={obj:a(".scrollbar",p)};var l={obj:a(".track",d.obj)};var o={obj:a(".thumb",d.obj)};var k=f.axis=="x",m=k?"left":"top",u=k?"Width":"Height";var q,x={start:0,now:0},n={};function c(){j.update();r();return j}this.update=function(B){var C=f.axis;i[C]=i.obj[0]["offset"+u];g[C]=g.obj[0]["scroll"+u];var D=g[C];var y=i[C];g.ratio=y/D;d.obj.toggleClass("disable",g.ratio>=1);l[C]=f.size=="auto"?y:f.size;var z=l[C];o[C]=Math.min(z,Math.max(0,(f.sizethumb=="auto"?(z*g.ratio):f.sizethumb)));var A=o[C];d.ratio=f.sizethumb=="auto"?(D/z):(D-y)/(z-A);q=(B=="relative"&&g.ratio<=1)?Math.min((D-y),Math.max(0,q)):0;q=(B=="bottom"&&g.ratio<=1)?(D-y):isNaN(parseInt(B,10))?q:parseInt(B,10);v()};function v(){o.obj.css(m,q/d.ratio);g.obj.css(m,-q);n.start=o.obj.offset()[m];var y=u.toLowerCase();d.obj.css(y,l[f.axis]);l.obj.css(y,l[f.axis]);o.obj.css(y,o[f.axis])}function r(){o.obj.bind("mousedown",h);o.obj[0].ontouchstart=function(y){y.preventDefault();o.obj.unbind("mousedown");h(y.touches[0]);return false};l.obj.bind("mouseup",t);if(f.scroll&&this.addEventListener){s[0].addEventListener("DOMMouseScroll",w,false);s[0].addEventListener("mousewheel",w,false)}else{if(f.scroll){s[0].onmousewheel=w}}}function h(z){n.start=k?z.pageX:z.pageY;var y=parseInt(o.obj.css(m),10);x.start=y=="auto"?0:y;a(document).bind("mousemove",t);document.ontouchmove=function(A){a(document).unbind("mousemove");t(A.touches[0])};a(document).bind("mouseup",e);o.obj.bind("mouseup",e);o.obj[0].ontouchend=document.ontouchend=function(A){a(document).unbind("mouseup");o.obj.unbind("mouseup");e(A.touches[0])};return false}function w(z){if(!(g.ratio>=1)){s.trigger("scroll");z=z||window.event;var y=z.wheelDelta?z.wheelDelta/120:-z.detail/3;q-=y*f.wheel;q=Math.min((g[f.axis]-i[f.axis]),Math.max(0,q));o.obj.css(m,q/d.ratio);g.obj.css(m,-q);z=a.event.fix(z);z.preventDefault()}}function e(){a(document).unbind("mousemove",t);a(document).unbind("mouseup",e);o.obj.unbind("mouseup",e);document.ontouchmove=o.obj[0].ontouchend=document.ontouchend=null;return false}function t(y){s.trigger("scroll");if(!(g.ratio>=1)){x.now=Math.min((l[f.axis]-o[f.axis]),Math.max(0,(x.start+((k?y.pageX:y.pageY)-n.start))));q=x.now*d.ratio;g.obj.css(m,-q);o.obj.css(m,x.now)}return false}return c()}})(jQuery);(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","./DateFormat","./DateLocale","./DateRange","./DateTime"],b)}else{a.CalendarBody=b(a.jQuery,a.DateFormat,a.DateLocale,a.DateRange,a.DateTime)}})(this,function(b,a,e,d,c){return function(l,x,w,u,j,h){var k={};var A=[];var t=b('<table class="calendarHeader">').append(y());var i=b('<table class="calendarBody">').append(p());var z=b('<div class="calendarScrollContent">').append(i);l.append(t);if(u){i.addClass("overview");z.addClass("viewport");l.append(b('<div class="tinyscrollbar"></div>').append('<div class="scrollbar"> <div class="track"> <div class="thumb"> <div class="end"></div> </div> </div> </div>').append(z))}else{l.append(z)}var o=b("td.date",l).get();n(k);var v=b("th.month",t);return{bodyTable:i,scrollContent:z,dateCells:o,yearTitle:v,dateCellMap:k,dateCellDates:A,dateStyles:m,getDateCell:f};function y(){var B=b('<tr><th class="month"></th><th class="week">&nbsp;</th>');b(w.dayNames).each(function(D){var C=b("<th>").append(w.shortDayNames[(D+w.firstWeekday)%7]).addClass("weekDay");B.append(C)});return b("<thead>").append(B)}function n(C){var B=a.format(c.now(),"Ymd",w);if(B in C){f(C[B]).addClass("today").wrapInner("<div>")}}function p(){var C=x.start.getFirstDateOfWeek(w);var B=true;var E=[];while(C.compareTo(x.end)<=0){D(E,C.clone(),B);B=false;C=C.plusDays(7)}return"<tbody>"+E.join("")+"</tbody>";function D(M,J,I){M.push("<tr>");M.push(F(J,I));M.push(G(J));for(var L=0;L<7;L++){var K=J.plusDays(L);M.push(H(K))}M.push("</tr>")}function H(I){var J='<td class="'+m(I)+'" date-cell-index="'+A.length+'">'+I.getDate()+"</td>";k[a.format(I,"Ymd",w)]=A.length;A.push(I);return J}function F(J,I){var K='<th class="month '+g(J);if(I||J.getDate()<=7){K+=' monthName">';K+=w.monthNames[J.getMonth()-1]}else{K+='">';if(J.getDate()<=7*2&&J.getMonth()==1){K+=J.getFullYear()}}return K+"</th>"}function G(I){return'<th class="week '+g(I)+'">'+I.getWeekInYear("ISO")+"</th>"}}function m(B){return b.trim(["date",g(B),s(B),r(B),q(B)].sort().join(" "))}function g(B){return B.isOddMonth()?"odd":""}function s(B){var C=j&&B.isWeekend();var D=h[B.getOnlyDate().date];var E=!x.hasDate(B);return E||C||D?"disabled":""}function r(B){return B.isToday()?"today":""}function q(B){return B.getDay()==0?"holiday":""}function f(B){return b(o[B])}}});(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","./DateFormat","./DateLocale","./DateRange","./DateTime"],b)}else{a.RangeEvents=b(a.jQuery,a.DateFormat,a.DateLocale,a.DateRange,a.DateTime)}})(this,function(b,a,e,d,c){return function(K,q,P,E,h,k,F,i,O,M,L,p,C,A){var Q=null;var v;var B;var l={CREATE_OR_RESIZE:"create",MOVE:"move",NONE:"none"};var I=l.NONE;return{showInitialSelection:j,initEvents:function(){z();B=v.clone();H(K,q.bodyTable);t()},addRangeLengthLabel:function(){if(b(".rangeLengthLabel",K).isEmpty()){var R=b('<div class="label"><span class="rangeLengthLabel"></span></div>');b(".continuousCalendar",K).append(R)}},addEndDateLabel:function(R){R.append('<span class="separator"> - </span>').append('<span class="endDateLabel"></span>')},performTrigger:function(){K.data("calendarRange",v);P(v)}};function z(){v=p&&C?new d(p,C,E):d.emptyRange(E)}function H(S,R){b("span.rangeLengthLabel",S).text(E.daysLabel(v.days()));R.addClass(h.selectWeek?"weekRange":"freeRange");R.mousedown(r).mouseover(y).mouseup(n);J(R.get(0))}function r(V){var U=V.target;var X=V.shiftKey;if(W(U,X)){v=T(U,X);return}I=l.CREATE_OR_RESIZE;Q=k(U);if(Q.equalsOnlyDate(v.end)){Q=v.start;return}if(Q.equalsOnlyDate(v.start)){Q=v.end;return}if(v.hasDate(Q)){I=l.MOVE;return}if(S(U)){w()}function S(Y){return f(Y)&&N(Y)}function W(Y,Z){if(h.selectWeek){return S(Y)||m(Y)}else{return m(Y)||x(Y)||Z}}function T(aa,ab){if((h.selectWeek&&S(aa))||m(aa)){I=l.NONE;var Y=k(b(aa).parent().children(".date").get(0));return R(Y)}else{if(x(aa)){I=l.NONE;var Z=k(b(aa).siblings(".date").get(0));return new d(Z.firstDateOfMonth(),Z.lastDateOfMonth(),E)}else{if(ab){if(v.days()>0&&S(aa)){I=l.NONE;v=v.expandTo(k(aa));return v}}}}return v}function R(Z){var Y=Z;var aa=Z.plusDays(6);if(h.disableWeekends){Y=Z.withWeekday(c.MONDAY);aa=Z.withWeekday(c.FRIDAY)}return new d(Y,aa,E).and(F)}}function w(){v=new d(Q,Q,E)}function J(R){b(R).css("MozUserSelect","none");b(R).bind("selectstart",function(){return false});b(R).mousedown(function(){return false})}function y(S){if(I==l.NONE){return}var R=k(S.target);var T={move:function(){var U=Q.distanceInDays(R);var V=v.shiftDays(U).and(F);if(G(V)){Q=R;v=V}},create:function(){var U=new d(Q,R,E);if(N(S.target)&&G(U)){v=U}}};T[I]();t()}function G(R){return R.isPermittedRange(h.minimumRange,h.disableWeekends,F)}function n(){I=l.NONE;if(u()){v=d.emptyRange()}t();o()}function u(){for(var R=0;R<A.length;R++){if(v.hasDate(new c(A[R]))){return true}}return false}function t(){v=d.rangeWithMinimumSize(v,h.minimumRange,h.disableWeekends,F);s(v);b("span.rangeLengthLabel",K).text(E.daysLabel(v.days()))}function s(R){b("td.selected",K).removeClass("selected").removeClass("rangeStart").removeClass("rangeEnd").removeClass("invalidSelection");D(R);B=R.clone()}function D(R){if(R.days()==0){return}var V=S(R.start);var U=S(R.end);for(var T=V;T<=U;T++){q.getDateCell(T).get(0).className=g(q.dateCellDates[T],R.start,R.end).join(" ")}if(u()){b("td.selected",K).addClass("invalidSelection")}function S(W){return q.dateCellMap[a.format(W,"Ymd",E)]}}function g(T,U,R){var S=[q.dateStyles(T)];if(T.equalsOnlyDate(R)){return S.concat("selected rangeEnd")}if(T.equalsOnlyDate(U)){return S.concat("selected rangeStart")}if(T.isBetweenDates(U,R)){return S.concat("selected")}return S}function o(){if(u()){v=d.emptyRange();setTimeout(function(){s(v)},200)}var S=L(v.start);var R=L(v.end);K.data("calendarRange",v);i(S);O(R);j();if(h.selectWeek){M.close(b("td.selected",K).first())}P(v)}function j(){if(!v){z()}if(v.start&&v.end){var R=E.weekDateFormat;b("span.startDateLabel",K).text(a.format(v.start,R,E));b("span.endDateLabel",K).text(a.format(v.end,R,E));b("span.separator",K).show()}else{b("span.separator",K).hide()}}function f(R){return b(R).closest("[date-cell-index]").hasClass("date")}function m(R){return b(R).hasClass("week")}function x(R){return b(R).hasClass("month")}function N(R){return !b(R).hasClass("disabled")}}});(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","./DateFormat","./DateLocale","./DateRange","./DateTime","./CalendarBody","./RangeEvents","jquery.tinyscrollbar"],b)}else{b(a.jQuery,a.DateFormat,a.DateLocale,a.DateRange,a.DateTime,a.CalendarBody,RangeEvents)}})(this,function(c,b,g,f,d,a,e){c.fn.continuousCalendar=function(h){return this.each(function(){i.call(c(this),h)});function i(D){var L={weeksBefore:26,weeksAfter:26,firstDate:null,lastDate:null,startField:c("input.startDate",this),endField:c("input.endDate",this),isPopup:false,selectToday:false,locale:g.EN,disableWeekends:false,disabledDates:null,minimumRange:-1,selectWeek:false,fadeOutDuration:0,callback:c.noop,customScroll:false,theme:""};var m=c.extend({},L,D);var C=g.fromArgument(m.locale);var t=n(m.startField);var B=n(m.endField);var w=d.now();if(m.selectToday){var T=Q(w);t=w;B=w;l(T);U(T)}var O=this;var H;var k;var o=true;var K;var P;var s;var u={};var E;var A;var N;c(this).addClass("continuousCalendarContainer").addClass(m.theme).append("&nbsp;");y();function y(){A=m.disabledDates?m.disabledDates.split(" "):[];N=m.disabledDates?z(A):{};E=v(m);K=r(m.isPopup);P=W(G());m.fadeOutDuration=+m.fadeOutDuration;k=F();k.click(function(Y){Y.stopPropagation()});if(c(".startDateLabel",O).isEmpty()){p(O,K,P)}K.initUI();P.showInitialSelection();P.performTrigger()}function S(){if(m.customScroll){s=c(".tinyscrollbar",O).tinyscrollbar()}}function I(){if(u.scrollContent){return}u=c.extend(u,a(k,E,C,m.customScroll,m.disableWeekends,N));x();K.initState();P.addRangeLengthLabel();P.initEvents();R()}function v(ad){var aa=(t||d.now()).getFirstDateOfWeek(C);var Z=ad.firstDate;var Y=ad.lastDate;var ac=Z?b.parse(Z,C):aa.minusDays(ad.weeksBefore*7);var ab=Y?b.parse(Y,C):aa.plusDays(ad.weeksAfter*7+6);return new f(ac,ab)}function x(){if(m.customScroll){if(!s){S()}s.bind("scroll",J)}else{var Y=false;u.scrollContent.scroll(function(){Y=true});setInterval(function(){if(Y){Y=false;J()}},250)}}function z(Z){var Y={};c.each(Z,function(ab,aa){Y[b.parse(aa).date]=true});return Y}function W(ab){var Y={showInitialSelection:function(){if(t){Z(b.format(t,C.weekDateFormat,C))}},initEvents:function(){aa();var ac=t&&b.format(t,"Ymd",C);if(ac in u.dateCellMap){u.getDateCell(u.dateCellMap[ac]).addClass("selected")}},addRangeLengthLabel:c.noop,addEndDateLabel:c.noop,performTrigger:function(){O.data("calendarRange",t);V(t)}};return ab?e(O,u,V,C,m,q,E,l,U,K,Q,t,B,A):Y;function aa(){c(".date",O).bind("click",function(){var ad=c(this);if(ad.hasClass("disabled")){return}c("td.selected",O).removeClass("selected");ad.addClass("selected");var ac=q(ad.get(0));m.startField.val(b.shortDateFormat(ac,C));Z(b.format(ac,C.weekDateFormat,C));K.close(this);V(ac)})}function Z(ac){c("span.startDateLabel",O).text(ac)}}function r(Y){var aa={initUI:function(){k.addClass("popup").hide();var ab=c('<a href="#" class="calendarIcon">'+w.getDate()+"</a>").click(M);O.prepend("<div></div>");O.prepend(ab)},initState:c.noop,getContainer:function(ab){return c('<div class="popUpContainer">').append(ab)},close:function(ab){M.call(ab)},addDateLabelBehaviour:function(ab){ab.addClass("clickable");ab.click(M)}};var Z={initUI:I,initState:X,getContainer:function(ab){return ab},close:c.noop,addDateLabelBehaviour:c.noop};return Y?aa:Z}function F(){var Y=c(".continuousCalendar",O);if(Y.exists()){return Y}else{var Z=c('<div class="continuousCalendar">');O.append(K.getContainer(Z));return Z}}function p(Y,aa,ab){var Z=c('<div class="label"><span class="startDateLabel"></span></div>');ab.addEndDateLabel(Z);Y.prepend(Z);aa.addDateLabelBehaviour(Z.children())}function R(){var Z=c(".selected",u.scrollContent).get(0)||c(".today",u.scrollContent).get(0);if(Z){var Y=Z.offsetTop-(u.scrollContent.height()-Z.offsetHeight)/2;if(m.customScroll){var aa=u.bodyTable.height();var ab=aa-u.scrollContent.height();var ac=Y>ab?ab:Y;s.tinyscrollbar_update(ac>0?ac:0)}else{u.scrollContent.scrollTop(Y)}}}function J(){var Y=u.scrollContent.get(0);var ab=c("table",Y).get(0);var ac=m.customScroll?-c(".overview",k).position().top:Y.scrollTop;var Z=parseInt(ac/H,10);var aa=q(ab.rows[Z].cells[2]);u.yearTitle.text(aa.getFullYear())}function X(){S();j();J()}function j(){H=parseInt(u.bodyTable.height()/c("tr",u.bodyTable).size(),10)}function M(){I();if(k.is(":visible")){k.fadeOut(m.fadeOutDuration);c(document).unbind("click.continuousCalendar")}else{k.show();if(o){S();j();J();o=false}R();c(document).bind("click.continuousCalendar",M)}return false}function n(Y){return Y.length>0&&Y.val().length>0?b.parse(Y.val()):null}function V(Y){m.callback.call(O,Y);O.trigger("calendarChange",Y)}function q(Y){return u.dateCellDates[c(Y).closest("[date-cell-index]").attr("date-cell-index")]}function l(Y){m.startField.val(Y)}function U(Y){m.endField.val(Y)}function Q(Y){return Y?b.shortDateFormat(Y,C):""}function G(){return m.endField&&m.endField.length>0}}};c.fn.calendarRange=function(){return c(this).data("calendarRange")};c.fn.exists=function(){return this.length>0};c.fn.isEmpty=function(){return this.length==0}});