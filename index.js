// Grabbing the elements from DOM
const Todo_Element = document.getElementById("todo")
const Form = document.getElementById("main_form")

//Getting all tasks from local storage
var values = []

// Gets all local storage keys , values and the number of keys
keys = Object.keys(localStorage)
keys_length = keys.length

// Stores all values from local storage into array
for(let x = 0; x < keys_length; x = x + 1){values.push( localStorage.getItem(keys[x]))}

// Loops trough each element in values array and passes each into create_task function
values.forEach(element => {
    create_task(element)
});

function create_task(task_value){
    // Creating all the required elements
        const Task_Div = document.createElement("div")
        Task_Div.id = "task"
    
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
        Todo_Element.appendChild(Task_Div)
        Task_Div.appendChild(Input)
        Task_Div.appendChild(Delete_Button)
        localStorage.setItem(Input.value,Input.value)
    
    // Adding event listener to delete button
        Delete_Button.addEventListener("click", () => { Todo_Element.removeChild(Task_Div); localStorage.removeItem(Input.value)})
        
    }

Form.addEventListener("submit", (event) => {
// Prevents from refreshing the page on submit
    event.preventDefault()

// Gets inputed value to pass it into create_task function
    const Input_Value = document.getElementById("input")
    create_task(Input_Value.value)

})