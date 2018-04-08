const superagent = require('superagent');
const cheerio = require('cheerio');
const { SEARCH_URL } = require('../config/url');

function getSearch($) {
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

function searchService(keywords) {
	return new Promise((resolve, reject) => {
		superagent.get(`${SEARCH_URL}?keyword=${encodeURIComponent(keywords)}`)
			.redirects(0)
			.set('User-Agent', 'Mozilla/5.0')
			.on('redirect', res => {
				console.log(res);
			})
			.end((err, res) => {
				if (err) {
					if (err.status === 301 || err.status === 302) {
						resolve({code: 0, isRedirect: true, redirectUrl: err.response.headers.location});
					} else {
						reject({code: -1, message: err});
					}
				} else {
					const $ = cheerio.load(res.text);
					const data = getSearch($);
					resolve({code: 0, data});
				}
			})
	})
}

module.exports = searchService;