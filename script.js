let dataFetch = () => {
    fetch('http://hp-api.herokuapp.com/api/characters').then(resp => resp.json()).then(data => console.log(data))
}

dataFetch();