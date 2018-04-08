const superagent = require('superagent');
const cheerio = require('cheerio');
const { EXPLORE_URL } = require('../config/url');

function getExplore($) {
	let result = {
		title: '',
		explore: []
	};

	result.title = $('.homepage-title').text().trim();

	$('#add-more-container').children('article').each((index, item) => {
        let exploreItem = {};
        exploreItem['imgUrl'] = $(item).find('img').attr('src');
        exploreItem['menuName'] = $(item).find('.recipe-name').text().trim();
        exploreItem['author'] = $(item).find('.author-name').text().trim();
        exploreItem['doneNum'] = $(item).find('.author-name').next().text().trim().split(' ')[0];
        exploreItem['authorImg'] = $(item).find('.avatar').attr('src');
        result.explore.push(exploreItem);
    });

    return result;
}

function exploreService(type) {
	return new Promise((resolve, reject) => {
		superagent.get(`${EXPLORE_URL}${type}/`)
			.set('User-Agent', 'Mozilla/5.0')
			.end((err, res) => {
				if (err) {
					reject({code: -1, message: err});
				} else {
					const $ = cheerio.load(res.text);
					const data = getExplore($);
					resolve({code: 0, data});
				}
			});
	});
}

module.exports = exploreService;