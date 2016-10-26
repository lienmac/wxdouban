
const API_URL = 'https://api.douban.com';
function APIUrl() {
    let globalData = {
        'API_URL_IN': API_URL + '/v2/movie/in_theaters',
        'API_URL_COMING': API_URL + '/v2/movie/coming_soon',
        'API_URL_SUBJECT':API_URL + '/v2/movie/subject/',
        'API_URL_TOP250':API_URL + '/v2/movie/top250',
        'API_URL_SEARCH':API_URL+'/v2/movie/search'
    };
    return globalData;
}
module.exports.APIUrl = APIUrl;