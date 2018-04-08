const superagent = require('superagent');
const cheerio = require('cheerio');
const { CATEGORY_URL } = require('../config/url');

function getCategory($) {
	let result = [];

	$('#site-body').children('section').each((index, item) => {
        let categoryItem = {};
        categoryItem['title'] = $(item).children('.category-section-title').text();
        categoryItem['info'] = [];
        $(item).find('a').each((_index, _item) => {
            let categoryInfoItem = {};
            categoryInfoItem['href'] = $(_item).attr('href');
            categoryInfoItem['imgUrl'] = $(_item).find('img').attr('src');
            categoryInfoItem['title'] = $(_item).find('.name').text();
            categoryItem['info'].push(categoryInfoItem);
        });
        result.push(categoryItem);
    });

    return result;
}

function categoryService() {
	return new Promise((resolve, reject) => {
		superagent.get(CATEGORY_URL)
			.set('User-Agent', 'Mozilla/5.0')
			.end((err, res) => {
				if (err) {
					reject({code: -1, message: err});
				} else {
					const $ = cheerio.load(res.text);
					const data = getCategory($);
					resolve({code: 0, data});
				}
			});
	});
}

module.exports = categoryService;