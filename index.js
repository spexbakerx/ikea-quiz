

// counters for current question and correct total
let currentQuestion= 0;
let correctTotal= 0;

// Fades in start page on page load
document.getElementById('fader').style.opacity = 1;

// Array of Objects that are the questions and answers
  const myQuestions = [

    // Question #1
    {
      question: "How old was Ingvar Kamprad (R.I.P.) when he founded IKEA in 1943?",
      answers: [
        "24",
        "17",
        "89",
        "13"
      ],
      correctAnswer: "17",
      explanation: "He was also an admitted member of the Nazi party back in the day, so maybe not R.I.P.?"
    },

    // Question #2
    {
      question: "What does IKEA stand for?",
      answers: [
        "International Klein Everything Always",
        "I Kan't Even Afford (this)",
        "Ingvar Kamprad Elmtaryd Agunnaryd",
        "Who cares it looks cool "
      ],
      correctAnswer: "Ingvar Kamprad Elmtaryd Agunnaryd",
      explanation: "The first two letters are the founder's initials, Elmtaryd and Agunnaryd are the farm and village he grew up in, respectively."
    },    

    // Question #3
    {
      question: "IKEA uses approximately how much of the world's entire commercial supply of wood?",
      answers: [
        "1%",
        "13%",
        "50%",
        "100%"

      ],
      correctAnswer: "1%",
      explanation: "That's a lot of dang wood."
    },

    // Question #4
    {
      question: "Ikea was the first company to feature BLANK in one of its ads",
      answers: [
        "A talking dog (eat shit, Air Bud)",
        "A gay couple (eat shit, breeders)",
        "Another company's logo (Target's)",
        "JNCO Jeans"
      ],
      correctAnswer: "A gay couple (eat shit, straight people)",
      explanation: ":') thx IKEA"
    },

    // Question #5
    {
      question: "Ikea changed its typeface from Futura to Verdana in what year?",
      answers: [
      "2000",
      "2017",
      "1995",
      "2009",
      ],
      correctAnswer: "2009",
      explanation: "Understandably, this caused a bit of uproar on the interwebs"
    }  

  ];


function templateQuestion() {

console.log('generateQuestion ran');
  //HTML displayed for each question and answer
  
  return   `<div class= "js-question-answer-form">
            <h1>${myQuestions[currentQuestion].question}</h1>
            <form>
            <fieldset>
              <ul>

               <li>
                <input type="radio" id="a-option" name="answer-option" value="${myQuestions[currentQuestion].answers[0]}" required="required">
                <label for="a-option">${myQuestions[currentQuestion].answers[0]}</label>
                <div class="check"></div>
              </li>
       
               <li>
                <input type="radio" id="b-option" name="answer-option" value="${myQuestions[currentQuestion].answers[1]}" required="required">
                <label for="b-option">${myQuestions[currentQuestion].answers[1]}</label>
                <div class="check"><div class="inside"></div></div>
              </li>

               <li>
                <input type="radio" id="c-option" name="answer-option" value="${myQuestions[currentQuestion].answers[2]}" required="required">
                <label for="c-option">${myQuestions[currentQuestion].answers[2]}</label>
              <div class="check"><div class="inside"></div></div>
              </li>

               <li>
                <input type="radio" id="d-option" name="answer-option" value="${myQuestions[currentQuestion].answers[3]}" required="required">
                <label for="d-option">${myQuestions[currentQuestion].answers[3]}</label>
              <div class="check"><div class="inside"></div></div>
              </li>

              </ul>

              <input type="submit" value="Check Answer" class="button">
        
            </fieldset>
          </form>
          <div class="current-question" >Question: <span class= "question-number">${currentQuestion + 1} </span> of 5
          </div>
          <div class="current-score">Score: <span class= "correct-answer">
          ${correctTotal}</span></div>`;  
          
}


//Function to build correct answer 
function templateCorrectAnswerMessage(){
  return `<section class="feedback-page popup">
            <h1> Nice job! That's correct. </h1>
            <p> ${myQuestions[currentQuestion].explanation} </p>
            <button class= "next-button" value="next-button"> Next Question</button>
          </section>
           <div class="current-question" >Question: <span class= "question-number">${currentQuestion + 1} </span> of 5</div>
                    <div class="current-score">Score: <span class= "correct-answer">
          ${correctTotal}</span>
          </div>`;
  }


