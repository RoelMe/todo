const dateDisplay = document.querySelector('.date')
const taskInput = document.querySelector('.new-to-do input')
const taskAdd = document.querySelector('.new-to-do #add')
let todos = JSON.parse(localStorage.getItem('todo-list')) //create a variable n empty object called todo-list in local storage
const taskList = document.querySelector('.task-list ul')
let clearDone = document.querySelector('.clear-done')
let filters = document.querySelectorAll('.filters li')
let editedId
let isEditedTask = false

var today = new Date()
// var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var date = today.toLocaleDateString(undefined, options)

dateDisplay.innerText = date

function showToDo(filter) {
    let li = ''
    if(todos) {
    todos.forEach((todo, id) => {
        let isCompleted = todo.status == 'done' ? 'checked' : "" //if todo status is done, set isCompleted value to checked
        if (filter == todo.status || filter == 'all') {
            li += `<li class="task">     
                    <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <p class="${isCompleted}">${todo.name}</p>
                    </label>
                    <div class="modify">
                        <i onmouseover="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                        <ul>
                            <li onclick="editToDo(${id}, '${todo.name}')"><i class="fa-regular fa-pen-to-square"></i>Edit</li>
                            <li onclick="deleteToDo(${id})"><i class="fa-regular fa-trash-can"></i>Delete</li>
                        </ul>
                    </div>
                </li>`
        }   
    });
    taskList.innerHTML = li || `<li>You don't have any to-do's here</li>`
}}
showToDo('all')

function showMenu(selectedToDo) {
    let taskMenu = selectedToDo.parentElement.lastElementChild
    taskMenu.classList.add("show")
    document.addEventListener('click', (e) => {
        if(e.target.tagName != "I" || e.target != selectedToDo) {
        taskMenu.classList.remove("show")
        }
    }) 
}

function deleteToDo(deleteId) {
    let activeFilter = document.querySelector('li.selected')
    todos.splice(deleteId, 1)
    localStorage.setItem('todo-list', JSON.stringify(todos))
    showToDo(activeFilter.id)
}

function editToDo(editId, editName) {
    editedId = editId
    isEditedTask = true
    taskInput.value = editName
    taskInput.focus()
}

function updateStatus(selectedToDo) {
    let activeFilter = document.querySelector('li.selected')
    let taskName = selectedToDo.parentElement.lastElementChild
    if (selectedToDo.checked) {
        taskName.classList.add('checked')
        todos[selectedToDo.id].status = 'done'
    } else {
        taskName.classList.remove('checked')
        todos[selectedToDo.id].status = 'pending'
    }
    localStorage.setItem('todo-list', JSON.stringify(todos))
    setTimeout(showToDo(activeFilter.id), 30000)
}

taskAdd.addEventListener('click', () => {
    let activeFilter = document.querySelector('li.selected')
    let userTask = taskInput.value.trim() /* trim() removes the leading and trailing white space and line terminator characters from a string. */
    if(userTask) {
        if(!isEditedTask) {
            if(!todos) {
            todos = [] //if there are no todos, create an empty array
            }
            let taskInfo = {
            name: userTask,
            status: 'pending',
            }
        todos.push(taskInfo)
        }
        else {
            isEditedTask = false
            todos[editedId].name = userTask
        }
        
        
        taskInput.value = '' //empty the input field after the user presses enter
        localStorage.setItem('todo-list', JSON.stringify(todos))
        showToDo(activeFilter.id)
    }
})

taskInput.addEventListener('keyup', (e) => {
    let activeFilter = document.querySelector('li.selected')
    let userTask = taskInput.value.trim() /* trim() removes the leading and trailing white space and line terminator characters from a string. */
        if (e.key == 'Enter' && userTask) { /* only add a task if the user clicks Enter and the taskInput field is not empty */
        if(!isEditedTask) {
            if(!todos) {
            todos = [] //if there are no todos, create an empty array
            }
            let taskInfo = {
            name: userTask,
            status: 'pending',
            }
        todos.push(taskInfo)
        }
        else {
            isEditedTask = false
            todos[editedId].name = userTask
        }
        
        
        taskInput.value = '' //empty the input field after the user presses enter
        localStorage.setItem('todo-list', JSON.stringify(todos))
        showToDo(activeFilter.id)
    }
})

/* clearAll.addEventListener('click', () => {
    todos.splice(0, todos.length)
    localStorage.setItem('todo-list', JSON.stringify(todos))
    showToDo('all')
}) */

for (let filter of filters) {
        filter.addEventListener('click', () => {
            document.querySelector('li.selected').classList.remove('selected')
            filter.classList.add('selected')
            showToDo(filter.id)
        })
    }

    clearDone.addEventListener('click', () => {
        let activeFilter = document.querySelector('li.selected')
        for (let i = todos.length-1; i >=0; i--) {
            if((todos[i].status) != 'pending') {
                todos.splice(i, 1)
                localStorage.setItem('todo-list', JSON.stringify(todos))
                showToDo(activeFilter.id)
                
            }
            
              
      }  
      
})

