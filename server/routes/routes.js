const router = require('express').Router();
const pages = require('../controllers/pages');

router.get('/', pages.home);
router.get('/search', pages.search)