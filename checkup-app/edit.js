let itemID = location.hash.substring(1)
let todos = storageLoad()
let linkedItem = todos.find((item)=>{
    return item.id === itemID
})

if (!linkedItem){
    location.assign('/index.html')
}

titleElement = document.querySelector('#Title-Zone')
bodyElement = document.querySelector('#Text-Zone')
editInfoElement = document.querySelector('#last-edit')

titleElement.value = linkedItem.title
bodyElement.value = linkedItem.body
editInfoElement.textContent = lastEditGenerator(linkedItem.updatedAt)

titleElement.addEventListener('input',(event)=>{
    linkedItem.title = event.target.value
    linkedItem.updatedAt = moment().valueOf()
    editInfoElement.textContent = lastEditGenerator(linkedItem.updatedAt)
    updateLocalStorage(todos)
})

bodyElement.addEventListener('input',(event)=>{
    linkedItem.body = event.target.value
    linkedItem.updatedAt = moment().valueOf()
    editInfoElement.textContent = lastEditGenerator(linkedItem.updatedAt)
    updateLocalStorage(todos)
})

document.querySelector('#return-to-base').addEventListener('click',(event)=>{
    location.assign('/index.html')
})

document.querySelector('#remove-button').addEventListener('click',(event)=>{
    let indexToDelete = todos.findIndex((note)=>{
        return note.id === itemID
    })
    todos.splice(indexToDelete, 1)
    updateLocalStorage(todos)
    location.assign('/index.html')
})


window.addEventListener('storage',(event)=>{
    if (event.key === 'todos'){
        todos = JSON.parse(event.newValue)
        
        let linkedItem = todos.find((item)=>{
            return item.id === itemID
        })
        
        if (!linkedItem){
            location.assign('/index.html')
        }
        
        titleElement = document.querySelector('#Title-Zone')
        bodyElement = document.querySelector('#Text-Zone')
        
        titleElement.value = linkedItem.title
        bodyElement.value = linkedItem.body
    }
})

