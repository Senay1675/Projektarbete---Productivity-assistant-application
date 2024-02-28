const calenderContainer = document.querySelector("NTH-calender");
const calenderResults = document.querySelector(".cal-results");

const calTitle = document.querySelector("#calTitle");
const calStartDate = document.querySelector("#calStartDate");
const calStartTime = document.querySelector("#calStartTime");

const calEndDate = document.querySelector("#calEndDate");
const calEndTime = document.querySelector("#calEndTime");

const addToCal = document.querySelector("#addCalResult");

addToCal.addEventListener("click", () => {
  const title = calTitle.value;
  const startDate = calStartDate.value;
  const startTime = calStartTime.value;
  const endDate = calEndDate.value;
  const endTime = calEndTime.value;

  addtoCalender(title, startDate, startTime, endDate, endTime);
});

const addtoCalender = (title, startDate, startTime, endDate, endTime) => {
  //   let calenderEvent = {
  //     title,
  //     startDate,
  //     startTime,
  //     endDate,
  //     endTime,
  //   };
  const calCard = createDiv("calender-card");

  const calTitle = createDiv("calender-title");
  const calenderTitle = createPtag(title);
  calTitle.append(calenderTitle);

  const start = createDiv("start-mode");
  const calStartDate = createPtag(startDate);
  start.append(calStartDate);

  const end = createDiv("end-mode");

  calCard.append(calTitle, start, end);
  console.log(calCard);
  calenderResults.append(calCard);
  //   calenderResults.append(calCard);
};

const createPtag = (text) => {
  const p = document.createElement("p");
  p.textContent = text;
  return p;
};
