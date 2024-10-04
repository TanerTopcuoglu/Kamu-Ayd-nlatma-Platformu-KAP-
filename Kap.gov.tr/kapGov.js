"use strict";

// Javascript ile sirket kutusu kodları

// javascript saat fonksiyonu
const now = new Date();
const time = now.toLocaleTimeString("tr-TR", {
  hour: "2-digit",
  minute: "2-digit",
});
// Liste ekleme javascripti
let sirketListesi = [];

if (localStorage.getItem("sirketListesi") !== null) {
  sirketListesi = JSON.parse(localStorage.getItem("sirketListesi"));
}

let editId;
let isEditTask = false;
const taskInput = document.querySelector("#txtTaskName");
const taskInputa = document.querySelector("#txtTaskNamee");
const btnClear = document.querySelector("#btnClear");
displayTasks();
function displayTasks() {
  let ul = document.getElementById("task-list");
  ul.innerHTML = "";
  if (sirketListesi.length == 0) {
    ul.innerHTML = "<p class='p-3 m-0'>Gorev Listeniz Boş. </p>";
  } else {
    for (let sirket of sirketListesi) {
      let li = `
          <li class="task list-group-item d-flex align-items-center">
                      <div class="col-1">
                        <div class="form-check">
                          <input type="checkbox" id="${sirket.id}" />
                          <label for="${sirket.id}" class="form-check-label">${sirket.sıraNo}</label>
                        </div>
                      </div>
                      <div class="col-1"> <label for="${sirket.id}">Bugün ${time}</label></div>
                      <div class="col-9 ms-4 s-yazı-fontu text-start">
                        <label for="${sirket.id}" > ${sirket.sirketAdi}</label>
                        <label for="${sirket.id}">${sirket.sirketAcıklama}</label>
                      </div>
                      <div class="col-1 ms-3">
                        <div class="dropdown">
                        <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <i class="fa-solid fa-paperclip bulet-yazı"></i>
                        </button>
                        <ul class="dropdown-menu ">
                          <li><a onclick="deleteTask(${sirket.id})" class="dropdown-item" href="#"> <i class="fa-solid fa-trash-can" style="color: #e60505;"></i>  Sil</a></li>
                          <li><a onclick='updateTask(${sirket.id},"${sirket.sirketAdi}","${sirket.sirketAcıklama}")' class="dropdown-item" href="#"> <i class="fa-solid fa-user-pen" style="color: #63E6BE;"></i>  Güncelle</a></li>
                          
                        </ul>
                      </div>
                        </div>

                    </li>`;
      ul.insertAdjacentHTML("beforeend", li);
    }
  }
}
*
// eleman ekleme metodu
document.querySelector("#btnAddNewTask").addEventListener("click", newTask);

function newTask(event) {
  if (taskInput.value == "" || taskInputa.value == "") {
    alert("Bilgileri eksiksiz girmelisiniz.");
  } else {
    if (!isEditTask) {
      sirketListesi.push({
        id: sirketListesi.length + 1,
        sıraNo: sirketListesi.length + 1,
        sirketAdi: taskInput.value,
        sirketAcıklama: taskInputa.value,
      });
    } else {
      for (let sirket of sirketListesi) {
        if (sirket.id == editId) {
          sirket.sirketAdi = taskInput.value;
          sirket.sirketAcıklama = taskInputa.value;
        }
        isEditTask = false;
      }
    }
    taskInput.value = "";
    taskInputa.value = "";
    displayTasks();
    localStorage.setItem("sirketListesi", JSON.stringify(sirketListesi));
  }

  event.preventDefault();
}
// listeden eleman sileme
function deleteTask(id) {
  let deletedId = sirketListesi.findIndex((sirket) => sirket.id == id);
  sirketListesi.splice(deletedId, 1);
  displayTasks();
  localStorage.setItem("sirketListesi", JSON.stringify(sirketListesi));
}

// liste elemanını güncelleme
function updateTask(taskId, taskName, taskAcıklama) {
  editId = taskId;
  isEditTask = true;
  taskInput.value = taskName;
  taskInput.focus();
  taskInput.classList.add("active");
  taskInputa.value = taskAcıklama;
  taskInputa.focus();
  taskInputa.classList.add("active");
}
//  Listedeki tüm elemanları silme
btnClear.addEventListener("click", Clear);
function Clear(event) {
  sirketListesi.splice(0, sirketListesi.length);
  localStorage.setItem("sirketListesi", JSON.stringify(sirketListesi));
  displayTasks();
}
