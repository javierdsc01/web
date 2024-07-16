const apiButton = document.getElementById('apiButton');
const apiData = document.getElementById('apiData');

const callAPI = () => {
    for (let i = 1; i < 11; i++) {
        fetch('https://pokeapi.co/api/v2/pokemon/' + i)
        .then(res => res.json())
        .then(data => {
            const apiName = document.createElement("p");
            apiName.innerText = JSON.stringify(data.name) + '\n';
            document.body.appendChild(apiName);

            const apiImg = document.createElement("img");
            apiImg.src = data.sprites.front_default;
            document.body.appendChild(apiImg);

            const apiExp = document.createElement("p");
            apiExp.innerText = JSON.stringify(data.base_experience) + '\n';
            document.body.appendChild(apiExp);

            console.log(data);
        })
        .catch(e => console.error(new Error(e)));
    }
};

apiButton.addEventListener('click', callAPI);

