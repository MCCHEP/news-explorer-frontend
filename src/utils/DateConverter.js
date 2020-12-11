import { MONTH_ABBREVIATIONS } from "./constants";
class DateConverter {
  constructor(monthabbr) {
    this._hoursInDay = 24;
    this._minutesInHour = 60;
    this._secondsInMinute = 60;
    this._millisecondsInSecond = 1000;
    this._months = monthabbr;
  }

  _addLeadingZero(number) {
    return number >= 10 ? number : "0" + number;
  }

  formatDateUSA(dateObject) {
    return `${dateObject.getFullYear()}-${this._addLeadingZero(dateObject.getMonth())}-${this._addLeadingZero(dateObject.getDate())}`;
  }

  convertDaystoMilliseconds(numberOfDays) {
    return (
      numberOfDays *
      this._hoursInDay *
      this._minutesInHour *
      this._secondsInMinute *
      this._millisecondsInSecond
    );
  }

  convertDateFromString(string) {
    let dateFromString = new Date(Date.parse(string));
    return `${dateFromString.getDate()} ${this._months[dateFromString.getMonth()]}, ${dateFromString.getFullYear()}`
  }

  getDataGap(numberOfDays) {
    const dataGap = { currentDate: "", dateBefore: "" };
    const dateToday = new Date();
    const previousDate = new Date(
      Date.now() - this.convertDaystoMilliseconds(numberOfDays)
    );
    dataGap.currentDate = this.formatDateUSA(dateToday);
    dataGap.dateBefore = this.formatDateUSA(previousDate);
    return dataGap;
  }
}

export default new DateConverter(MONTH_ABBREVIATIONS);
