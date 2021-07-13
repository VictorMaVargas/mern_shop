const router = require('express').Router();
const pages = require('../../client/src/pages');

router.get('/', pages.home);
router.get('/search', pages.search)