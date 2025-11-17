const questions =
[
    {
        Q:"Whats the national bird of India?",
        ans :[
            { text:"crow",correct:false},
            { text:"dove",correct:false},
            { text:"peacock",correct:true},
            { text:"eagle",correct:false}
        ]
    },
    {
        Q:"Which planet is known as the 'Red Planet'?",
        ans :[
            { text:"earth",correct:false},
            { text:"mars",correct:true},
            { text:"mercury",correct:false},
            { text:"uranus",correct:false}
        ]
    },
    {
        Q:"How many letters are there in the English alphabet?",
        ans :[
            { text:"28",correct:false},
            { text:"24",correct:false},
            { text:"26",correct:true},
            { text:"22",correct:false}
        ]
    },
    {
        Q:"Baby frog is known as......",
        ans :[
            { text:"tad pole",correct:true},
            { text:"calf",correct:false},
            { text:"frogie",correct:false},
            { text:"flock",correct:false}
        ]
    },
    {
        Q:"The Crimson Rose belongs to which species?",
        ans :[
            { text:"moth",correct:false},
            { text:"rose",correct:false},
            { text:"ant",correct:false},
            { text:"butterfly",correct:true}
        ]
    },
    {
        Q:"Name the tissue that forms the inner lining of the mouth?",
        ans :[
            { text:"Nervous tissue",correct:false},
            { text:"Epithelial tissue",correct:true},
            { text:"Connective tissue",correct:false},
            { text:"fat tissue",correct:false}
        ]
    }

];

const questionElement = document.getElementById("question");
const answerbuttons = document.getElementById("options");
const nextButton = document.getElementById("next");
let ques_index = 0;
let score = 0;

function startQuiz(){
    ques_index=0;
    score=0;
    nextButton.innerHTML="NEXT";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentques = questions[ques_index];
    let question_number =ques_index+1;
    questionElement.innerHTML= question_number+". "+currentques.Q;
    currentques.ans.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if(answer.correct){
            console.log(button, button.dataset);
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}
function selectAnswer(e){

    const selectbutton = e.target;
    const isCorrect = selectbutton.dataset.correct=== "true";
    if(isCorrect){
        selectbutton.classList.add("correct");
        score++;
    }else{
        selectbutton.classList.add("incorrect");
    }
    Array.from(answerbuttons.children).forEach(button => {
        if(button.dataset.correct=== "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showscore(){
    resetState();
    questionElement.innerHTML= `You scored ${score} out of 6`;
    nextButton.innerHTML= "Play Again?";
    nextButton.style.display = "block";
}
function handleNextButton()
{
    ques_index++;
    if(ques_index<questions.length)
    {
        showQuestion();
    }else{
        showscore();
    }
}


nextButton.addEventListener("click",()=>
{
    if(ques_index<questions.length)
    {
        handleNextButton();
    }else{
        startQuiz();
    }

});
startQuiz();
