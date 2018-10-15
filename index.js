const micro = require('micro');
const Router = require('micro-http-router');
const cors = require('micro-cors')();

const { send } = micro;
const router = new Router();

const results = {
	one: 0,
	five: 0,
};

router.route({
	path: '/results',
	method: 'GET',
	handler: (req, res) => {
		return send(res, 200, results);
	},
});

router.route({
	path: '/kill/:amount',
	method: 'POST',
	handler: (req, res) => {
		const amount = req.params.amount;
		results[amount]++;
		return 'Successfully killed';
	},
});

const server = micro(cors((req, res) => router.handle(req, res)));
const port = 3029;
server.listen(port);
console.log(`micro is listening on port: ${port}`);
