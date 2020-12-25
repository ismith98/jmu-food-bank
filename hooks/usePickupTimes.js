import dayjs from "dayjs";

export default function usePickupTimes() {
  let mondayHours = getHours("monday");
  let wednesdayHours = getHours("wednesday");
  let dates = getPickupDates();
  return {
    dates: dates,
    mondayHours: mondayHours,
    wednesdayHours: wednesdayHours,
  };

  function getHours(day) {
    let startTime = dayjs().day(1).hour(12).minute(0);
    let closingTime;
    if (day === "monday") {
      closingTime = dayjs().day(1).hour(17).minute(40);
    } else {
      closingTime = dayjs().day(1).hour(16).minute(40);
    }

    let hours = [];
    while (startTime.isBefore(closingTime)) {
      if (startTime.minute() === 0) {
        hours.push({
          label: startTime.format("h A"),
          value: startTime,
        });
      } else {
        hours.push({
          label: startTime.format("h:mm A"),
          value: startTime,
        });
      }
      startTime = startTime.add(15, "minute");
    }
    return hours;
  }

  function getPickupDates() {
    // get today
    let today = dayjs();

    let monday = dayjs().day(1).hour(10).minute(0);
    let wednesday = dayjs().day(3).hour(10).minute(0);

    let dates = [];
    // if today is before 10AM on monday
    if (today.isBefore(monday)) {
      // show dates from monday to next thursday
      dates.push(dayjs().day(1));
      dates.push(dayjs().day(3));
      dates.push(dayjs().day(1).add(1, "week"));
      dates.push(dayjs().day(3).add(1, "week"));
    }

    // if today is before 10AM on wednesday
    else if (today.isBefore(wednesday)) {
      dates.push(dayjs().day(3));
      dates.push(dayjs().day(1).add(1, "week"));
      dates.push(dayjs().day(3).add(1, "week"));
      dates.push(dayjs().day(1).add(2, "week"));
    }
    // show dates from wednesday to next wednesday

    // else show dates from this monday to the monday after that
    else {
      dates.push(dayjs().day(1).add(1, "week"));
      dates.push(dayjs().day(3).add(1, "week"));
      dates.push(dayjs().day(1).add(2, "week"));
      dates.push(dayjs().day(3).add(2, "week"));
    }

    //console.log(dates.map((date) => date.format("dddd D/M")));
    return dates;
  }
}
