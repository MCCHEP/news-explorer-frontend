class NewsApi {
    constructor(data) {
      this._baseUrl = data.url;
      this._apiKey = data.key;
      this._headers = data.headers;
    }

    _getDataGap() {
        
    }

    _prepareData(res) {
        return res;
    }

    searchForResults(keyword) {
        return fetch().then(this._prepareData)
    }
}  

export const searchApi({
    url: '',
    key: '',
    headers: {},
})