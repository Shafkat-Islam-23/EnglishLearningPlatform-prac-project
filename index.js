// scrolling to the FAQ section and loading when FAQ button is clicked in the navbar **
document.getElementById("FAQ-btn").addEventListener("click", function () {
  document
    .getElementById("main-container")
    .scrollIntoView({ behavior: "smooth" });
  const mainContainer = document.getElementById("main-container");

  // removing all previous styles and adding new styles
  mainContainer.className = "";
  mainContainer.classList.add("main-default-style");

  lessonCommand();
  FAQ();
});

const lessonCommand = () => {
  const lessonCommand = document.getElementById("lessons-coommand");
  lessonCommand.innerHTML = `
  <div
          id="lesson-text"
          class="text-center bg-gray-100 w-11/12 mx-auto py-10 space-y-5 rounded-lg"
        >
          <p class="text-sm text-gray-400">
            আপনি এখনো কোন Lesson Select করেন ন
          </p>
          <h3 class="text-3xl font-bold">একটি Lesson Select করুন।</h3>
        </div>
  `;
};

const FAQ = () => {
  const mainContainer = document.getElementById("main-container");
  mainContainer.innerHTML = `
  <h2 class="text-center text-3xl font-bold">
          <span class="text-blue-500">Frequently</span> Asked Questions
        </h2>
        <div class="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" checked="checked" />
          <div class="collapse-title font-semibold">
            1 . the difference between var, let, and const
          </div>
          <div class="collapse-content text-sm">
            Click the "Sign Up" button in the top right corner and follow the
            registration process.
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div class="collapse-title font-semibold">
            2. the difference between map(), forEach(), and filter()
          </div>
          <div class="collapse-content text-sm">
            Click on "Forgot Password" on the login page and follow the
            instructions sent to your email.
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div class="collapse-title font-semibold">
            3. explain arrow functions and how they are different from regular
            functions
          </div>
          <div class="collapse-content text-sm">
            Go to "My Account" settings and select "Edit Profile" to make
            changes.
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div class="collapse-title font-semibold">
            3. how JavaScript Promises work
          </div>
          <div class="collapse-content text-sm">
            Go to "My Account" settings and select "Edit Profile" to make
            changes.
          </div>
        </div>
        <div class="collapse collapse-plus bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-3" />
          <div class="collapse-title font-semibold">
            5. how closures work in JavaScript
          </div>
          <div class="collapse-content text-sm">
            Go to "My Account" settings and select "Edit Profile" to make
            changes.
          </div>
        </div>
  
  `;
};

// getting the buttons data from api call **
const getButtons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => showbuttons(data.data));
};

// showing the buttons in the UI  **
const showbuttons = (levels) => {
  console.log(levels);
  const buttonContainer = document.getElementById("button-container");

  levels.forEach((level) => {
    //console.log(level);
    // id: 102;
    // lessonName: "Everyday Words";
    // level_no: 2;
    console.log("aa");
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

// getting lessons data from api call **
const getLessons = (id) => {
  //console.log(id);

  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => showLessons(data));
};

// showing lessons in the UI dynamically **

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
  // removing the style added during alert showing

  if (lessons.data.length === 0) {
    showAlert();
    return;
  }

  // removing all previous styles and adding new styles
  mainContainer.className = "card-container";
  mainContainer.classList.add("card-container");

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
};

// function to show alert when no lessons are found **

const showAlert = () => {
  const div = document.createElement("div");
  div.innerHTML = `
   <div class="flex flex-col justify-center items-center gap-10">
        <img
          src="https://img.icons8.com/?size=100&id=wZx7IfsFeH90&format=png&color=000000"
          alt=""
        />
        <p class="text-xl text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="text-3xl font-bold">নেক্সট Lesson এ যান</h2>
      </div>
  
  `;

  const mainContainer = document.getElementById("main-container");
  mainContainer.classList.add("new_style");
  mainContainer.appendChild(div);
};

getButtons();
FAQ();
lessonCommand();
