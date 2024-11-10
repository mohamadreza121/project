let express = require('express');
let router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* Get about page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});

/* Get contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

/* Get products page. */
router.get('/products', function(req, res, next) {
  res.render('products', { title: 'Products' });
});

/* Get boost page. */


module.exports = router;
