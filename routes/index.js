var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('home', {
		title: 'Pens Gate'
	});
});

router.get('/service/:name', function (req, res) {
	res.render(('service_'+req.params.name), {
		title: req.params.name
	})
});

module.exports = router;