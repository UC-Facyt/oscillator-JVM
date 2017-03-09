Array.range = function(n) {
  return Array.apply(null,Array(n)).map((x,i) => i)
};

Object.defineProperty(Array.prototype, 'chunk', {
  value: function(n) {
    return Array.range(Math.ceil(this.length/n)).map((x,i) => this.slice(i*n,i*n+n));
  }
});

if (!String.prototype.leftPad) {
	String.prototype.leftPad = function (length, str) {
		if (this.length >= length) {
			return this;
		}
		str = str || ' ';
		return (new Array(Math.ceil((length - this.length) / str.length) + 1).join(str)).substr(0, (length - this.length)) + this;
	};
}

const isPowerOfTwo = n => (n !== 0) && ((n & (n - 1)) === 0);
const char2Ascii = char => char.charCodeAt(0);
const ascii2Char = n => String.fromCharCode(n)
const dec2Bin = decimal => (decimal >>> 0).toString(2);
const bin2Dec = binary => parseInt(binary, 2);
const leftPad = str => str.leftPad(8, '0');
const isEven = n => (n % 2 === 0);

module.exports =  {
	isPowerOfTwo,
	char2Ascii,
	ascii2Char,
	dec2Bin,
	bin2Dec,
	leftPad,
	isEven
}
