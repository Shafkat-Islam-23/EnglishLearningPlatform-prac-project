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
  //console.log(levels);
  const buttonContainer = document.getElementById("button-container");

  levels.forEach((level) => {
    //console.log(level);
    // id: 102;
    // lessonName: "Everyday Words";
    // level_no: 2;
    //console.log("aa");
    const div = document.createElement("div");

    console.log(levels);

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
  // addding style to clicked button  and removing style from others

  for (let i = 1; i <= 7; i++) {
    const button = document.getElementById(`button-${i}`);
    if (i == id) button.classList.remove("btn-outline");
    else button.classList.add("btn-outline");
  }

  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => showLessons(data));
};

// showing lessons in the UI dynamically **

const showLessons = async (lessons) => {
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

  // Use a for...of loop to handle async/await properly
  for (const lesson of lessons.data) {
    const url = `https://openapi.programming-hero.com/api/word/${lesson.id}`;

    try {
      // Fetch the lesson details
      const response = await fetch(url);
      const data = await response.json();
      const info = data.data;

      // Safely access info properties
      const synonyms = info.synonyms || [];
      const synonym1 = synonyms[0] || "N/A";
      const synonym2 = synonyms[1] || "N/A";
      const synonym3 = synonyms[2] || "N/A";

      // Create the card dynamically
      const div = document.createElement("div");

      div.innerHTML = `
        <div class="card w-90 h-[300px] bg-base-100 card-lg shadow-sm">
          <div class="card-body">
            <h2 class="text-4xl font-bold text-center">${lesson.word}</h2>
            <p class="text-xl text-center text-gray-400">Meaning /Pronunciation</p>
            <p class="text-3xl font-bold text-gray-500 text-center">${lesson.meaning}/${lesson.pronunciation}</p>
            <div class="flex justify-between p-5">
              <!-- Open the modal using ID.showModal() method -->
              <button
                class="btn w-12 h-12 bg-gray-200 p-2 rounded-lg"
                onclick="document.getElementById('my_modal_${lesson.id}').showModal()"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=12403&format=png&color=000000"
                  alt=""
                />
              </button>
              <dialog id="my_modal_${lesson.id}" class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                  <div class="border-2 p-4 rounded-lg space-y-2">
                    <h2 id="word-${lesson.id}" class="text-4xl font-bold">${info.word}</h2>
                    <p class="text-2xl font-bold">Meaning:</p>
                    <p id="meaning-${lesson.id}" class="text-xl text-gray-400">${info.meaning}</p>
                    <p class="text-2xl font-bold">Example:</p>
                    <p id="sentence-${lesson.id}" class="text-2xl text-gray-400">${info.sentence}</p>
                    <p class="text-2xl">Synonyms:</p>
                    <div class="flex gap-3">
                      <button class="py-2 rounded-lg px-5 bg-gray-100">${synonym1}</button>
                      <button class="py-2 rounded-lg px-5 bg-gray-100">${synonym2}</button>
                      <button class="py-2 rounded-lg px-5 bg-gray-100">${synonym3}</button>
                    </div>
                  </div>
                  <div class="modal-action">
                    <form method="dialog">
                      <button class="btn bg-blue-500 text-white font-bold flex">
                        Complete learning
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
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
    } catch (error) {
      console.error("Error fetching lesson info:", error);
    }
  }
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

showModel = (id) => {
  console.log("clicked", id);

  const url = `https://openapi.programming-hero.com/api/word/${id}`;
};

getButtons();
FAQ();
lessonCommand();
