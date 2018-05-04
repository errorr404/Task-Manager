// Define UI variable
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearbtn= document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
 
// load all Event listners
loadEventListners();

function loadEventListners(){
  // DOM load Event
  document.addEventListener('DOMContentLoaded',getTasks);
  // Add task event
  form.addEventListener('submit',addTask);

  // remove Task event
  taskList.addEventListener('click',removeTask);

  // clear task event

  clearbtn.addEventListener('click',clearTask);

  // filter task event
  filter.addEventListener('keyup', search);
}

// Get task from LS
function getTasks()
{
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  }else {
    tasks= JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
// Create li element
const li = document.createElement('li'); 
// Add a class
li.className='collection-item';
//create text node and append to li
li.appendChild(document.createTextNode(task));

// create new link element
const link =  document.createElement('a');
// add a class
link.className= 'delete-item secondary-content';
// Add icon html
link.innerHTML ='<i class="fa fa-remove"></i>';
// append to li
li.appendChild(link);
// append li to ul
taskList.appendChild(li);
  });
}
// Add task

function addTask(e){
if(taskInput.value === ''){
alert('Add a task');
}

// Create li element
const li = document.createElement('li'); 
// Add a class
li.className='collection-item';
//create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));

// create new link element
const link =  document.createElement('a');
// add a class
link.className= 'delete-item secondary-content';
// Add icon html
link.innerHTML ='<i class="fa fa-remove"></i>';
// append to li
li.appendChild(link);
// append li to ul
taskList.appendChild(li);

// store in LS
storeTaskInLocalStorage(taskInput.value)
;
// clear input
taskInput.value='';

  e.preventDefault();
}
// Store task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  }else {
    tasks= JSON.parse(localStorage.getItem('tasks'));
  }


  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Remove Task
function removeTask(e)
{
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
 e.target.parentElement.parentElement.remove(); 

 // remove form LS
 removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
// Remove to LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')=== null){
    tasks = [];
  }else {
    tasks= JSON.parse(localStorage.getItem('tasks'));
  }
  //console.log(taskItem);

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task) {
      tasks.splice(index, 1); 
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
// clear task

function clearTask(){
  //taskList.innerHTML ='';

  // faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // clear task from LS
  clearTaskFromLocalStorage();
}
// clear task from LS
function clearTaskFromLocalStorage(){
  localStorage.clear();
}

// filter Tasks
function search(e){

  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
       task.style.display = 'block';
    }
    else{
      task.style.display ='none';
    }
  });
}

