const utils = require('./utilities');

function encode(message) {
	return message
		.split('')
		.map(utils.char2Ascii)
		.map(utils.dec2Bin)
		.map(utils.leftPad)
		.join('')
}

function decode(encodedMessage) {
	return encodedMessage
		.split('')
		.chunk(8)
		.map(arr => arr.join(''))
		.map(utils.bin2Dec)
		.map(utils.ascii2Char)
		.join('')
}

const BinaryString = {
	encode,
	decode
};

// export default BinaryString;
module.exports = BinaryString;
