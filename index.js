//Functions
function create_task(task_value){
    // Creating all the required elements
        const Task = document.createElement("div")
        Task.id = "task"
    
    // Value
        const Input = document.createElement("input")
        Input.value = task_value
        Input.id = "task_value"
        Input.disabled = true

    // Task delete button
        const Delete_Button = document.createElement("button")
        Delete_Button.innerHTML = "Delete"
        Delete_Button.id = "delete_button"
    
    // Assembling the task together + adding it to the screen
        Task_Container.insertBefore(Task, Task_Container.firstChild)
        Task.appendChild(Input)
        Task.appendChild(Delete_Button)
        localStorage.setItem(Input.value,Input.value)
    
    // Adding event listener to delete button
        Delete_Button.addEventListener("click", () => { 
            Task_Container.removeChild(Task) 
            localStorage.removeItem(Input.value)
            
            if(Error_visible === true){
                close_error(Error_visible)
                Error_visible = false
            }
        }
        )
    }

function find_task(task_value){
    let found_duplicate = false
    
    // Getting all tasks from local storage 
    let keys_arr = []
    const all_keys = Object.keys(localStorage)
    const all_keys_length = all_keys.length
    
    for(let x = 0; x < all_keys_length; x = x + 1){keys_arr.push( localStorage.getItem(all_keys[x]))}

    // Checks each element against task_value
    keys_arr.forEach(element => {
        if(element === task_value){
            found_duplicate = true
        }
    });

    return found_duplicate
}

function display_error(){
    const Error_Modal = document.createElement("div")
    Error_Modal.id = "error_modal"
    Error_Modal.innerHTML = "Duplicate tasks are not allowed"

    const Modal_Container = document.getElementById("modal_container")

    Modal_Container.appendChild(Error_Modal)
}

function close_error(Error_visible){
    if(Error_visible === true){
        const Error_Modal = document.getElementById("error_modal")
        const Modal_Container = document.getElementById("modal_container")

        Modal_Container.removeChild(Error_Modal)
    }
}

//On Startup (first load)

// Keep track if to show modal or not
let Error_visible = false

// Grabbing the elements from DOM
const Task_Container = document.getElementById("task_container")
const Form = document.getElementById("main_form")

// Getting all tasks from local storage
let values = []

// Gets all local storage keys , values and the number of keys
const keys = Object.keys(localStorage)
const keys_length = keys.length

// Stores all values from local storage into array
for(let x = 0; x < keys_length; x = x + 1){values.push( localStorage.getItem(keys[x]))}

// Loops trough each element in values array and passes each into create_task function
values.forEach(element => {
    create_task(element)
});

Form.addEventListener("submit", (event) => {
    // Prevents from refreshing the page on submit
    event.preventDefault()

    const Input_Value = document.getElementById("input")

    // Check if task with same name already exists
    if(find_task(Input_Value.value) === false){
        close_error(Error_visible)
        Error_visible = false
        create_task(Input_Value.value)
    }
    // Display error modal that task already exists
    else{
        if (Error_visible === false){
            Error_visible = true
            display_error()
        }
    }
})