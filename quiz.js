const nextBtn = document.querySelector(".next"),
backBtn = document.querySelector(".back"),
rules = document.querySelector(".rules"),
category = document.querySelector(".category"),
playBtn = document.querySelector(".playBtn"),
allQuestions = document.querySelector(".allquizes"),
categoryOptions= document.querySelector(".form-control"),
difficultyOptions= document.querySelector(".diffOption"),
nextQuestionBtn = document.querySelector(".nextQuestion"),
typeOptions= document.querySelector(".typeOption");



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
    })    
}
function nextQuestionButton(){
    const questionInnerContainer = document.querySelectorAll(".questionInnerContainer"),
    questionCounter = document.querySelector(".currentQuizNumber");
    counter = 2;
    console.log(questionInnerContainer)
    nextQuestionBtn.addEventListener('click', () => {
        console.log("clicked");
        for(let index = 0; index < questionInnerContainer.length; index++){
            
            if(questionInnerContainer[index].classList.contains('questionActive')){
                questionInnerContainer[index].classList.remove('questionActive');
                if(index < questionInnerContainer.length-1){
                    questionInnerContainer[index +1].classList.add('questionActive');
                    questionCounter.textContent = counter++;
                    if(counter == 10){
                        nextBtn.innerHTML = "Submit Answers";
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
            console.log(data)
            const questionContainer = document.querySelector(".questionsContainer");
            let template = "";
            data.results.forEach( ({question, incorrect_answers, correct_answer}, index) => {  
            //     let div = document.createElement('div');
            //     div.innerHTML =                 
            //     `                
            //     <p class="question">${question}</p>
            //     <p value="Very Good" class="choice">${correct_answer}</p>
            //     <p value="Good"class="choice">${incorrect_answers[0]}</p>
            //     <p value="Bad"class="choice">${incorrect_answers[1]}</p>
            //     <p value="Very Bad"class="choice">${incorrect_answers[2]}</p>          
            
            // `
            // div.classList.add('questionInnerContainer');
            // if(index == 0){
            //     div.classList.add("questionActive");
            // }
            // questionContainer.append(div);
            template += `
            <div class="questionInnerContainer ${addActiveClass()}">
                <p class="question">${question}</p>
                <p value="Very Good" class="choice">${correct_answer}</p>
                <p value="Good"class="choice">${incorrect_answers[0]}</p>
                <p value="Bad"class="choice">${incorrect_answers[1]}</p>
                <p value="Very Bad"class="choice">${incorrect_answers[2]}</p>       
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

        })
        nextQuestionButton();
           
}
 function checkInputFields(){
    // categoryOptions, difficultyOptions, typeOptions
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