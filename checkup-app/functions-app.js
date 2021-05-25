//lib


let storageLoad = function(){
let preLoadedJSON = localStorage.getItem('todos')
if(preLoadedJSON !== null){
    return JSON.parse(preLoadedJSON)
}
    else{
    
    return []
}}

//
let todoCounter = function(array){
    let i=array.length
    let counter = document.createElement('h1')
    array.forEach(function(item){
        if(item.status){
            i--
        }
    })
    counter.textContent = `You have ${i} Todos Left:`
    return counter
}

let updateLocalStorage = function(anArrayToUpdate){
    localStorage.setItem('todos',JSON.stringify(anArrayToUpdate))
}

//function that removes a todo item when the left side button is clicked
let removeLinkedItem = function (itemID){
    let itemPosition = todo.findIndex(function(noteItem){
        return noteItem.id === itemID
    })
    if (itemPosition != -1){
        todo.splice(itemPosition, 1)
    }
}


//Forming up the items that will be printed on the browser page 
//This happens after the filtering phase and before the printing phase 
//Each item is a div element which is fathering 'button' + 'span' + 'checkbox' elements
let itemDOMrendering = function (individualTodo){
  
    //Declaring all 4 new elements that represent an item
   let newDiv = document.createElement('div')
   let newCheckbox = document.createElement('input')
       newCheckbox.setAttribute('type','checkbox')
   let newAnchor = document.createElement('a')
       newAnchor.setAttribute(`href`,`edit.html#${individualTodo.id}`)
   let newButton = document.createElement('button')
     
    //Setting up the appropriate text values for button and span
     newButton.textContent = 'x'
     newAnchor.textContent = individualTodo.title
     
     //linking and establishing button to appropriate working feautures
     newButton.addEventListener('click',function(e){
          //Το όρισμα εδω δεν συμβολιζει την οποια τιμη εχει, ειναι ΦΙΞ σταθερη
          removeLinkedItem(individualTodo.id)
          //Γιατι μολις τελειωσει η itemDOMrendering το individualTodo γινεται UNDEFINED 
          updateLocalStorage(todo)
          filterAndPrint(todo,filterDatabase)

     })
     
     //linking and establishing checkbox to appropriate working features
     //first line is the default value of the checkbox prior to any action taken by the user (before event listener being initiated)
     //we want to be checked if status is true, unchecked if false
     newCheckbox.checked = individualTodo.status
     newCheckbox.addEventListener('change',function(event){
         individualTodo.status = event.target.checked
         updateLocalStorage(todo)
         filterAndPrint(todo,filterDatabase)
     })
        
        //appending button span and checkbox as div childs (in that order)
        newDiv.appendChild(newButton) 
        newDiv.appendChild(newAnchor)
        newDiv.appendChild(newCheckbox)
   
    //Returning the entire set (div with its 3 childs)
     return newDiv
}




let filterAndPrint = function(anArrayToFilter, aFilterSet){
    let postFilterArray = anArrayToFilter.filter(function(individualTodo){
       if(!aFilterSet.checkStatus){
        return individualTodo.title.toLowerCase().includes(aFilterSet.textFilter.toLowerCase())
       }
       else if(aFilterSet.checkStatus){
        return individualTodo.title.toLowerCase().includes(aFilterSet.textFilter.toLowerCase()) && !individualTodo.status
       }
    })
    document.querySelector('#counter-header').innerHTML=''
    document.querySelector('#Todos-Web-Print').innerHTML=''

    postFilterArray.forEach(function(individualTodo){
        document.querySelector('#Todos-Web-Print').appendChild(itemDOMrendering(individualTodo))
    })
    document.querySelector('#counter-header').appendChild(todoCounter(anArrayToFilter))
}


//Generating Last Edit
let lastEditGenerator = function(aTimeStamp){
    return `Last Edited: ${moment(aTimeStamp).fromNow()}`
}