"use strict";
const input = document.querySelector("#input");

const listContainer = document.querySelector(".listContainer");
const btn = document.querySelector("#btn");

const all = document.querySelector(".all");
const active = document.querySelector(".active");
const completed = document.querySelector(".completed");

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
  listContainer.append(listItem);
}

listContainer.addEventListener("click", deleteCheck);

function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "remove") {
    const todo = item.parentElement;
    todo.classList.add("hide");
    todo.addEventListener("animationend", function () {
      todo.remove();
      console.log("trans");
    });

    // console.log("remove");
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

all.addEventListener("click", filter);
completed.addEventListener("click", filter);
active.addEventListener("click", filter);

function filter(e) {
  const todos = listContainer.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.innerText) {
      case "All":
        e.target.style.opacity = 1;
        active.style.opacity = 0.4;
        completed.style.opacity = 0.4;

        e.target.classList.add("color");
        active.classList.remove("color");
        completed.classList.remove("color");

        todo.style.display = "flex";
        console.log(e.target);

        break;

      case "Active":
        console.log("click");
        all.classList.remove("color");
        completed.classList.remove("color");
        e.target.classList.add("color");
        e.target.style.opacity = 1;
        all.style.opacity = 0.4;
        completed.style.opacity = 0.4;

        if (todo.classList.contains("inactive")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }

        break;
      case "Completed":
        active.classList.remove("color");
        all.classList.remove("color");
        e.target.classList.add("color");

        e.target.style.opacity = 1;
        all.style.opacity = 0.4;
        active.style.opacity = 0.4;
        if (todo.classList.contains("inactive")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}
