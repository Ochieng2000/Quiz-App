const nextBtn = document.querySelector(".next"),
backBtn = document.querySelector(".back"),
rules = document.querySelector(".rules"),
category = document.querySelector(".category"),
playBtn = document.querySelector(".playBtn"),
allQuestions = document.querySelector(".allquizes"),
categoryOptions= document.querySelector(".form-control"),
difficultyOptions= document.querySelector(".diffOption"),
nextQuestionBtn = document.querySelector(".nextQuestion"),
typeOptions= document.querySelector(".typeOption"),
quizSuccessContainer = document.querySelector(".quizOuterContainer"),
questionContainer = document.querySelector(".questionsContainer");
let timeCounter = 61;
let interval = "";
let playerAnswers = [];
let correctAnswers = [];

checkInputFields();
nextButton();

backButton();
playGameButton();


function nextButton(){
    nextBtn.addEventListener('click', () => {    
        rules.classList.remove("hide");
        category.classList.add("hideCategory");        
        fetchingQuestions(categoryOptions.value, difficultyOptions.value, typeOptions.value);
    });
    
}

function backButton(){
    backBtn.addEventListener('click', () => {
        rules.classList.add("hide");
        category.classList.remove("hideCategory");
    });    
}

function playGameButton(){
    playBtn.addEventListener('click', ()=>{
        rules.classList.add("hide");
        allQuestions.classList.remove("hideQuizesSection")
        interval = setInterval(setTimmer, 1000);
        // setTimmer()
    })    
}
function nextQuestionButton(){
    const questionInnerContainer = document.querySelectorAll(".questionInnerContainer"),
    questionCounter = document.querySelector(".currentQuizNumber");
    counter = 2;
    let clicks = 0;

    nextQuestionBtn.addEventListener('click', () => {
        clicks++;
        for(let index = 0; index < questionInnerContainer.length; index++){
            
            if(questionInnerContainer[index].classList.contains('questionActive')){
                questionInnerContainer[index].classList.remove('questionActive');
                if(index < questionInnerContainer.length-1){
                    questionInnerContainer[index +1].classList.add('questionActive');
                    questionCounter.textContent = counter++;
                    if(clicks == 9){                        
                        nextQuestionBtn.innerHTML = "Submit Answers";
                        nextQuestionBtn.addEventListener('click', () => {

                            clearInterval(interval);
                           
                            let result=window.confirm("Do You Want To Submit Your Answers???");
                            if(result == true){
                               quizSuccessContainer.innerHTML = `
                                <h1 class="head">Thanks for Participating in The Quiz Game</h1><br>
                               <p class="success">Your Answers Are Submitted Successfully and Graded below!</p>
                               <h1>You Scored ${ScoreResults()}%</h1>
                               <button class="exit">EXIT</button>
                               `
                               exitQuizGame();                                                      
                            }
                            else{
                                quizSuccessContainer.innerHTML = `
                                <h1 class="head">Thanks for Participating in The Quiz Game</h1><br>
                                <p class="success">Your Answers Were <span class="not">NOT</span> Submitted for Grading</p>
                                <button class="exit">EXIT</button>
                               `
                                exitQuizGame();
                            }
                            nextQuestionBtn.style.pointerEvents = "none";
                        })
                    }
                    else if(clicks > 9){
                        
                    }
                    
                }
                
                
                break;
            }
        }
    })
}

async function fetchingQuestions(category, difficulty, type){
    
    await fetch( `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=${type}`)
        .then(res => res.json())
        .then(data =>{
            //console.log(data)
            let template = "";
            data.results.forEach( ({question, incorrect_answers, correct_answer}, index) => {  
            //     let div = document.createElement('div');
            //     div.innerHTML =                 
            //     `                
            //     <p class="question">${question}</p>
            //     <<p value="${correct_answer}" class="choice">${correct_answer}</p>
            //     <p value="${incorrect_answers[0]}"class="choice">${incorrect_answers[0]}</p>
            //     <p value="${incorrect_answers[1]}"class="choice">${incorrect_answers[1]}</p>
            //     <p value="${incorrect_answers[2]}"class="choice">${incorrect_answers[2]}</p>          
            
            // `
            // div.classList.add('questionInnerContainer');
            // if(index == 0){
            //     div.classList.add("questionActive");
            // }
            // questionContainer.append(div);

            correctAnswers.push(correct_answer);            
            template += `
            <div class="questionInnerContainer ${addActiveClass()}">
                <p class="question">${question}</p>
                <p value="${correct_answer}" class="choice">${correct_answer}</p>
                <p value="${incorrect_answers[0]}" class="choice">${incorrect_answers[0]}</p>
                <p value="${incorrect_answers[1]}" class="choice">${incorrect_answers[1]}</p>
                <p value="${incorrect_answers[2]}" class="choice">${incorrect_answers[2]}</p>       
            </div>
            `
            function addActiveClass(){
                if(index == 0){
                    return 'questionActive';
                }
                else{
                    return '';
                }
            }
            
            })
            questionContainer.innerHTML = template;
            //console.log(correctAnswers);
        })
        clickedAswers();
        nextQuestionButton();
        

        
}
 function checkInputFields(){
    let number = 0;
    const options = document.querySelectorAll(".options");
    options.forEach(option => {
        option.addEventListener('change', () =>{
            options.forEach(element => {
                if(element.value){
                    number++;
                }
            })
            if(number == 3){
                nextBtn.classList.add("btnActive");
            }
            else{
                nextBtn.classList.remove("btnActive");
            }
            number = 0;
        })
    })

 }
 function exitQuizGame(){    
    exitQuiz = document.querySelector(".exit");
    exitQuiz.addEventListener('click', () =>{
        allQuestions.classList.add("hideQuizesSection");
        category.classList.remove("hideCategory");
        window.location.reload();
    })
 }
 
 function setTimmer(){
        timeCounter--; 
        const timeLeft = document.querySelector(".timeLeft");
        timeLeft.innerHTML = ` ${timeCounter} Seconds`;
        if(timeCounter === 0){
            clearInterval(interval);
            quizSuccessContainer.innerHTML = `
                            <h1 class="head">Thanks for Participating in The Quiz Game</h1><br>
                            <p class="success">Your Answers Are Submitted Successfully and Graded as below!!</p>
                            <h1>You Scored ${ScoreResults()}%</h1>
                            <button class="exit">EXIT</button>
                            `
                            exitQuizGame(); 
        }

    }        
function clickedAswers(){
    const choices = document.querySelectorAll(".choice");
    //console.log(choices);
    choices.forEach(async choice =>{
        choice.addEventListener('click', () =>{  
            playerAnswers.push(choice.textContent);      
            
        })
        
    })
}
function ScoreResults(){
    let points = -10;
    //Removing all the repeated answers/ dublicates  in the playerAnswers' array
    //This leaves each question with unique answer in case of double similar answers
    let uniquePlayerAnswers = [...new Set(playerAnswers)];
    console.log(playerAnswers);
    console.log("filtered Array");
    console.log(uniquePlayerAnswers);
    for(let c = 0; c <= correctAnswers.length; c++){
        for(p = 0; p <= uniquePlayerAnswers.length; p++){
            if(correctAnswers[c] === uniquePlayerAnswers[p]){
                points += 10;
            }  
            else{
                points += 0;
            }          
        }
    }
    return points;
}