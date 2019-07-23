'user strict';

//console.log('file is connected');

//global variables
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var productImages = ['jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'png', 'jpg', 'jpg', 'gif', 'jpg', 'jpg'];
var allProducts = [];
//var totalClicks = 0;

// //constructor
function Product(name, src) {
	this.name = name;
	this.imageUrl = '../img/' + name + '.' + src;
	this.clicks = 0;
	this.views = 0;
	allProducts.push(this);
};
//Loops
function createProducts() {
	for (i = 0; i < productNames.length; i++) {
		allProducts.push (new Product(productNames[i], productImages[i]));
	}
	console.table(allProducts);
};

function randomProduct() {
	return Math.floor(Math.random() * allProducts.length);
}

function render() {
	var productSection = document.getElementById('products');
	productSection.innerHTML = '';

	var randomProducts = [];
	randomProducts.push(allProducts[randomProduct()]);
	randomProducts.push(allProducts[randomProduct()]);
	while (randomProducts[0] === randomProducts[1]){
		randomProducts[1] = allProducts[randomProduct()];
	}
	randomProducts.push(allProducts[randomProduct()]);
	while (randomProducts[2] === randomProducts[0] || randomProducts[2] === randomProducts[1]) {
		randomProducts[2] = allProducts[randomProduct()];
	}
	for(var i = 0; i < randomProducts.length; i++){
		console.log(randomProducts[i].name);
	}
	
	for (var i = 0; i < 3; i++) {
		randomProducts[i].views++;
		var img = document.createElement('img');
		img.setAttribute('src', randomProducts[i].imageUrl);
		img.setAttribute('data-name',randomProducts[i].name);
		img.setAttribute('width', '250px');
		img.setAttribute('height', '250px');
		img.setAttribute('margin', 'space-between');
		img.addEventListener('click', handleVote);
		productSection.appendChild(img);
	};
};

function handleVote(event) {
	var productName = event.target.dataset.name;
	for(var i = 0; i < allProducts.length; i++){
		if(allProducts[i].name === productName){
			allProducts[i].clicks++
			totalClicks++
			render();
		}
	}
	if(totalClicks === 25){
		var img = document.getElementsByTagName('img');
		for (var i = 0; i < img.length; i++){
			img[i].removeEventListener('click', handleVote);
		}
		displayResults();
	}
	console.table(allProducts);
	console.log('Total Clicks', totalClicks);

}

function displayResults(){
	var results = document.getElementById('results');
	var ul = document.createElement('ul');
	for(var i = 0; i < allProducts.length; i++){
		var product = allProducts[i];
		var li = document.createElement('li');
		li.textContent = product.name + ' has ' + product.clicks + 'votes.';
		ul.appendChild(li);
	}
	results.appendChild(ul);
}

createProducts();
render();