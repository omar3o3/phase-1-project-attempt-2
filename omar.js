let dataFetch = () => {fetch('http://hp-api.herokuapp.com/api/characters').then(resp => resp.json()).then(data => searchBarListener(data)).catch(error => console.log(error))}

dataFetch();



let searchBar = document.getElementById('search-bar');
let charactersReturnedList = document.getElementById('search-result-list');
let nameInput = document.getElementById('name-input');
let houseInput = document.getElementById('house-input');
let profileImage = document.getElementById('character-image');

let learnMoreButton = document.getElementById('learn-more-button')

let speciesInput = document.getElementById('species-input');
let speciesDiv = document.querySelector('.species-div');

let birthInput = document.getElementById('birth-input');
let birthDiv = document.querySelector('.birth-div');

let ancestryInput = document.getElementById('ancestry-input');
let ancestryDiv = document.querySelector('.ancestry-div');

let addClassButton = document.getElementById('add-to-class-button');
let classSelectedList = document.getElementById('class-selected-list');

let clearListButton = document.getElementById('clearList');


let searchBarListener = (data) =>{
    searchBar.addEventListener('keydown' , event=>{
        let searchQuery = searchBar.value.toLowerCase();
        if (event.key === 'Enter' && searchQuery != ''){
            searchBar.value = '';
            let initialSearchResults = data.filter(character => character.name.toLowerCase().includes(searchQuery));
            // console.log(initialSearchResults);
            displayInitialResults(initialSearchResults);
        }
    })
}

searchBar.addEventListener('click' , event=>{
        while(charactersReturnedList.firstChild){
            charactersReturnedList.removeChild(charactersReturnedList.lastChild);
        }
})

let displayInitialResults = (initialSearchResults) =>{
    initialSearchResults.forEach(character => {
        let listOfCharacters = document.createElement('div');
        listOfCharacters.classList.add('input');
        listOfCharacters.textContent = character.name;
        charactersReturnedList.append(listOfCharacters);
        displaySelectedCharacter(listOfCharacters , character)
        listOfCharacters.addEventListener('mouseover' , onHoverFunction);
        listOfCharacters.addEventListener('mouseout' , offHoverFunction);
    })
}


let displaySelectedCharacter = (listOfCharacters , initialSearchResults) =>{
    listOfCharacters.addEventListener('click' , event=>{
        nameInput.textContent = initialSearchResults.name;

        inputChecker(initialSearchResults , 'house' , houseInput)

        inputChecker(initialSearchResults , 'species' , speciesInput)

        inputChecker(initialSearchResults , 'dateOfBirth' , birthInput)

        inputChecker(initialSearchResults , 'ancestry' , ancestryInput)

        imageChecker(initialSearchResults , 'image' , profileImage)
    })
}

// addClassButton.addEventListener('click' , () =>{
//     if (nameInput.textContent != ''){
//         let selectedClassNewLi = document.createElement('div');
//         selectedClassNewLi.classList.add('input');
//         selectedClassNewLi.classList.add('selectedList');
//         selectedClassNewLi.textContent = nameInput.textContent;
//         // console.log(nameInput.textContent);
//         // console.log(selectedClassNewLi.textContent)


//         classSelectedList.append(selectedClassNewLi);
    
//         nameInput.textContent = '';
//         houseInput.textContent = '';
//         profileImage.src = 'https://cdn-icons-png.flaticon.com/512/1600/1600953.png';
//         speciesInput.textContent = ''; 
//         birthInput.textContent = '';
//         ancestryInput.textContent = '';

//         let deleteButton = document.createElement('button');
//         deleteButton.innerHTML = 'Remove';
//         deleteButton.classList.add('deleteButton');
//         selectedClassNewLi.append(deleteButton);
//         deleteButton.addEventListener('click' , deleteCharacter);
//     }
// })




// let loadInitialDBData = () => {fetch('http://localhost:3000/members').then(resp => resp.json()).then(data => displayDBData(data))}
// loadInitialDBData();

document.addEventListener('DOMContentLoaded' , () =>{
    fetch('http://localhost:3000/members').then(resp => resp.json()).then(data => loadInitialData(data))
})

let loadInitialData = (data) =>{
    for(const element of data){
        let selectedClassNewLi = document.createElement('div');
        selectedClassNewLi.classList.add('input');
        selectedClassNewLi.classList.add('selectedList');
        selectedClassNewLi.textContent = element.name;
        classSelectedList.append(selectedClassNewLi);

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Remove';
        deleteButton.classList.add('deleteButton');
        selectedClassNewLi.append(deleteButton);
        deleteButton.addEventListener('click' , deleteCharacter);
    }
}

addClassButton.addEventListener('click' , event =>{
    let nameInputTextContent = nameInput.textContent;
    submitNewMember(nameInputTextContent);
})


function submitNewMember(nameInputTextContent) {
    return fetch('http://localhost:3000/members', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify( {
            'name': nameInputTextContent
        })
    })
    .then( function (response) {
        return response.json()
    })
    .then( function (data) {
        displayDBData(data)
    })
    .catch( function (error) {
        console.log(error)
    })
}


let displayDBData = (data) =>{
    let selectedClassNewLi = document.createElement('div');
    selectedClassNewLi.classList.add('input');
    selectedClassNewLi.classList.add('selectedList');
    selectedClassNewLi.textContent = data.name;
    classSelectedList.append(selectedClassNewLi);

        nameInput.textContent = '';
        houseInput.textContent = '';
        profileImage.src = 'https://cdn-icons-png.flaticon.com/512/1600/1600953.png';
        speciesInput.textContent = ''; 
        birthInput.textContent = '';
        ancestryInput.textContent = '';

        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Remove';
        deleteButton.classList.add('deleteButton');
        selectedClassNewLi.append(deleteButton);
        deleteButton.addEventListener('click' , deleteCharacter);
}





let deleteCharacter = (event) =>{
    event.target.parentElement.remove();
}

let inputChecker = (initialSearchResults , key , displayedInput) =>{
    if (initialSearchResults[key] !== ''){
        displayedInput.textContent = initialSearchResults[key]
    } if (initialSearchResults[key] === ''){
        displayedInput.textContent = 'N/A'
    }
}

let imageChecker = (initialSearchResults , key , displayedInput) =>{
    if (initialSearchResults[key] !== ''){
        displayedInput.src = initialSearchResults[key]
    } if (initialSearchResults[key] === ''){
        displayedInput.src = 'https://cdn-icons-png.flaticon.com/512/1600/1600953.png'
    }
}

let clearSearchList = () =>{
    clearListButton.addEventListener('click', () => {
        if (searchBar.value !== ''){
            document.getElementById('search-result-list').textContent='';
        }
    })
}

let onHoverFunction = event =>{
    event.target.style.color = "orange";
}

let offHoverFunction = event => {
    event.target.style.color = "black";
}

function toggleVisibility() {
    let learnMoreSection = document.getElementById('learn-more-sub-section');
    learnMoreSection.classList.toggle("visible-learn-more");
}

function darkMode() {
    let mode = document.body
    mode.classList.toggle('dark-mode')
}

