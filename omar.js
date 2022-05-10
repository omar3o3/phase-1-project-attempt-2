let dataFetch = () => {
    fetch('http://hp-api.herokuapp.com/api/characters').then(resp => resp.json()).then(data => someFunction(data)).catch(error => console.log(error))
}

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
let classSelectedList = document.getElementById('class-selected-list')

let someFunction = (data) => {
    searchBar.addEventListener("keydown", (e) => {
        if (e.key == "Enter" && searchBar.value != "") {
            let searchQuery = searchBar.value;
            searchBar.value = '';
            let searchResult = data.filter(character =>{
                    if (character.name.toLowerCase().includes(searchQuery.toLowerCase())){
                            let listOfCharacters = document.createElement('li');
                            listOfCharacters;
                            listOfCharacters.textContent = character.name;

                            let button = document.getElementById('clearList');
                            button.addEventListener('click', (e) => {
                                document.getElementById('search-result-list').innerHTML='';
                            })

                            listOfCharacters.addEventListener('mouseover' , onHoverFunction);
                            listOfCharacters.addEventListener('mouseout' , offHoverFunction);

                            //function for when user selects character from list, to iterate through data to find that exact character and add it to profile div
                            listOfCharacters.addEventListener('click' , function(event){
                                data.find(character =>{
                                    if (character.name === event.target.textContent){
                                        nameInput.textContent = character.name;

                                        //makes it so that if the character doesnt have a house the value is set to the default N/A
                                        if (character.house !== ''){
                                            houseInput.textContent = character.house;
                                        }
                                        if (character.house === ''){
                                            houseInput.textContent = 'N/A'; 
                                        }

                                        if (character.image !== ""){
                                            profileImage.src = character.image;
                                        } if (character.image === ""){
                                            profileImage.src = 'https://cdn-icons-png.flaticon.com/512/1600/1600953.png'; 
                                        }

                                        if (character.species !== ''){
                                            speciesInput.textContent = character.species;
                                        } if (character.species === ''){
                                            speciesInput.textContent = 'N/A';
                                        }

                                        if (character.dateOfBirth !== ''){
                                            birthInput.textContent = character.dateOfBirth;
                                        } if (character.dateOfBirth === ''){
                                            birthInput.textContent = 'N/A';
                                        }

                                        if (character.ancestry !== ''){
                                            ancestryInput.textContent = character.ancestry;
                                        } if (character.ancestry === ''){
                                            ancestryInput.textContent = 'N/A';
                                        }

                                        //function to add the character in the profile to the class list div
                                        addClassButton.addEventListener('click' , ()=>{
                                            let listOfSelectedCharacters = document.createElement('li');
                                            listOfSelectedCharacters;
                                            // console.log(nameInput.textContent);
                                            listOfSelectedCharacters.textContent = nameInput.textContent;

                                            //next 4 lines of code are to get around having to set the nameInput.textContent to blank, and having the name in the
                                            //profile be blank so make everything blank? lol
                                            classSelectedList.append(listOfSelectedCharacters);
                                            nameInput.textContent = '';
                                            houseInput.textContent = '';
                                            profileImage.src = 'https://cdn-icons-png.flaticon.com/512/1600/1600953.png';
                                            speciesInput.textContent = ''; 
                                            birthInput.textContent = '';
                                            ancestryInput.textContent = '';


                                            if (listOfSelectedCharacters.textContent === ''){
                                                listOfSelectedCharacters.remove();
                                            }
                                        })
                                    }
                                })
                            })
                            charactersReturnedList.append(listOfCharacters);
                    } 
            })
        }
    })
}

let onHoverFunction = event =>{
    event.target.style.color = "orange";
}

let offHoverFunction = event => {
    event.target.style.color = "black";
}

function darkMode() {
    let mode = document.body
    mode.classList.toggle('dark-mode')
    
}

function myFunction() {
    let learnMoreSection = document.getElementById('learn-more-sub-section');
    learnMoreSection.classList.toggle("visible-learn-more");
  }