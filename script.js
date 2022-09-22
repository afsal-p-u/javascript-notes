var popupBox = document.getElementById('new-note');
var closeBtn = document.querySelector('#close-btn');

function showBtn(){
    popupBox.style.display = 'block';
    titleValue.disabled = false;
    textContent.disabled = false;
    titleValue.value = '';
    textContent.value = '';
    submission.style.display = 'block';
    titleValue.classList.remove('focus');

    let changedNote = document.getElementById('edited-note');
    changedNote.style.display = 'none';
}

closeBtn.addEventListener('click', () => {
    popupBox.style.display = 'none';
})

var submission = document.querySelector('#submit');
var titleValue = document.querySelector('.title input');
var textContent = document.querySelector('.content textarea');
var newNote = document.querySelector('.notes');



submission.addEventListener('click', () => {
    if(titleValue.value == ''){
        titleValue.classList.add('focus');
    }else{

        var newDate = new Date().toLocaleDateString();

        const notes = {
            date: newDate,
            title: titleValue.value,
            value: textContent.value
        };

        var local = JSON.parse(localStorage.getItem('notes'));
        if(local == null){
            const arr = [];
            arr.push(notes);
            localStorage.setItem('notes', JSON.stringify(arr));
        }else{
            local.push(notes);
            localStorage.setItem('notes', JSON.stringify(local));
        }

        newNote.innerHTML = `<div class="note add-note" onclick="showBtn()">
                                <span class="material-icons-sharp">add</span>
                            </div>`

        reload()

        popupBox.style.display = 'none';

        titleValue.value = '';
        textContent.value = '';
    }
})

function reload() {
    var array = JSON.parse(localStorage.getItem('notes'));

    if(array != null){
        for(var i=array.length-1;i>=0;i--){
            newNote.innerHTML += `<div class="note added-note" id="${i}">
                                    <span>${array[i].date}</span>
                                    <h3 onclick="viewNote()" >${array[i].title}</h3>
                                    <div class="buttons">
                                        <div class="edit"><span onclick="editNote()" class="material-icons-sharp">edit_note</span></div>
                                        <div class="delete"><span onclick="deleteNote()" class="material-icons-sharp">delete</span></div>
                                    </div>
                                </div>`;
        }
    }
}

window.addEventListener('load', () => {
    reload()
})

function deleteNote(){
    const mark = document.querySelectorAll('.delete');
    var datas = JSON.parse(localStorage.getItem('notes'));
    var remaining;

    for(var i=mark.length-1;i>=0;i--){
        mark[i].onclick = function(){
            this.parentNode.parentNode.remove();

            remaining = datas.filter(data => data != datas[this.parentNode.parentNode.id]);

            localStorage.setItem('notes', JSON.stringify(remaining));

            newNote.innerHTML = `<div class="note add-note" onclick="showBtn()">
                                    <span class="material-icons-sharp">add</span>
                                </div>`;
            
            reload()
            
        }
    }
}

function editNote(){
    titleValue.classList.remove('focus');

    titleValue.disabled = false;
    textContent.disabled = false;

    var currentData = JSON.parse(localStorage.getItem('notes'));
    var mark = document.querySelectorAll('.edit');
    var noteDate = new Date().toLocaleDateString();
    var newData;

    for(var i=mark.length-1;i>=0;i--){
        mark[i].onclick = function(){
            popupBox.style.display = 'block';
            titleValue.value = currentData[this.parentNode.parentNode.id].title;
            textContent.value = currentData[this.parentNode.parentNode.id].value;

            let changedNote = document.getElementById('edited-note');
            submission.style.display = 'none';
            changedNote.style.display = 'block';

            changedNote.onclick = () => {
                if(titleValue.value == ''){
                    titleValue.classList.add('focus');
                }else{ 

                    if(currentData[this.parentNode.parentNode.id].title != titleValue.value || currentData[this.parentNode.parentNode.id].value != textContent.value){
                        this.parentNode.parentNode.remove();

                        newData = currentData.filter(data => data != currentData[this.parentNode.parentNode.id])

                        console.log('changed')
                        const notes = {
                            date: noteDate,
                            title: titleValue.value,
                            value: textContent.value
                        }

                        newData.push(notes);
                        localStorage.setItem('notes', JSON.stringify(newData));

                        popupBox.style.display = 'none';

                        newNote.innerHTML = `<div class="note add-note" onclick="showBtn()">
                                                <span class="material-icons-sharp">add</span>
                                            </div>`;

                        reload()
                    }else {
                        popupBox.style.display = 'none';
                    }
                }
            }
        }
    }
}

function viewNote(){
    var currentData = JSON.parse(localStorage.getItem('notes'));
    const noteLists = document.querySelectorAll('.added-note');

    for(var i= noteLists.length-1;i>=0;i--){
        noteLists[i].onclick = function(){
            popupBox.style.display = 'block';
            titleValue.value = currentData[this.id].title;
            textContent.value = currentData[this.id].value;
        }

        submission.style.display = 'none';
        let changedNote = document.getElementById('edited-note');
        changedNote.style.display = 'none';

        textContent.disabled = true;
        titleValue.disabled = true;
    }
}