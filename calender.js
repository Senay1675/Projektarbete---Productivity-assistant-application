const calenderContainer = document.querySelector("NTH-calender");
const calenderResults = document.querySelector(".cal-results");
const pastEvents = document.querySelector(".pastEvents");
const sortCalendar = document.querySelector("#sortCalendar");

const calTitle = document.querySelector("#calTitle");
const calStartDate = document.querySelector("#calStartDate");
const calStartTime = document.querySelector("#calStartTime");

const calEndDate = document.querySelector("#calEndDate");
const calEndTime = document.querySelector("#calEndTime");

const addToCal = document.querySelector("#addCalResult");

const activeUser = localStorage.getItem("currentUserId");
let userEvents = [];

const checkDateCorrection = () => {
  const startDate = new Date(calStartDate.value);
  const endDate = new Date(calEndDate.value);
  const startTime = calStartTime.value;
  const endTime = calEndTime.value;

  console.log(endTime, endDate.getTime(), startTime, startDate.getTime());
  if (
    endDate < startDate ||
    (endDate.getTime() === startDate.getTime() && endTime <= startTime)
  ) {
    console.log("error");
    errorDate.style.display = "block";
    addToCal.disabled = true;
  } else {
    errorDate.style.display = "none";
    addToCal.disabled = false;
  }
};

calEndDate.addEventListener("change", checkDateCorrection);

calEndTime.addEventListener("change", checkDateCorrection);

addToCal.addEventListener("click", () => {
  const title = calTitle.value;
  const startDate = calStartDate.value;
  const startTime = calStartTime.value;
  const endDate = calEndDate.value;
  const endTime = calEndTime.value;

  let result = checkExistingDates(startDate, startTime, endDate, endTime);
  console.log(startDate, startTime, endDate, endTime);
  console.log(result);
  if (result) {
    errorOverlap.style.display = "none";
    addtoCalender(title, startDate, startTime, endDate, endTime);
  } else {
    errorOverlap.style.display = "block";
    console.log("Failed to create event, dates overlapping.");
  }
});

const addtoCalender = (title, startDate, startTime, endDate, endTime) => {
  //   console.log(title, startDate, startTime, endDate, endTime);
  const calCard = createDiv("calender-card");

  const calTitle = createDiv("calender-title");
  const calenderTitle = createPtag(title);
  const closestDeadline = createPtag("Closest to deadline!");
  closestDeadline.style.display = "none";
  calTitle.append(calenderTitle, closestDeadline);

  const start = createDiv("start-mode");
  const starting = createPtag("Start:");
  const calStartDate = createPtag(startDate);
  const calStartTime = createPtag(startTime);
  start.append(starting, calStartDate, calStartTime);

  const end = createDiv("end-mode");
  const ending = createPtag("End:");
  const calEndDate = createPtag(endDate);
  const calEndTime = createPtag(endTime);
  end.append(ending, calEndDate, calEndTime);

  calCard.append(calTitle, start, end);
  //   console.log(calCard);
  let behind = isDateBehind(endDate);
  console.log("The answer to isDateBehind function is: " + behind);
  if (behind) {
    console.log("DATE HAS PASSED <<<<<<<");
    calCard.style.filter = "grayscale(100%)";
    calCard.style.opacity = "0.8";
    pastEvents.append(calCard);
  } else {
    calenderResults.append(calCard);
  }
  //   let today = new Date(calEndDate);
  //   //   console.log(calEndDate);
  //   if (calEndDate > new Date()) {
  //     console.log(">>>>>>>>>>>>");
  //     calCard.classList.add("pastEvent");
  //   }
  const addCalenderStorage = {
    id: activeUser,
    title,
    startDate,
    startTime,
    endDate,
    endTime,
  };

  userEvents.push(addCalenderStorage);
  localStorage.setItem("userCalender", JSON.stringify(userEvents));
  //   sortCalender();
};
// FINISH THE FUNCTION AND CHECK IF DATE IS BEHIND TODAYS DATE

const getCalenderData = () => {
  let parsedUserCalender = JSON.parse(
    localStorage.getItem("userCalender") || "[]"
  );

  //   let closestDeadline = Infinity;
  //   let closestEvent = null;
  //   parsedUserCalender.forEach((item) => {
  //     if (item.id === activeUser) {
  //       const endDate = new Date(item.endDate);
  //       const isBehind = isDateBehind(endDate);
  //       if (!isBehind && endDate < closestDeadline) {
  //         closestDeadline = endDate;
  //         closestEvent = item;
  //       }
  //     }
  //   });
  //   if (closestEvent) {
  //     const closestCard = document.querySelector(
  //       `.calender-card.${closestEvent.id}`
  //     );
  //     const closestParagraph = document.createElement("p");
  //     closestParagraph.textContent = "Closest to deadline!";
  //     closestCard.prepend(closestParagraph);
  //   }

  const userEvents = parsedUserCalender.filter(
    (item) => item.id === activeUser
  );
  userEvents.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
  userEvents.forEach((item) => {
    addtoCalender(
      item.title,
      item.startDate,
      item.startTime,
      item.endDate,
      item.endTime
    );
  });
};

// sortCalendar.addEventListener("click", () => {
//   calenderResults.innerHTML = "";
//   getCalenderData();
// });

const createPtag = (text) => {
  const p = document.createElement("p");
  p.textContent = text;
  return p;
};

const checkExistingDates = (startDate, startTime, endDate, endTime) => {
  let parsedEvents = JSON.parse(localStorage.getItem("userCalender") || "[]");
  console.log(parsedEvents);
  let overlap;
  if (!(parsedEvents.length === 0)) {
    for (let item of parsedEvents) {
      console.log(
        startDate,
        endDate + " items: " + item.startDate,
        item.endDate
      );
      if (startDate === item.startDate || startDate === item.endDate) {
        console.log("Startdate same as old date! Check the time!");
        overlap = checkTime(startTime, endTime, item.startTime, item.endTime);
        if (overlap) {
          return false;
        }
      }
      if (endDate === item.startDate || endDate === item.endDate) {
        console.log("Enddate same as old date!! check the time!!");
        overlap = checkTime(startTime, endTime, item.startTime, item.endTime);
        console.log("dates overlapping: " + overlap);
        if (overlap) {
          return false;
        }
      }
      if (startDate > item.endDate || endDate < item.startDate) {
        console.log("Dates ok");
      }
    }
    return true;
  } else {
    return true;
  }
};

const checkTime = (newStart, newEnd, oldStart, oldEnd) => {
  if (newEnd < oldStart || newStart > oldEnd) {
    return false;
  }
  return true;
};

const isDateBehind = (endDate) => {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  today = year + "-" + month + "-" + day;
  //   console.log("Todays date: " + today);
  //   console.log("Date to check: " + endDate);
  //   console.log(new Date(today));
  //   console.log(new Date(endDate));
  if (new Date(endDate) < new Date(today)) {
    return true;
  } else {
    return false;
  }
};

getCalenderData();
