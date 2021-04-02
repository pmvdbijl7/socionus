var menuBtn = document.querySelector('header nav button');
menuBtn.addEventListener('click', openMenu);

function openMenu() {
	var nav = document.querySelector('header nav ul');
	var overlay = document.querySelector('header nav .overlay');
	nav.classList.add('open-menu');
	overlay.classList.add('active');
}

var overlay = document.querySelector('header nav .overlay');
overlay.addEventListener('click', closeMenu);

function closeMenu() {
	var nav = document.querySelector('header nav ul');
	var overlay = document.querySelector('header nav .overlay');
	nav.classList.remove('open-menu');
	overlay.classList.remove('active');
}
