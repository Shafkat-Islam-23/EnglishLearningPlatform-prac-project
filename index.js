// scrolling to the FAQ section when FAQ button is clicked in the navbar
document.getElementById("FAQ-btn").addEventListener("click", function () {
  document
    .getElementById("main-container")
    .scrollIntoView({ behavior: "smooth" });
});

// getting the buttons data from api call
const getButtons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => showbuttons(data.data));
};

// showing the buttons in the UI
const showbuttons = (levels) => {
  console.log(levels);
  const buttonContainer = document.getElementById("button-container");

  levels.forEach((level) => {
    //console.log(level);
    // id: 102;
    // lessonName: "Everyday Words";
    // level_no: 2;
    const div = document.createElement("div");

    div.innerHTML = `
            <button id="button-${level.level_no}" onclick = getLessons(${level.level_no}) class="btn btn-outline btn-primary">
            <img
              class="w-5"
              src="https://img.icons8.com/?size=100&id=Gg5gzNlumxCA&format=png&color=000000"
              alt=""
            />Lesson - ${level.level_no}
          </button>
  `;

    buttonContainer.appendChild(div);
  });
};

// getting lessons data from api call
const getLessons = (id) => {
  //console.log(id);

  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => showLessons(data));
};

// showing lessons in the UI dynamically

const showLessons = (lessons) => {
  console.log(lessons);

  // removing the previous lessons/FAQ section  from the UI
  const mainContainer = document.getElementById("main-container");
  mainContainer.innerHTML = "";
  //removing the default text from the UI
  const lessonText = document.getElementById("lesson-text");
  lessonText.innerHTML = "";
  lessonText.classList.remove("bg-gray-100");
  lessonText.classList.remove("py-10");

  lessons.data.forEach((lesson) => {
    console.log(lesson);

    const div = document.createElement("div");

    div.innerHTML = `

   <div class="card w-96 h-[300px] bg-base-100 card-lg shadow-sm">
        <div class="card-body">
          <h2 class="text-4xl font-bold text-center">${lesson.word}</h2>
          <p class="text-xl text-center text-gray-400">Meaning /Pronounciation</p>
          <p class="text-3xl font-bold text-gray-500 text-center">${lesson.meaning}/${lesson.pronunciation}</p>
          <div class="flex justify-between p-5">
            <img
              class="w-12 bg-gray-200 p-2 rounded-lg"
              src="https://img.icons8.com/?size=100&id=12403&format=png&color=000000"
              alt=""
            />
            <img
              class="w-12 bg-gray-200 p-2 rounded-lg"
              src="https://img.icons8.com/?size=100&id=XXKS9oY4uqiZ&format=png&color=000000"
              alt=""
            />
          </div>
        </div>
      </div>
  `;

    mainContainer.appendChild(div);
  });

  mainContainer.classList.add("card-container");
};

getButtons();
