const superagent = require('superagent');
const cheerio = require('cheerio');

const { HOME_URL } = require('../config/url');

function getContent($, classname) {
	let result = {
		head: [],
		body: []
	};

	$(`.${classname} .tiles-container`).children('a').each((index, item) => {
        let headItem = {};
        headItem['imgUrl'] = $(item).find('img').eq(0).attr('data-src');
        headItem['title'] = $(item).find('.title').eq(0).text();
        headItem['description'] = $(item).find('.desc').eq(0).text().trim();
        headItem['href'] = $(item).attr('href');
        result.head.push(headItem);
    });

    $(`.${classname}`).next().children('a').each((index, item) => {
        let bodyItem = {};
        bodyItem['href'] = $(item).attr('href');
        bodyItem['imgUrl'] = $(item).find('img').eq(0).attr('data-src');
        bodyItem['title'] = $(item).find('.name').eq(0).text();
        let stat = $(item).find('.stat').eq(0).children('span');
        bodyItem['rate'] = stat.eq(0).text();
        bodyItem['doneNum'] = stat.eq(1).text();
        result.body.push(bodyItem);
    });

    return result;
}

function homeService() {
	return new Promise((resolve, reject) => {
		superagent.get(HOME_URL)
			.set('User-Agent', 'Mozilla/5.0')
			.end((err, res) => {
				if (err) {
					reject({
						code: -1,
						message: err
					});
				} else {
					const $ = cheerio.load(res.text);
					let result = {
						rankHead: [],
						rankBody: [],
						popHead: [],
						popBody: [],
						newMenuHead: [],
						newMenuBody: []
					};

					const rank = getContent($, 'pop-lists');
					const pop = getContent($, 'pop-menus');
					const newMenu = getContent($, 'rising-recipes');

					result.rankHead = rank.head;
					result.rankBody = rank.body;

					result.popHead = pop.head;
					result.popBody = pop.body;

					result.newMenuHead = newMenu.head;
					result.newMenuBody = newMenu.body;

					resolve({
						code: 0,
						data: result
					});
				}
			});
	});
}

module.exports = homeService;

