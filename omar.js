let dataFetch = () => {
    fetch('http://hp-api.herokuapp.com/api/characters').then(resp => resp.json()).then(data => someFunction(data))
}

dataFetch();

let searchBar = document.getElementById('search-bar');
let charactersReturnedList = document.getElementById('character-collection');


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

                            listOfCharacters.addEventListener('mouseover' , onHoverFunction);
                            listOfCharacters.addEventListener('mouseout' , offHoverFunction);

                            listOfCharacters.addEventListener('click' , function(event){
                                data.find(character =>{
                                    // console.log(character.name === event.target.textContent)
                                    if (character.name === event.target.textContent){
                                        console.log(character);
                                        
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

// let onClickFunction = (event , data) =>{
//     let characterDesired = event.target.textContent
//     console.log(characterDesired);
//     data.find(element =>{ 
//         console.log(element.name === characterDesired)
//     })
// }