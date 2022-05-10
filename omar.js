let dataFetch = () => {
    fetch('http://hp-api.herokuapp.com/api/characters').then(resp => resp.json()).then(data => someFunction(data))
}

dataFetch();

let searchBar = document.getElementById('search-bar');
let charactersReturnedList = document.getElementById('search-result-list');
let nameInput = document.getElementById('name-input')
let houseInput = document.getElementById('house-input')
let profileImage = document.getElementById('character-image')


let someFunction = (data) => {
    searchBar.addEventListener("keydown", (e) => {
        if (e.key == "Enter" && searchBar.value != "") {
            let searchQuery = searchBar.value;
            // console.log(searchQuery)
            let searchResult = data.filter(character =>{
                    // console.log(character.name.toLowerCase().includes(searchQuery));
                    if (character.name.toLowerCase().includes(searchQuery.toLowerCase())){
                        // console.log(character);
                            let listOfCharacters = document.createElement('li');
                            listOfCharacters;
                            listOfCharacters.textContent = character.name;

                            // Mark - NEWLY ADDED at 10:30 AM - Clear List Button
                            let button = document.getElementById('clearList')
                            button.addEventListener('click', (e) => {
                                    document.getElementById('search-result-list').innerHTML='';
                                })
                            
                                

                            listOfCharacters.addEventListener('mouseover' , onHoverFunction);
                            listOfCharacters.addEventListener('mouseout' , offHoverFunction);

                            listOfCharacters.addEventListener('click' , function(event){
                                data.find(character =>{
                                    // console.log(character.name === event.target.textContent)
                                    if (character.name === event.target.textContent){
                                        // console.log(character);
                                        nameInput.textContent = character.name;
                                        houseInput.textContent = character.house;
                                        if (character.image !== ""){
                                            profileImage.src = character.image;
                                        } if (character.image === ""){
                                            profileImage.src = 'https://cdn-icons-png.flaticon.com/512/1600/1600953.png'; 
                                        }
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