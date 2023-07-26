let bookmarkName = document.getElementById('bookmark-name');
let bookmarkURL = document.getElementById('bookmark-url');
let submit = document.getElementById('submit');
let tableBody = document.getElementById('tbody');
let btnDeleteAll = document.getElementById('delete-all');

// console.log(bookmarkName, bookmarkURL);

// #Create new bookmark

let bookmarkData;

if (localStorage.bookmarks != null) {
  bookmarkData = JSON.parse(localStorage.bookmarks);
} else {
  bookmarkData = [];
}

submit.onclick = function () {
  let bookmarkitem = {
    bookmarkName: bookmarkName.value,
    bookmarkURL: bookmarkURL.value,
  };

  console.log(bookmarkitem);

  bookmarkData.push(bookmarkitem);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarkData));

  clearInputs();
  addHtml();
};

// #Clear the inputs after submit

function clearInputs() {
  bookmarkName.value = '';
  bookmarkURL.value = '';
}

// #Add the data to the html

function addHtml() {
  let table = '';

  for (let i = 0; i < bookmarkData.length; i++) {
    // console.log(bookmarkData[i]);

    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${bookmarkData[i].bookmarkName}</td>
            <td><a href="https://${
              bookmarkData[i].bookmarkURL
            }" target="_blank">visit</a></td>
            <td><button class="btn btn-info btn-sm">Update</button></td>
            <td><button onclick="deleteBookmark(${i})" class="btn btn-danger btn-sm">Delete</button></td>
        </tr>
    `;
  }
  tableBody.innerHTML = table;

  if (bookmarkData.length) {
    btnDeleteAll.innerHTML = `<button class="btn btn-danger w-100 my-3" onclick="deleteAll()">Delete All</button>`;
  } else {
    btnDeleteAll.innerHTML = ``;
  }
}

addHtml();

// #delete the bookmark

function deleteBookmark(index) {
  bookmarkData.splice(index, 1);
  localStorage.bookmarks = JSON.stringify(bookmarkData);

  addHtml();
}

// #delete all

function deleteAll() {
  localStorage.clear();
  bookmarkData.splice(0);
  addHtml();
}
