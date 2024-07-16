function hello(){
    alert("wena tarde");
}

document.querySelector("html").onclick = function(){
    alert("no me toque");
}

function cosa(){
    let ejemplo = [10, 3, 5, 7]
    let total = 0
    for(let i = 0; i < ejemplo.length; i++){
        total = total + ejemplo[i]
    }
}