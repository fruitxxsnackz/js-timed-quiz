// Had some issues and this make sures the html loads before running script.
document.addEventListener("DOMContentLoaded", function() {
    var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
    var thisquestion = 0;
    var score = 0;
    var timer = 80;
    var endthequiz = false;
    var timerz;
//    Setting variables, setting attributes, and linking html elements.
    const start = document.querySelector("#start");
    const quizquiz = document.querySelector("#questionquiz");
    const feedback = document.querySelector("#feedback");
    const showtimer = document.querySelector("#timer");
    const scoresection = document.querySelector("#highscores");
    const listscores = document.querySelector("#listscores");
    const mainscreen = document.querySelector(".startscreen");
    const viewhighscore = document.querySelector("#viewhighscores");
    const gobackbutton = document.querySelector("#goback");
    const clearscorebutton = document.querySelector("#clearhighscores");
    const submitinitial = document.createElement("input");
    submitinitial.setAttribute("type", "text");
    submitinitial.setAttribute("id", "initials");
    submitinitial.setAttribute("maxlength", "2");
    const savescoreboard = document.createElement("button");
    savescoreboard.textContent = "Save Score";
    savescoreboard.setAttribute("id", "save-score");

    const backbutton = document.createElement("button");
    backbutton.textContent = "Go Back";
    backbutton.classList.add("selectbutton");
    backbutton.addEventListener("click", goback);
    const clearbuttons = document.createElement("button");
    clearbuttons.textContent = "Clear High Scores";
    clearbuttons.classList.add("selectbutton");
    clearbuttons.addEventListener("click", clearhighscore);

    // Questions array to rotate from and pull from.
    const questions = [
        {
        question: 'Commonly used data types DO not include:',
         options: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
         answer: '3. alerts',
        },
        {
         question: 'The condition in an if / else statement is enclosed with _______.',
         options: ['1. quotes', '2. curly brackets', '3. parenthesis', '4. square brackets'],
         answer: '3. parenthesis',
        },
        {
         question: 'Arrays in JavaScript can be used to store _____.',
         options: ['1. numbers and strings', '2. other arrays', '3. booleans', '4. all of the above'],
         answer: '4. all of the above',
        },
        {
         question: 'String values must be enclosed within _____ when being assigned to variables.',
         options: ['1. commas', '2. curly brackets', '3. quotes', '4. parenthesis'],
        answer: '3. quotes',
        },
        {
          question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
         options: ['1. JavaScript', '2. terminal/bash', '3. for loops', '4. console.log'],
         answer: '4. console.log',
        },
    ];
// Start quiz function; setting default settings and styling; Run functions
    function startquiz() {
        thisquestion = 0;
        score = 0;
        timer = 80;
        endthequiz = false;
        mainscreen.style.display = 'none';
        quizquiz.style.display = 'block';
        scoresection.style.display = 'none';
        feedback.style.display = 'block';
        showquestion();
        timerfunc();
    }
// Display question function; Verify all questions are shown; Style questions
    function showquestion() {
        if (thisquestion<questions.length) {
            const question = questions[thisquestion];
            quizquiz.innerHTML = `<h2>${question.question}</h2>`;
            // Buttons for the choices; Run function to verify answer and end quiz when questions are up.
            question.options.forEach((option, index)=>{
            const button = document.createElement('button');
            button.textContent = option;
             button.classList.add('optionbtn');
            button.onclick = function(){rightwrong(option);};
             quizquiz.appendChild(button);
            });
        } else {
         stopquiz(); }
    }
// Function to check answers and penalize time; grade answers; show next question after selection.
    function rightwrong(select) {
        const rightanswer = questions[thisquestion].answer;
        if (select === rightanswer) {
         score++;
        feedback.textContent = "Correct!";
        } else {
        timer -= 10;
         feedback.textContent = "Incorrect!";}
        thisquestion++;
        setTimeout(function() {
        if (thisquestion < questions.length) {
          showquestion();
          } else {
          stopquiz(); } }, 1000);
    }
// starts the timer; stops quiz if score drops to zero.
    function timerfunc() {
        timerz = setInterval(function() {
         timer--;
         updateshowtimer();
         if (timer <= 0) {
          clearInterval(timerz);
         stopquiz(); } }, 1000);
    }
// show accurate timer display
    function updateshowtimer() {
     showtimer.textContent = `${timer}`;
    }
// Function to stop the quiz and it stops the time, clears all quiz content.
    function stopquiz() {
        clearInterval(timerz);
        feedback.style.display = 'none';
        quizquiz.innerHTML = '';
        // Display end screen with final result and show initials input bar and score button.
        const endmessage = document.createElement('section');
        endmessage.innerHTML = `<h2>All done!</h2><p>Your final score is ${score}.</p>`;
        quizquiz.appendChild(endmessage);
        quizquiz.appendChild(submitinitial);
        quizquiz.appendChild(savescoreboard);
        // set the quiz as finished
        endthequiz = true;
    }
// Save scores to local storage.
    savescoreboard.addEventListener('click', function() {
        const initials = submitinitial.value.trim();
        if (initials) {
            highscores.push({initials, score});
            localStorage.setItem("highscores", JSON.stringify(highscores));
        }
    });
// High scores screen; arrange scores accordingly and show go back button and clear scores button.
    function showhighscores() {
        quizquiz.innerHTML = '';
        mainscreen.style.display = 'none';
        feedback.style.display = 'none';
        scoresection.innerHTML = '<h2>High Scores</h2>';
        highscores.sort(function(a, b) {
         return b.score - a.score;
        });
        highscores.forEach(function(entry, index) {
          var scoreslist = document.createElement("section");
          scoreslist.textContent = (index + 1) + ". " + entry.initials + " - " + entry.score;
         scoresection.appendChild(scoreslist);
        });
        scoresection.appendChild(backbutton);
        scoresection.appendChild(clearbuttons);
        scoresection.style.display = 'block';
    }
// Gos back to start queen so quiz can be taken again.
    function goback() {
       scoresection.style.display = 'none';
      mainscreen.style.display = 'block';
      endthequiz = false;
    }
// Removes scores from local storage and refreshes screen.
    function clearhighscore() {
     highscores = [];
     localStorage.removeItem("highscores");
     showhighscores();
    }
// All event listeners for the buttons.
    start.addEventListener("click", startquiz);
    viewhighscore.addEventListener("click", showhighscores);
    gobackbutton.addEventListener("click", goback);
    clearscorebutton.addEventListener("click", clearhighscore);
});
