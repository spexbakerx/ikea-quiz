(function() {
  const myQuestions = [
    {
      question: "How old was Ingvar Kamprad (R.I.P.) when he founded IKEA in 1943?",
      answers: {
        a: "24",
        b: "17",
        c: "89"
      },
      correctAnswer: "b",
      explanation: "He was also an admitted member of the Nazi party back in the day, so maybe not R.I.P.?"
    },
    {
      question: "What does IKEA stand for?",
      answers: {
        a: "International Klein Everything Always",
        b: "I Kan't Even Afford (this)",
        c: "Ingvar Kamprad Elmtaryd Agunnaryd",
        d: "Who cares it looks cool "
      },
      correctAnswer: "c",
      explanation: "The first two letters are the founder's initials, Elmtaryd and Agunnaryd are the farm and village he grew up in, respectively."
    },    
    {
      question: "IKEA uses approximately how much of the world's entire commercial supply of wood?",
      answers: {
        a: "1%",
        b: "13%",
        c: "100%"
      },
      correctAnswer: "a",
      explanation: "That's a lot of dang wood."
    },
    {
      question: "Ikea was the first company to feature BLANK in one of its ads",
      answers: {
        a: "A talking dog (eat shit, Air Bud)",
        b: "A gay couple (eat shit, straight people)",
        c: "Another company's logo (way to go, Target)",
        d: "JNCO Jeans"
      },
      correctAnswer: "b",
      explanation: ":') thx IKEA"
    },
    {
      question: "Ikea changed it's typeface from Futura to Verdana in what year?",
      answers: {
        a: "2000",
        b: "2017",
        c: "1995",
        d: "2009",
      },
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
             <input type="radio" name="question${questionNumber}" value="${letter}">
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

  function showResults() {
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

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
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
      previousButton.style.display = "inline-block";
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
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
