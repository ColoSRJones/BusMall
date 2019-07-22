'user strict';

//global variables
var names = ['dog','cat','snake','horse','cow','pig','shark','elephant','whale'];
var allPics = [];
var picsHolder = document.getElementById('picsHolder');
var context = document.getElementById("myChart").getContext("2d");
var picTag =[document.getElementById('picOne'),
document.getElementById('picTwo'),
document.getElementById('picThree')];
var randomArray =[];
var randomStored =[];
var totalClicks = 0;
var ticks =[];

//constructor function

