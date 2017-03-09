const encode = require('./src/binary_string').encode;
const decode = require('./src/binary_string').decode;

const input = document.querySelector('#input');
const button = document.querySelector('button#play');
const bitSoundDuration = 50;

const frequencies = {
	1: 440,
	0: 0
}

let context = new (window.AudioContext || window.webkitAudioContext)();
let oscillator;

const form = document.querySelector('#play-form');
form.addEventListener("submit", event => {
	event.preventDefault();
});

function debugRange(event) {
	console.log(event);
}

button.addEventListener('click', event => {
	const binaryString = encode(input.value);

	if (typeof oscillator !== 'undefined') {
		oscillator.stop();
	}

	oscillator = context.createOscillator();
	oscillator.type = 'square';
	oscillator.frequency.value = 0;
	oscillator.connect(context.destination);
	oscillator.start();
	playSound(binaryString);
});

function playSound(binaryString) {
	if (binaryString.length < 1) {
		console.log("Done Playing");
		oscillator.stop();
		return;
	}
	const bit = parseInt(binaryString.substr(0, 1));
	const otherBits = binaryString.substr(1, Infinity);
	oscillator.frequency.value = frequencies[bit];
	console.log(`playing ${bit}`);
	setTimeout(
		() => playSound(otherBits),
		bitSoundDuration
	);
}
