var express = require('express');
var router = express.Router();

var React = require('react');

var header = require('../public/react/components/header');
var footer = require('../public/react/components/footer');
var wrapper =require('../public/react/wrapper');
var home = require('../public/react/components/home');

/* GET home page. */
router.get('/', function(req, res, next) {
	var header_element = React.createElement(header, {user: req.user});
	var factory_footer = React.createFactory(footer);
	var wrapper_element = React.createElement(wrapper, {child: home});
	res.render('home', {title: 'Fodoo',
						markup: React.renderToString(wrapper_element),
						header: React.renderToString(header_element),
						tracking: req.tracking_element,
						user: req.user
					}
				);
});

module.exports = router;
