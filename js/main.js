// Start button clicks 
const elStartBtn = document.querySelector(".btn__start-js"); // Start btn 
const elWrapperForm = document.querySelector(".wrapper__form"); // Wrapper form modal div

// Get form elements
const elForm = document.querySelector(".form-js"); //Form 
const elSelectLevel = document.querySelector(".form__level-js"); //Select level
const elSelectTime = document.querySelector(".form__time-js"); //Time
const elInput = document.querySelector(".user_name"); //Input 
const userValue = document.querySelector(".user__name-value"); //User value for input textContent
const correct = document.querySelector(".gif__corect"); //gif 

// Get List warappers for modal
const elWarpperModal = document.querySelector(".object__wrapper"); // object push
const qusetionRoads = document.querySelector(".questin__road"); //Title qusetions
const roadList = document.querySelector(".road__list"); //ul list

// Get template
const elTemplate = document.querySelector(".road__template").content; //Template

// Get modal all wrapper
const elWrappersAllModal = document.querySelector(".wrappers__images-items");//img time big warapper modal div
const startTitle = document.querySelector(".start__title");
const gameOver = document.querySelector(".game__over");
const gameOverPoint = document.querySelector(".game-over-point");
const gameOverAttemps = document.querySelector(".game-over-attempms");

// Get interval point attemps
const attempsCounter = document.querySelector(".attemps__js");
const pointCounter = document.querySelector(".point__js");
const timeCounter = document.querySelector(".time__js-count");


// Listen button start 
elStartBtn.addEventListener("click" , ()=>{
    elWrapperForm.classList.add("tranform");
    elStartBtn.classList.add("d-none")
})


// Listen form
elForm.addEventListener("submit" , evt => {
    evt.preventDefault();
    const inputValue = elInput.value;
    const levelSelectValue = elSelectLevel.value;
    elWrapperForm.remove("tranform");
    startTitle.classList.add("d-none")
    elWrappersAllModal.classList.add("d-block")
    userValue.textContent = inputValue;
    levelRender(levelSelectValue)
    renderRoad(titleArray, roadList)
    randomFunc(titleArray)
    time()
});


// function titleFunc(item) {
//     item.forEach((element) => {
//         titleArray.push(element.symbol_title);
//     });
// }

// Render road list img ang questions
function renderRoad(road, node){

    const elFragment = document.createDocumentFragment()
    road.forEach(item => {
        const elCloneTemplate = elTemplate.cloneNode(true);
        
        elCloneTemplate.querySelector(".road__img").src = item.symbol_img;
        // elCloneTemplate.querySelector(".gif__corect");
        elCloneTemplate.querySelector(".road__img").alt = item.symbol_title;
        elCloneTemplate.querySelector(".road__img").dataset.img = item.symbol_title;
        
        elFragment.appendChild(elCloneTemplate);
    });
    node.appendChild(elFragment)
}


// Render time
function time(){
    const timeSelect = Number(elSelectTime.value);
    let countTime = timeSelect * 60;
    
    const intervalTime = setInterval(() =>{
        let minut = Math.floor(countTime / 60);
        let secund = Math.floor(countTime % 60);
        if(minut < 10){
            minut = `0${minut}`
        }
        if (secund < 10) {
            secund = `0${secund}`;
        }
        timeCounter.textContent = `${minut}:${secund}`
        countTime--
        if(minut == 00 && secund == 0 || scoreCounter == (-5)){
            clearInterval(intervalTime);
            elWrappersAllModal.classList.add("d-none");
            gameOver.classList.add("d-block");
            gameOverPoint.textContent = `Toplangan bal: ${scoreCounter}`;
            gameOverAttemps.textContent = `Urinishlar soni :${counterAtteps}`;
        }
    },1000)
}



// Create array
const titleArray = []; //Big array for push
let counterAtteps = 0;
let scoreCounter = 0;



// Create Random level 
let randomEasy = Math.floor(Math.random() * 70);
let randomMedium = Math.floor(Math.random() * 59);
let randomHard = Math.floor(Math.random() * 38);


// Render level
function levelRender(value){
    if(value == "easy"){
        const easyRoad = roadSymbol.splice(randomEasy, 21);
        easyRoad.forEach(item => {
            // imgArray.push(item);
            titleArray.push(item);
            console.log(titleArray); 
        })
    };
    if (value == "medium") {
        const mediumRoad = roadSymbol.splice(randomMedium, 42);
        mediumRoad.forEach((item) => {
            // imgArray.push(item);
            titleArray.push(item);
        });
    };
    if (value == "hard") {
        const hardRoad = roadSymbol.splice(randomHard, 63);
        hardRoad.forEach((item) => {
            // imgArray.push(item);
            titleArray.push(item)
        });
    }
}


// Random array
function randomFunc(item) {
    let randomTitle = Math.floor(Math.random() * item.length);
    // console.log(random);
    qusetionRoads.textContent = item[randomTitle].symbol_title;
    // console.log(item[random].symbol_title);
}
// console.log(titleArray);


// Event delegation
roadList.addEventListener("click" , evt => {
    if(evt.target.matches(".road__img")) {
        
        let signsId = evt.target.dataset.img;
        let signFind = titleArray.find(item => item.symbol_title == signsId);
        console.log(signFind.symbol_title);
        
        if(signFind.symbol_title == qusetionRoads.textContent){
            const signFindIndex = titleArray.findIndex(item => item.symbol_title == signsId)
            titleArray.splice(signFindIndex , 1);
            // console.log(signFindIndex);
            randomFunc(titleArray);   
            let audiCorect = new Audio ("./audios/audios.mp3");
            evt.target.parentElement.classList.add("item-js");
            audiCorect.play()
            setTimeout(() => {
                audiCorect.pause();
                evt.target.parentElement.classList.remove("item-js");
                evt.target.parentElement.classList.add("opacity");
            }, 1000);
            evt.target.parentElement.classList.add("item-js");
            //    evt.target.classList.add("coorect-gif", "correct__qusetion");
            scoreCounter += 2;
            pointCounter.textContent = scoreCounter;
            
            
        }else{
            //  const invalid = evt.target;
            setTimeout(() => {
                evt.target.parentElement.classList.remove("bg-ivalid");
            }, 500);
            let error = new Audio ("../audios/erors.mp3");
            error.play();
            evt.target.parentElement.classList.add("bg-ivalid");
            ++counterAtteps;
            --scoreCounter
            pointCounter.textContent = scoreCounter
            attempsCounter.textContent = counterAtteps;
        }
        // if(titleArray.length == 0){
        //     gameOver.classList.add("d-block")
        // }
        
    }
})

// console.log(randomFunc(titleArray));