

let currentQuestion= 0;
let correctTotal= 0;

// Array of Objects that are the questions and answers
(function() { 
  const myQuestions = [

    // Question #1
    {
      question: "How old was Ingvar Kamprad (R.I.P.) when he founded IKEA in 1943?",
      answers: [
        24,
        17,
        89
      ],
      correctAnswer: 17,
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

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${currentQuestion.answers[letter]}">
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }



//Function to handle answers,update counter and score
function handleAnswer(){
  $("#quiz").on('click', '#check', function (event){
    event.preventDefault();    
    let choice = $('input:checked');
    let userAnswer = choice.val();
    console.log(userAnswer);
    checkAnswer(userAnswer);

    updateQuestion();
    nextButton.style.display = "none";
    submitButton.style.display = "none";
    checkButton.style.display = "inline-block";
    
  });
  
}

//Function to check for correct/incorrect answer
function checkAnswer(answer){

    let rightAnswer = `${myQuestions[currentQuestion].correctAnswer}`;

    if (answer === rightAnswer) {
      console.log("Great Job. That's correct.");
      $("#quiz").addClass("hidden");
      $(".quiz-container").html(displayCorrectAnswerMessage());
      updateScore();
    }
    else{
      console.log("I'm sorry. That's not correct.");
      $("#quiz").addClass("hidden");
      $(".quiz-container").html(displayWrongAnswerMessage());
    } 

    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
    checkButton.style.display = "none";
}

//Function to display correct answer 
function displayCorrectAnswerMessage(){
  return `<section class="feedback-page popup">
            <h1> Nice job! That's correct. </h1>
            <p> ${myQuestions[currentQuestion].explanation} </p>
//         <button class= "nextButton" value="next"> Next Question</button>
          </section>`;
  }

//Function to display Wrong answer
function displayWrongAnswerMessage(){
  let displayAnswer= `${myQuestions[currentQuestion].correctAnswer}`;
  return `<section class="feedback-page popup">
            <h1> Nope - the correct answer is ${displayAnswer}. </h1>
            <p> ${myQuestions[currentQuestion].explanation} </p>
 
          </section>`;
  }

//Function to update score and question #
function updateScore(){
  correctTotal ++;
  console.log('updateScore ran');
}


//Function to move to next question
function nextQuestion(){
  $('.quiz-container').on ('click', '#next' ,function(event){
   event.preventDefault();
   console.log('nextQuestion ran');
   
  if (currentQuestion < 6){
    buildQuiz();
    handleAnswer();
  }
  else {
    endResults();
  }
  
  })
}


//Function to get next question
function updateQuestion(){
  currentQuestion++;
  console.log(currentQuestion);
}





  function endResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }  



  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "none";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }



  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const checkButton = document.getElementById("check");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", endResults);
  checkButton.addEventListener("click", handleAnswer);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
