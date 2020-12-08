class DateConverter {
  constructor() {
    this._hoursInDay = 24;
    this._minutesInHour = 60;
    this._secondsInMinute = 60;
    this._millisecondsInSecond = 1000;
  }

  _addLeadingZero(number) {
    return number >= 10 ? number : "0" + number;
  }

  formatDateUSA(dateObject) {
    return `${dateObject.getFullYear()}-${this.__addLeadingZero(dateObject.getMonth())}-${this.__addLeadingZero(dateObject.getDate())}`;
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

export default new DateConverter();