//Function to build wrong answer
function templateWrongAnswerMessage(){
  let displayAnswer= `${myQuestions[currentQuestion].correctAnswer}`;
  return `<section class="feedback-page popup">
            <h1> Nope - the correct answer is ${displayAnswer}. </h1>
            <p> ${myQuestions[currentQuestion].explanation} </p>
            <button class= "next-button" value="next-button"> Next Question</button>
          </section>
           <div class="current-question" >Question: <span class= "question-number">${currentQuestion + 1} </span> of 5</div>
                     <div class="current-score">Score: <span class= "correct-answer">
          ${correctTotal}</span>
          </div>`;
  }


//Function to display the generated question
function displayQuestion(){
  console.log('displayQuestion ran');
  $(".js-quiz-page").html(templateQuestion());
}



//Function to handle answers,update counter and score
function handleAnswer(){
  $('form').on('submit',function(event){
    event.preventDefault();
    console.log('handleAnswer ran');
    var userAnswer= $('input:checked').val();
    console.log(userAnswer);
    console.log(myQuestions[currentQuestion].correctAnswer);
    
    checkAnswer(userAnswer);
    updateQuestion();
    
  });
  
}
  

//Function to check for correct/incorrect answer
function checkAnswer(answer){

    let rightAnswer = `${myQuestions[currentQuestion].correctAnswer}`;

    if (answer === rightAnswer) {
      console.log("Great Job. That's correct.");
      $(".js-question-answer-form").addClass("hidden");
      $(".js-quiz-page").html(templateCorrectAnswerMessage());
      updateScore();
    }
    else{
      console.log("I'm sorry. That's not correct.");
      $(".js-question-answer-form").addClass("hidden");
      $(".js-quiz-page").html(templateWrongAnswerMessage());
    } 
}




//Function to update score and question #
function updateScore(){
  correctTotal ++;
  console.log('updateScore ran');
}



//Function to move to next question
function nextQuestion(){
  $('main').on ('click','.next-button',function(event){
   event.preventDefault();
   console.log('nextQuestion ran');
   
  if (currentQuestion < 5){
    displayQuestion();
    handleAnswer();
  }
  else {
    displayResults();
  }

  $(".js-quiz-page").fadeIn(1000);

  //progress bar + animation
  if (currentQuestion > 0) {
    if (currentQuestion == 1)
    $("#bar").animate({width:'16.6%'});
    if (currentQuestion == 2)
    $("#bar").animate({width:'50%'});
    if (currentQuestion == 3)
    $("#bar").animate({width:'75%'});
    if (currentQuestion == 4)
    $("#bar").animate({width:'90%'});
    if (currentQuestion == 5)
    $("#bar").animate({width:'100%'});
    if (currentQuestion > 5)
    $("#bar").animate({width:'100%'});
  }
  
  })
}


//Function to get next question
function updateQuestion(){
  currentQuestion++;
  console.log(currentQuestion);
}


  

//Function to display results
function displayResults(){
   //Hide Quiz & show results;
  $(".js-quiz-page").addClass("hidden");
  $('.feedback-page').addClass("hidden");
  $(".js-quiz-result").removeClass("hidden");
  console.log("displayResults ran");

  //Display Results
  $(".js-quiz-result").html(showFinalScore());
  //Restart Quiz
  restartQuiz();

}

  
//Function to show final results
function showFinalScore(){
  console.log("showFinalScore ran")
  

  return `<section class="js-quiz-result">
            <h1> Nicely Done!</h1>
            <p> You correctly answered ${correctTotal} out of 5 questions.</p>
            <button class= "restart-button" value="restart-btn"> Play Again</button>
          </section>`;
          
}

//Function to Restart Quiz
function restartQuiz(){
  $('main').on ('click','.restart-button', function(event){
    console.log("restart button has been clicked");
    location.reload();
    // $("main").fadeIn(1000);
    
  })
}


//Function to Handle Start quiz button
function startQuiz(){
  $(".start-button").on('click',function (event){
    console.log('startQuiz ran');
    $(".js-quiz-page").removeClass("hidden");
    $(".js-start-page").addClass("hidden");
  });
} 



//Function to Start Quiz
function takeQuiz(){
  console.log('takeQuiz ran');
  startQuiz();
  displayQuestion();
  handleAnswer();
  nextQuestion();
 
  
}
//when the page loads, call 'takeQuiz'
$(takeQuiz());

$( document ).ready()

