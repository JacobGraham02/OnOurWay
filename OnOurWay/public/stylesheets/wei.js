const body = document.querySelector("body");
let hiddenKey = "";
let a = false;
let password = "ihatethisclass";
let image = new Image("/images/fractal4.jpg");
document.onkeydown = function(e) {
    if(a){
        body.classList.remove('easteregg');
    }
    hiddenKey += e.key.toLowerCase();
    if(password.startsWith(hiddenKey)){
        if(password == hiddenKey){
            body.classList.add('easteregg');
            a = true;
        }
    }
    else{
        hiddenKey = "";
    }
}