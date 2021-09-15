let todo = storageLoad()
console.log('change')

let filterDatabase = {
    textFilter: '',
    checkStatus: false,
    sortingWay: 'byCreation'

}

todo.forEach((individualTodo) =>{
    document.querySelector('#Todos-Web-Print').appendChild(itemDOMrendering(individualTodo))
})
document.querySelector('#counter-header').appendChild(todoCounter(todo)) 


//Event Listener - Filtering Bar
document.querySelector('#filtering-Section').addEventListener('input',(event)=>{
    filterDatabase.textFilter = event.target.value
    filterAndPrint(todo,filterDatabase)
})

//Event Listener - Adding new Todo
document.querySelector('#adding-zone').addEventListener('submit',(event)=>{
    event.preventDefault()
    let id = uuidv4()
    let timeStamp = moment().valueOf()
    if(!event.target.elements.InputElementThatAddsTodo.value){
    todo.push({
        id: id,
        title: 'EMPTY Item',
        body: '',
        status: false,
        createdAt: timeStamp,
        updatedAt: timeStamp
    })
}
    else {
        todo.push({
            id: id,
            title: event.target.elements.InputElementThatAddsTodo.value,
            body: '',
            status: false,
            createdAt: timeStamp,
            updatedAt: timeStamp
        })

    }
    updateLocalStorage(todo)
    
    event.target.elements.InputElementThatAddsTodo.value = ''
    
    location.assign(`edit.html#${id}`)

    filterAndPrint(todo,filterDatabase)
})


//Event Listener - Removing a Todo
document.querySelector('#deleting-zone').addEventListener('submit',(event)=>{
    event.preventDefault()
    todo.splice(event.target.elements.RemovesTodo.value-1,1)
    updateLocalStorage(todo)
    event.target.elements.RemovesTodo.value = ''
    filterAndPrint(todo,filterDatabase)
})
//Event Listener - checkbox
document.querySelector('#CheckBox-HitBox').addEventListener('change',(event)=>{
    filterDatabase.checkStatus = event.target.checked
    filterAndPrint(todo,filterDatabase)
})

//Synchronisation σε ολα τα τρεχουμενα sessions της index
window.addEventListener('storage', (event)=>{
   if(event.key === 'todos'){
       todo = JSON.parse(event.newValue)
       filterAndPrint(todo,filterDatabase)
   }
})

//Dropdown event listener
document.querySelector('#sort-dropdown').addEventListener('change',(event)=>{
   filterDatabase.sortingWay = event.target.value
   filterAndPrint(todo,filterDatabase)
   updateLocalStorage(todo)
})

