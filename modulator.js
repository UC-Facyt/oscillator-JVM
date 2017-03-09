const encode = require('./src/binary_string').encode;
const decode = require('./src/binary_string').decode;

const input = document.querySelector('#audio-string');
const rangeInput = document.querySelector('input#freq');
const p = document.querySelector('#freq-text');
const button = document.querySelector('button#play');
let bitSoundDuration = 50;

const frequencies = {
	1: 440,
	0: 0
}

const updateFreq = () => {
	rangeInput.value = bitSoundDuration;
	p.innerHTML = `Frecuencia actual: ${bitSoundDuration}`;
};
updateFreq();

let context = new (window.AudioContext || window.webkitAudioContext)();
let oscillator;

function debugRange(value) {
	bitSoundDuration = value;
	updateFreq();
}

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

function resetOscillator() {
	if (typeof oscillator !== 'undefined') {
		oscillator.stop();
	}

	oscillator = context.createOscillator();
	oscillator.type = 'square';
	oscillator.frequency.value = 0;
	oscillator.connect(context.destination);
}

const form = document.querySelector('#play-form');
form.addEventListener("submit", event => {
	event.preventDefault();
	const binaryString = encode(input.value);
	resetOscillator();
	oscillator.start();
	playSound(binaryString);
});
