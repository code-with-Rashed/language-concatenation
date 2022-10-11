'use strict';

const form = document.getElementById('form');
const inputBox = document.getElementById('input-box');
let uniqueId = 1;

//Reset Page
function resetPage() {
    if (confirm("Are you sure you wan't to REFRESH this page.")) {
        location.reload();
    }
}
//Add New Input Vox
function addBox() {
    uniqueId++;
    let data = `<div class="inp-box" id="deleteBox${uniqueId}">
                  <div class="lang-one">
                      <label>
                          <input type="text" placeholder='lang one' required class="lang_one_inp">
                      </label>
                  </div>
                  <div class="lang-two">
                      <label>
                          <input type="text" required placeholder='lang two' class="lang_two_inp">
                      </label>
                  </div>
                  <div class="rm-box" title="remove boxes">
                      <button type="button" class="rm-btn" onclick="deleteBox(${uniqueId})">&times;</button>
                  </div>
               </div>`;
    let div = document.createElement('div');
    div.innerHTML = data;
    inputBox.appendChild(div.firstElementChild);
}

//Delete input Box
function deleteBox(id) {
    let deleteBox = document.getElementById('deleteBox' + id);
    deleteBox.remove();
}

// Language to Language Concatinated
form.addEventListener('submit', function (event) {
    event.preventDefault();
    let lang_one_inp = document.querySelectorAll('.lang_one_inp');
    let lang_two_inp = document.querySelectorAll('.lang_two_inp');
    let lang_one_store = [];
    let lang_two_store = [];
    [...lang_one_inp].forEach(elem => {
        lang_one_store.push(elem.value);
    });

    [...lang_two_inp].forEach(elem => {
        lang_two_store.push(elem.value);
    });

    if (lang_one_store.length === lang_two_store.length) {
        let concatinationPrepare = [];
        let length = lang_one_store.length;
        for (let str = 0; str < length; str++) {
            concatinationPrepare.push(lang_one_store[str], lang_two_store[str]);
        }
        let concatinateStr = concatinationPrepare.join(' ');
        showResult(concatinateStr);
    }
});

//Show Result Box
function showResult(str) {
    document.getElementById('result-box').style.display = 'block';
    document.getElementById('text-copy').value = str;
    document.getElementById('word').innerText = str;
}

//Close Result Box
function closeResultBox() {
    if (confirm("Are you sure you wan't CLOSE this Result Box")) {
        document.getElementById('result-box').style.display = 'none';
    }
}

//Copy Data
function copyData() {
    let copy = document.getElementById('text-copy');
    copy.select();
    document.execCommand('copy');
}

//Covert to Word File;
function wordFile() {
    let text = document.getElementById('word').innerText;
    let data = new Blob([text], { type: 'application/msword' });
    let textFile = window.URL.createObjectURL(data);
    let url = textFile

    //Specify file name
    let filename = uniqueId ? uniqueId + '_ms' + '.doc' : 'document.doc';

    // Create download link element
    let downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(data, filename);
    } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);

}
