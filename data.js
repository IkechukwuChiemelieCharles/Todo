"use strict";
const input = document.querySelector("#input");

const listContainer = document.querySelector(".listContainer");
const btn = document.querySelector("#btn");

const all = document.querySelectorAll(".all");
const active = document.querySelectorAll(".active");
const completed = document.querySelectorAll(".completed");

const darkToggle = document.querySelector("#darkToggle");
const lightToggle = document.querySelector("#lightToggle");

const bodyDark = document.getElementsByTagName("body");

const itemCount = document.querySelector(".itemCount");
const deleteCompleted = document.querySelector(".deleteCompleted");

const panel2 = document.querySelector(".panel2");

// darkMode

const inputContainer = document.querySelector(".inputContainer");
const body = document.querySelector("body");

btn.addEventListener("click", displayTodo);

function displayTodo(e) {
  e.preventDefault();

  if (input.value === "") return;

  //create list item
  const listItem = document.createElement("li");

  //added class to list item created
  listItem.classList.add("list");

  //changed list text to input value
  listItem.innerText = input.value;

  //set input value back to empty string
  input.value = "";

  // created div,
  const checked = document.createElement("div");
  // added class to check div, and prepended it to the list item
  checked.classList.add("checked");

  checked.innerHTML = ` <img  src="./images/icon-check.svg" alt="" />`;

  listItem.prepend(checked);

  //created a div
  const icon = document.createElement("div");
  icon.classList.add("remove");
  //added an img with src into the icon div
  icon.innerHTML = ` <img  src="./images/icon-cross.svg" alt="" />`;

  //appended the div into the list item
  listItem.append(icon);

  //appended the list item into the list container
  listContainer.prepend(listItem);

  // itemCount.textContent = "Hey";
  // console.log(listContainer.length);
  const lengths = (itemCount.textContent = `${
    listContainer.children.length
  }   ${listContainer.children.length === 1 ? "item" : "items"}  left`);
}

listContainer.addEventListener("click", deleteCheck);

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "remove") {
    const todo = item.parentElement;
    todo.classList.add("hide");
    todo.addEventListener("animationend", function () {
      todo.remove();
    });

    itemCount.textContent = `${listContainer.children.length - 1} ${
      listContainer.children.length === 2 ? "item" : "items"
    }  left`;
  }

  if (item.classList[0] === "checked") {
    const todo = item.parentElement;

    //added a class of inactive
    todo.classList.toggle("inactive");

    //added a class of checkedInactive

    // created div,
    let checked = document.createElement("div");

    // checked.classList.add("checked");
    item.classList.toggle("checkedInactive");

    //created a div
    const mark = document.createElement("div");

    //added an img into the div

    // appended the div into the checked
    item.appendChild(mark);
  }
}
for (const item of all) {
  item.addEventListener("click", filter);
}
for (const item of completed) {
  item.addEventListener("click", filter);
}
for (const item of active) {
  item.addEventListener("click", filter);
}
deleteCompleted.addEventListener("click", filter);

function filter(e) {
  const todos = listContainer.children;

  for (const todo of todos) {
    switch (e.target.innerText) {
      case "All":
        e.target.style.opacity = 1;
        for (const item of active) {
          item.style.opacity = 0.4;
          item.classList.remove("color");
        }
        for (const item of completed) {
          item.style.opacity = 0.4;
          item.classList.remove("color");
        }

        e.target.classList.add("color");

        todo.style.display = "flex";

        break;

      case "Active":
        for (const item of all) {
          item.classList.remove("color");
          item.style.opacity = 0.4;
        }
        for (const item of completed) {
          item.classList.remove("color");
          item.style.opacity = 0.4;
        }

        e.target.classList.add("color");
        e.target.style.opacity = 1;

        if (todo.classList.contains("inactive")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }

        break;
      case "Completed":
        for (const item of active) {
          item.classList.remove("color");
          item.style.opacity = 0.4;
        }
        for (const item of all) {
          item.classList.remove("color");
          item.style.opacity = 0.4;
        }
        e.target.classList.add("color");

        e.target.style.opacity = 1;
        if (todo.classList.contains("inactive")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }

        break;
      case "Clear Completed":
        const toDelete = [];

        for (const todo of todos) {
          if (todo.classList.contains("inactive")) {
            toDelete.push(todo); // Add to array if it has the class "inactive"
          }
        }

        for (const todo of toDelete) {
          todo.remove();
          itemCount.textContent = `${listContainer.children.length} ${
            listContainer.children.length === 1 ? "item" : "items"
          }  left`;
        }
    }
  }
}

darkToggle.addEventListener("click", darkMode);
lightToggle.addEventListener("click", lightMode);

function darkMode() {
  body.classList.add("theme2");
  darkToggle.classList.add("hidden");
  lightToggle.classList.remove("hidden");
}
function lightMode() {
  darkToggle.classList.remove("hidden");
  lightToggle.classList.add("hidden");
  body.classList.remove("theme2");
}
