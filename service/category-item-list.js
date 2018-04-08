const superagent = require('superagent');
const cheerio = require('cheerio');
const { CATEGORY_URL } = require('../config/url');

function getCategoryItemList($) {
	let result = [];

	$('#add-more-container').children('a').each((index, item) => {
	    let menuItem = {};
	    menuItem['href'] = $(item).attr('href');
	    menuItem['imgUrl'] = $(item).find('img').attr('data-src');
	    menuItem['title'] = $(item).find('header').text().trim();
	    menuItem['rate'] = $(item).find('.stat').find('span').eq(0).text().trim();
	    menuItem['doneNum'] = $(item).find('.stat').find('span').eq(1).text().trim();

	    result.push(menuItem);
	});

	return result;
}

function categoryItemListService(id, page = 1) {
	return new Promise((resolve, reject) => {
		superagent.get(`${CATEGORY_URL}${id}/?page=${page}`)
			.set('User-Agent', 'Mozilla/5.0')
			.end((err, res) => {
				if (err) {
					reject({code: -1, message: err});
				} else {
					const $ = cheerio.load(res.text);
					const data = getCategoryItemList($);
					resolve({code: 0, data});
				}
			});
	});
}

module.exports = categoryItemListService;