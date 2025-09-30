const http = require('http');
const url = require('url');

function gcd(x, y) {
	while (y !== 0) {
		const temp = y;
		y = x % y;
		x = temp;
	}
	return x;
}

function lcm(x, y) {
	return (x * y) / gcd(x, y);
}

function isNaturalNumber(value) {
	const num = Number(value);
	return Number.isInteger(num) && num > 0;
}

const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const pathName = parsedUrl.pathname;

	if (pathName === 'normantas000@gmail.com' && req.method === 'GET') {
		const { x, y } = parsedUrl.query;
		if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end('NaN');
			return;
		}

		const numX = Number(x);
		const numY = Number(y);
		const result = lcm(numX, numY);

		res.writeHead(200, { 'Content-Type': 'text/plain' });
		res.end(result.toString());
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Not Found');
	}
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
