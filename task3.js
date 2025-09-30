const http = require('http');
const url = require('url');

function gcd(a, b) {
	a = BigInt(a);
	b = BigInt(b);
	while (b !== 0n) {
		let temp = b;
		b = a % b;
		a = temp;
	}
	return a;
}

function lcm(x, y) {
	const bigX = BigInt(x);
	const bigY = BigInt(y);
	return (bigX * bigY) / gcd(bigX, bigY);
}

function isNaturalNumber(value) {
	if (value === undefined || value === null || value === '') {
		return false;
	}

	if (!/^\d+$/.test(value)) {
		return false;
	}

	try {
		const num = BigInt(value);
		return num > 0n;
	} catch {
		return false;
	}
}

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const pathname = parsedUrl.pathname;

	if (pathname === '/normantas000_gmail_com' && req.method === 'GET') {
		const { x, y } = parsedUrl.query;

		if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end('NaN');
			return;
		}

		const result = lcm(x, y);

		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(result.toString());
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Not Found');
	}
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
