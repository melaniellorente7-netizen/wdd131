const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();
currentYear.textContent = today.getFullYear();

lastModified.textContent = `Last Modified: ${document.lastModified}`;

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },

  {
	templeName: "Montevideo Uruguay Temple",
	location: "Montevideo, Uruguay",
	dedicated: "2001, March, 18",
	area: 10700,
	imageUrl: "images/montevideo-uruguay-temple.webp"
  },

    {
	templeName: "Guadalajara Mexico Temple",
	location: "Guadalajara, Mexico",
	dedicated: "2001, April, 29",
	area: 10700,
	imageUrl: "images/guadalajara-mexico-temple.webp"
  },

    {
	templeName: "Bangkok Thailand Temple",
	location: "Bangkok, Thailand",
	dedicated: "2023, October, 22",
	area: 48525,
	imageUrl: "images/bangkok-thailand-temple.webp"
  }
  
];

function createTempleCards(temples) {
	const container = document.getElementById("temple-grid");

	container.innerHTML = "";

	temples.forEach(temple => {

	const card = document.createElement("figure");
	card.classList.add("temple-card");

	card.innerHTML = `
	<h2>${temple.templeName}</h2>
	<div class = "temple-data">
	<p><span>Location:</span> ${temple.location}</p>
	<p><span>Dedicated:</span> ${temple.dedicated}</p>
	<p><span>Size:</span> ${temple.area.toLocaleString()} sq ft</p>
	</div>
	<img
	src="${temple.imageUrl}"
	alt="${temple.templeName}"
	loading="lazy"
	width="400" 
    height="250"
	/>`

	container.appendChild(card);
	});
}




const mainHeadings = document.querySelector("main h1");

document.querySelector(".navigation").addEventListener("click", (event) => {
	if (event.target.tagName !== "A") return;

	event.preventDefault();
	const filter = event.target.textContent;
	if (mainHeadings) mainHeadings.textContent = filter;

	const filtered = temples.filter(temple => {
		const year = parseInt(temple.dedicated.split(",")[0]);
	
		if (filter === "Old") return year < 1900;
		if (filter === "New") return year > 2000;
		if (filter === "Large") return temple.area > 90000;
		if (filter === "Small") return temple.area < 10000;
		return true;
	});

	createTempleCards(filtered);
});

createTempleCards(temples);