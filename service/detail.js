const superagent = require('superagent');
const cheerio = require('cheerio');
const { DETAIL_URL } = require('../config/url');

function getDetail($) {
	let result = {
        headImgUrl: '',
        title: '',
        rate: '',
        doneNum: '',
        description: '',
        author: '',
        materials: [],
        steps: []
    };

    result.headImgUrl = $('.recipe-cover > img').attr('data-src');
    result.title = $('h1.plain').text();
    result.rate = $('.cooked').children('span').eq(0).text().split(' ')[0];
    result.doneNum = $('.cooked').children('span').eq(1).text().split(' ')[0];
    result.description = $('#description .recipe-desc').html().replace(/<br>/g, '||').trim();
    result.author = $('span.author-name').text();
    
    $('#ings').find('li').each((index, item) => {
        let materialsItem = {};
        materialsItem['ingredient'] = $(item).find('.ingredient').text();
        materialsItem['weight'] = $(item).find('.weight').text();
        result.materials.push(materialsItem);
    });

    $('#steps').find('li').each((index, item) => {
        let stepItem = {};

        stepItem['subTitle'] = $(item).children('.sub-title').text();
        if ($(item).find('img').length > 0) {
            stepItem['stepImg'] = $(item).find('img').attr('data-src');
        }
        stepItem['description'] = $(item).find('p').text().trim();

        result.steps.push(stepItem);
    });

    return result;
}

function detailService(id) {
	return new Promise((resolve, reject) => {
		superagent.get(`${DETAIL_URL}${id}/`)
			.set('User-Agent', 'Mozilla/5.0')
			.end((err, res) => {
				if (err) {
					reject({code: -1, message: err});
				} else {
					const $ = cheerio.load(res.text, {decodeEntities: false});
					const data = getDetail($);
					resolve({code: 0, data});
				}
			});
	});
}

module.exports = detailService;