const quesNumb = document.querySelector(".que_num");
const quesText = document.querySelector(".que_txt");
const optionsContainer = document.querySelector(".options");
const ansIndicatorContain = document.querySelector(".ans-indicators");

let queCntr = 0;
let currentQues;
let availableQues = [];
let availableOption = [];

function setavailableQues(){
    const totalQues = quiz.length;
    for(let i = 0; i<totalQues; i++)
    {
        availableQues.push(quiz[i]);
    }
}

function getNewQues() {
    quesNumb.innerHTML = "Question " + (queCntr + 1)+ " of " + quiz.length;
    const quesIndex = availableQues[Math.floor(Math.random() * availableQues.length)];
    currentQues = quesIndex;
    quesText.innerHTML = currentQues.q;
    const ind1 = availableQues.indexOf(quesIndex);
    availableQues.splice(ind1, 1); 

    const optionLength = currentQues.options.length;
    for(let i=0;i<optionLength; i++){
        availableOption.push(i);
    }
    optionsContainer.innerHTML='';
    let animationDelay = 0.1;
    for(let i=0; i<optionLength; i++){
        const optionIndex = availableOption[Math.floor(Math.random() * availableOption.length)];
        const ind2 = availableOption.indexOf(optionIndex);
        availableOption.splice(ind2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQues.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.1;
        option.className = "option"
        optionsContainer.appendChild(option);
        option.setAttribute("onclick", "getResult(this)");
    }
    queCntr++;
}
function getResult(element){
    const id = parseInt(element.id);
    if(id === currentQues.answer){
        element.classList.add("correct");
        updateAnsIndicator("correct");
    }
    else{
        element.classList.add("wrong");
        updateAnsIndicator("wrong");
        const optionLength = optionsContainer.children.length;
        for(let i=0; i<optionLength; i++){
            if(parseInt(optionsContainer.children[i].id) === currentQues.answer){
                optionsContainer.children[i].classList.add("correct");   
            }
        }
    }
    restrictClick();
}
function updateAnsIndicator(m) {
    ansIndicatorContain.children[queCntr-1].classList.add(m);
}
function restrictClick(){
    const optionLength = optionsContainer.children.length;
    for(let i=0; i<optionLength; i++){
        optionsContainer.children[i].classList.add("already-answered");
    }
}
function ansIndicators(){
    const totalQues = quiz.length;
    for(i=0; i<totalQues; i++){
        const indicator = document.createElement("div");
        ansIndicatorContain.appendChild(indicator);
    }
}
function next(){
    if(queCntr === quiz.length){
        console.log("Quiz Over");
    }
    else{
        getNewQues();
    }
}

window.onload = function(){
    setavailableQues();
    getNewQues();
    ansIndicators();
}