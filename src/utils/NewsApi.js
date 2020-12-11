import { proxyUrl, defaultType, myApiKey, pageSize, endpoint, defaultLanguage, defaultDaysNumber } from "./constants";
import DateConverter from "./DateConverter";
class NewsApi {
  constructor(data) {
    this._baseUrl = data.url;
    this._apiKey = data.key;
    this._headers = data.headers;
    this._numberOfResults = data.pageSize;
    this._endpoint = data.endpoint;
    this._searchLanguage = data.language;
    this._searchSpan = data.days;
    this._dateForSearchConverter = data.converter;
  }

  _prepareData(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  searchForResults(keyword) {
    const gap = this._dateForSearchConverter(this._searchSpan);
    return fetch(
      `${this._baseUrl}/${this._endpoint}/?q=${keyword}&from=${gap.currentDate}&to=${gap.dateBefore}&language=${this._searchLanguage}&pageSize=${this._numberOfResults}&sortBy=popularity&apiKey=${this._apiKey}`,
      {
        method: "GET",
        headers: this._headers,
      }
    ).then(this._prepareData);
  }
}


export const searchApi = new NewsApi({
    url: proxyUrl,
    key: myApiKey,
    pageSize: pageSize,
    endpoint: endpoint,
    language: defaultLanguage,
    days: defaultDaysNumber,
    headers: {
      'Content-Type': defaultType
    },
    converter: (numberOfDays) => {
        return DateConverter.getDataGap(numberOfDays);
    }
  });

 