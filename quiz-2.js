/**
 * Project Name: Prompt Quizzer - A Quiz Game (Web Dev I Lab Assignment 4)
 * File Name: quiz.js
 * Author: Parneet Tyagi
 * Description: An interactive browser-console JavaScript quiz game featuring
 *              input normalization, immediate feedback, hints, high-score tracking
 *              via localStorage, and a replay option.
 */

// 1. Predefined array of quiz question objects (12 questions covering general knowledge & web dev)
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answer: "paris",
    hint: "It is famous for the Eiffel Tower."
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: "mars",
    hint: "It is the fourth planet from the Sun."
  },
  {
    question: "What is 5 + 7?",
    answer: "12",
    hint: "It equals one dozen."
  },
  {
    question: "Who is the President of Russia?",
    answer: "vladimir putin",
    hint: "His first name is Vladimir."
  },
  {
    question: "Which programming language is primarily used for web page interactivity?",
    answer: "javascript",
    hint: "Often abbreviated as JS."
  },
  {
    question: "What does HTML stand for?",
    answer: "hypertext markup language",
    hint: "HyperText ______ Language."
  },
  {
    question: "Which CSS property is used to change the text color of an element?",
    answer: "color",
    hint: "It is a single 5-letter word (American spelling)."
  },
  {
    question: "What does CSS stand for?",
    answer: "cascading style sheets",
    hint: "Cascading ______ Sheets."
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    answer: "a",
    hint: "It is a single-letter anchor tag."
  },
  {
    question: "Which JavaScript method removes whitespace from both ends of a string?",
    answer: "trim()",
    hint: "Ends with () and sounds like pruning extra spaces."
  },
  {
    question: "Which ocean is the largest on Earth?",
    answer: "pacific ocean",
    hint: "It borders Asia, Australia, and the Americas."
  },
  {
    question: "What is the chemical symbol for water?",
    answer: "h2o",
    hint: "Two hydrogen atoms and one oxygen atom."
  }
];

// Helper function to safely read/update high score in localStorage
function updateHighScore(currentScore, totalQuestions) {
  const storageKey = "promptQuizzerHighScore";
  let previousBest = 0;

  try {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      previousBest = parseInt(saved, 10) || 0;
    }
    if (currentScore > previousBest) {
      localStorage.setItem(storageKey, String(currentScore));
      return { bestScore: currentScore, isNewRecord: true, total: totalQuestions };
    }
  } catch (err) {
    // Fallback if localStorage is blocked in strict browser privacy modes
    return { bestScore: currentScore, isNewRecord: false, total: totalQuestions };
  }

  return { bestScore: previousBest, isNewRecord: false, total: totalQuestions };
}

// Helper function to return a performance message based on percentage
function getPerformanceMessage(score, total) {
  const percentage = (score / total) * 100;
  if (percentage === 100) return "Outstanding! Perfect score!";
  if (percentage >= 70) return "Great job! You know your stuff.";
  if (percentage >= 40) return "Good effort! Keep practicing.";
  return "Nice try! Review the answers and give it another shot.";
}

// 2. Main function to run the quiz
function runQuiz() {
  // 3. Score initialization
  let score = 0;
  const totalQuestions = quizQuestions.length;

  alert(
    "Welcome to Prompt Quizzer, Parneet!\n" +
    `You will be asked ${totalQuestions} questions.\n` +
    "Type your answer in the prompt box and press OK."
  );

  // 4. Loop through each question using a for loop
  for (let i = 0; i < totalQuestions; i++) {
    const currentItem = quizQuestions[i];

    // 5. Prompt for user input
    const userInput = prompt(
      `Question ${i + 1} of ${totalQuestions}:\n${currentItem.question}`
    );

    // Handle case where user clicks 'Cancel'
    if (userInput === null) {
      const confirmQuit = confirm("Do you want to exit the quiz early?");
      if (confirmQuit) {
        alert(`Quiz exited early. Current score: ${score} / ${totalQuestions}`);
        return;
      } else {
        i--; // Repeat the same question
        continue;
      }
    }

    // 6. Normalize user input and stored answer using toLowerCase() and trim()
    const normalizedInput = userInput.toLowerCase().trim();
    const normalizedAnswer = currentItem.answer.toLowerCase().trim();

    // 7. Check the answer & 8. Provide immediate feedback
    if (normalizedInput === normalizedAnswer) {
      score++;
      alert(`Correct!\nCurrent Score: ${score} / ${i + 1}`);
    } else {
      alert(
        `Wrong!\n` +
        `The correct answer is: ${currentItem.answer}\n` +
        `Hint for next time: ${currentItem.hint}\n` +
        `Current Score: ${score} / ${i + 1}`
      );
    }
  }

  // 9. Display the final score, performance rating, and localStorage high score
  const record = updateHighScore(score, totalQuestions);
  const rankMessage = getPerformanceMessage(score, totalQuestions);
  const recordText = record.isNewRecord
    ? `New High Score: ${record.bestScore} / ${totalQuestions}!`
    : `Best Score Recorded: ${record.bestScore} / ${totalQuestions}`;

  alert(
    `Quiz Over!\n` +
    `Your Final Score: ${score} out of ${totalQuestions}\n` +
    `${rankMessage}\n` +
    `${recordText}`
  );

  // Optional replay prompt from lab improvements
  if (confirm("Would you like to play Prompt Quizzer again?")) {
    runQuiz();
  }
}

// 10. Start the quiz automatically when pasted into the browser console
runQuiz();
