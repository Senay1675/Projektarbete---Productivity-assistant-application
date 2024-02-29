const calenderContainer = document.querySelector("NTH-calender");
const calenderResults = document.querySelector(".cal-results");

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
  console.log(result);
  addtoCalender(title, startDate, startTime, endDate, endTime);
});

const addtoCalender = (title, startDate, startTime, endDate, endTime) => {
  console.log(title, startDate, startTime, endDate, endTime);
  const calCard = createDiv("calender-card");

  const calTitle = createDiv("calender-title");
  const calenderTitle = createPtag(title);
  calTitle.append(calenderTitle);

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
  console.log(calCard);
  calenderResults.append(calCard);

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
};

const getCalenderData = () => {
  let userCalenderEvents = [];
  let parsedUserCalender = JSON.parse(
    localStorage.getItem("userCalender") || "[]"
  );
  console.log(parsedUserCalender);
  parsedUserCalender.forEach((item) => {
    console.log(item.id);
    console.log(activeUser);
    if (item.id === activeUser) {
      //   userCalenderEvents.push(item);
      console.log(
        item.title,
        item.startDate,
        item.startTime,
        item.endDate,
        item.endTime
      );
      addtoCalender(
        item.title,
        item.startDate,
        item.startTime,
        item.endDate,
        item.endTime
      );
    }
  });
  console.log(userCalenderEvents);
};

const createPtag = (text) => {
  const p = document.createElement("p");
  p.textContent = text;
  return p;
};

const checkExistingDates = (startDate, startTime, endDate, endTime) => {
  let parsedEvents = JSON.parse(localStorage.getItem("userCalender") || "[]");
  console.log(parsedEvents);
  parsedEvents.forEach((item) => {
    if (item.startDate === startDate) {
      if (endTime < item.startTime || startTime > item.endTime) {
        console.log("is ok");
      } else {
        console.log("Times overlapping!!");
        return false;
      }
    }
  });
};
getCalenderData();
