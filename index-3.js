

let currentQuestion= 0;
let correctTotal= 0;

// Array of Objects that are the questions and answers
  const myQuestions = [

    // Question #1
    {
      question: "How old was Ingvar Kamprad (R.I.P.) when he founded IKEA in 1943?",
      answers: [
        "24",
        "17",
        "89"
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
        "A gay couple (eat shit, straight people)",
        "Another company's logo (way to go, Target)",
        "JNCO Jeans"
      ],
      correctAnswer: "A gay couple (eat shit, straight people)",
      explanation: ":') thx IKEA"
    },

    // Question #5
    {
      question: "Ikea changed it's typeface from Futura to Verdana in what year?",
      answers: [
      "2000",
      "2017",
      "1995",
      "2009",
      ],
      correctAnswer: "d",
      explanation: "Understandably, this caused a bit of uproar on the interwebs"
    }  

  ];

//Function to build question
function templateQuestion() {

  // let thisQuestion = $(myQuestions[currentQuestion].question);
  // let thisAnswers = $(myQuestions[currentQuestion].answers);


  // //function to create radio buttons for each question         
  // function createRadios() {
  //     for(let i of thisAnswers) {
  //       return `<input type='radio' id='myRadio"+i+"' value='i'>
  //               <label class="radio-button">
  //               <span>i</span>
  //               </label>`;
  //     }
  // }

  // createRadios(); 

  //function to create radio buttons for each question         

console.log('generateQuestion ran');
  //HTML displayed for each question and answer
  
  return   `<div class= "js-question-answer-form">
            <h1>${myQuestions[currentQuestion].question}</h1>
            <form>
            <fieldset>
      
              <label class="radio-button">
                <input type="radio" name="answer-option" value="${myQuestions[currentQuestion].answers[0]}" required>
                <span>${myQuestions[currentQuestion].answers[0]}</span>
              </label>
       
              <label class="radio-button">
                <input type="radio" name="answer-option" value="${myQuestions[currentQuestion].answers[1]}" required>
                <span>${myQuestions[currentQuestion].answers[1]}</span>
              </label>
       
              <label class="radio-button">
                <input type="radio" name="answer-option" value="${myQuestions[currentQuestion].answers[2]}" required>
                <span>${myQuestions[currentQuestion].answers[2]}</span>
              </label>
          
              <label class="radio-button">
                <input type="radio" name="answer-option" value="${myQuestions[currentQuestion].answers[3]}" required>
                <span>${myQuestions[currentQuestion].answers[3]}</span>
              </label>
              
              <input type="submit" value="Submit Answer" class="button">
        
            </fieldset>
          </form>
          <footer>
          <div class="current-question" >Question: <span class= "question-number">${currentQuestion + 1} </span> of 5
          </div>
          <div class="current-score">Score: <span class= "correct-answer">
          ${correctTotal}</span 
          </div>
          </footer>
          </div>`;  
          
}




//Function to display correct answer 
function templateCorrectAnswerMessage(){
  return `<section class="feedback-page popup">
            <h1> Nice job! That's correct. </h1>
            <p> ${myQuestions[currentQuestion].explanation} </p>
          </section>`;
              
  }


//Function to display Wrong answer
function templateWrongAnswerMessage(){
  let displayAnswer= `${myQuestions[currentQuestion].correctAnswer}`;
  return `<section class="feedback-page popup">
            <h1> Nope - the correct answer is ${displayAnswer}. </h1>
            <p> ${myQuestions[currentQuestion].explanation} </p>
          </section>`;
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
      $(".js-quiz-page").html(displayCorrectAnswerMessage());
      updateScore();
    }
    else{
      console.log("I'm sorry. That's not correct.");
      $(".js-question-answer-form").addClass("hidden");
      $(".js-quiz-page").html(displayWrongAnswerMessage());
    } 
}

//Function to display correct answer 
function displayCorrectAnswerMessage(){
  return `<section class="feedback-page popup">
            <h1> Nice job! That's correct. </h1>
            <p> ${myQuestions[currentQuestion].explanation} </p>
            <button class= "next-button" value="next-button"> Next Question</button>
          </section>`;
              
  }


//Function to display Wrong answer
function displayWrongAnswerMessage(){
  let displayAnswer= `${myQuestions[currentQuestion].correctAnswer}`;
  return `<section class="feedback-page popup">
            <h1> Nope - the correct answer is ${displayAnswer}. </h1>
            <p> ${myQuestions[currentQuestion].explanation} </p>
            <button class= "next-button" value="next-button"> Next Question</button>
          </section>`;
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

  if (currentQuestion > 0) {
    $("#bar").width('25%');
    if (currentQuestion > 1)
    $("#bar").width('50%');
    if (currentQuestion > 2)
    $("#bar").width('75%');
    if (currentQuestion > 3)
    $("#bar").width('90%');
    if (currentQuestion > 4)
    $("#bar").width('100%');
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
  // restartQuiz();

}

  







//Function to Start Quiz
function takeQuiz(){
  console.log('takeQuiz ran');
  $(".js-quiz-page").removeClass("hidden");
  $(".js-start-page").addClass("hidden");
  displayQuestion();
  handleAnswer();
  nextQuestion();
 
  
}
//when the page loads, call 'takeQuiz'
$(takeQuiz());

