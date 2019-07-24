'user strict';

window.addEventListener('load',function(){
	loadFromStorage();

	if (allProducts.length === 0){
		createProducts();
	}
	render();
	renderChart();
});

//console.log('file is connected');

//global variables
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var productImages = ['jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'png', 'jpg', 'jpg', 'gif', 'jpg', 'jpg'];
var allProducts = [];
var totalClicks = 0;

// //constructor
function Product(name, src, clicks, views) {
	this.name = name;
	this.imageUrl = '../img/' + name + '.' + src;
	this.clicks = clicks || 0;
	this.views =  views || 0;
	allProducts.push(this);
};
//Loops
function createProducts() {
	for (i = 0; i < productNames.length; i++) {
		new Product(productNames[i], productImages[i]);
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
	while (randomProducts[0] === randomProducts[1]) {
		randomProducts[1] = allProducts[randomProduct()];
	}
	randomProducts.push(allProducts[randomProduct()]);
	while (randomProducts[2] === randomProducts[0] || randomProducts[2] === randomProducts[1]) {
		randomProducts[2] = allProducts[randomProduct()];
	}
	for (var i = 0; i < randomProducts.length; i++) {
		console.log(randomProducts[i].name);
	}

	for (var i = 0; i < 3; i++) {
		randomProducts[i].views++;
		var img = document.createElement('img');
		img.setAttribute('src', randomProducts[i].imageUrl);
		img.setAttribute('data-name', randomProducts[i].name);
		img.setAttribute('width', '500px');
		img.setAttribute('height', '500px');
		img.setAttribute('hspace', '20px');
		img.addEventListener('click', handleVote);
		productSection.appendChild(img);
	};
};

function handleVote(event) {
	var productName = event.target.dataset.name;
	for (var i = 0; i < allProducts.length; i++) {
		if (allProducts[i].name === productName) {
			allProducts[i].clicks++;
			totalClicks++;
			saveVote();
			render();
		}
	}
	if (totalClicks === 25) {
		var imgs = document.getElementsByTagName('img');
		for (var i = 0; i < imgs.length; i++) {
			imgs[i].removeEventListener('click', handleVote);
		}
		renderChart();
	}
	console.table(allProducts);
	console.log('Total Clicks', totalClicks);

}

function displayResults() {
	var results = document.getElementById('results');
	var ul = document.createElement('ul');
	for (var i = 0; i < allProducts.length; i++) {
		var product = allProducts[i];
		var li = document.createElement('li');
		li.textContent = product.name + ' has ' + product.clicks + 'votes.';
		ul.appendChild(li);
	}
	results.appendChild(ul);
}

//rendering the canvas chart
function renderChart() {
	var names = [];
	var totalClicks = [];
	for (i = 0; i < allProducts.length; i++) {
		names.push(allProducts[i].name);
		totalClicks.push(allProducts[i].clicks);
	}

	var data = {
		labels: names,
		datasets: [{
			label: 'times clicked',
			backgroundColor: [
				'rgba(255, 99, 132, 2.6)',
				'rgba(54, 162, 235, 2.7)',
				'rgba(255, 206, 86, 2.8)',
				'rgba(75, 192, 192, 2.9)',
				'rgba(153, 102, 255, 3)',
				'rgba(255, 159, 64, 3.1)',
				'rgba(255, 99, 132, 3.2)',
				'rgba(54, 162, 235, 3.3)',
				'rgba(255, 206, 86, 3.4)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1.1)',
				'rgba(255, 159, 64, 1.2)',
				'rgba(255, 99, 132, 1.3)',
				'rgba(54, 162, 235, 1.4)',
				'rgba(255, 206, 86, 1.5)',
				'rgba(75, 192, 192, 1.6)',
				'rgba(153, 102, 255, 1.7)',
				'rgba(255, 159, 64, 1.8)',
				'rgba(255, 99, 132, 2)',
				'rgba(54, 162, 235, 2.1)',
				'rgba(255, 206, 86, 2.2)',
				'rgba(75, 192, 192, 2.3)',
				'rgba(153, 102, 255, 2.4)',
				'rgba(255, 159, 64, 2.5)'
			],
			borderColor: [
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)',
				'rgba(255, 99, 132, 1)',
				'rgba(54, 162, 235, 1)',
				'rgba(255, 206, 86, 1)',
				'rgba(75, 192, 192, 1)',
				'rgba(153, 102, 255, 1)',
				'rgba(255, 159, 64, 1)'
			],
			data: totalClicks,
		}],
	};

	var ctx = document.getElementById('myChart');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: data,
	});
}

function saveVote() {
	localStorage.setItem('allProducts', JSON.stringify(allProducts));
	
}
function loadFromStorage(){
	var jsonproductsString = localStorage.getItem('allProducts');
	

	if (jsonproductsString){
		var productArray = JSON.parse(jsonproductsString);
		allProducts = [];

		for (var i = 0; i < productArray.length; i++){
			var product = productArray[i];
			console.log(product.imageUrl.substring(product.imageUrl.length-3));
			new Product(product.name, product.imageUrl.substring(product.imageUrl.length-3), product.clicks, product.views);
		}
	}
}

	
