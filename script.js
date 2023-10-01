//Declaraciñón de variables:
let playerName;
let lives = 6;
let optionSetWord_Play;
let wordsEasy = new Array();
let wordsMedium = new Array();
let wordsHard = new Array();
let chooseOptionsMsg = "Choose one of the following options:\n";
let lettersUsed = "";
let letterUsed = false;
let wordGuessed = false;
let keepPlaying = true;
let ggMsg;
let gamesSummary = `Games summary:\n\n`;
let time;
let seeGamesSummaryMsg = new Array(`Do you want to see all games summary?\n`);
let round = 1;
let gamesCounter = 0;
let gameWon = "Yes";

//Declaración de funciones:

function main() {
  let seeGamesSummary;
  let wordsGenerated = false;
  let regularDifficultyHeader = "Select difficulty:\n";
  let difficultyOptions =
    "Easy --> Enter '1'.\n" + "Medium --> Enter '2'.\n" + "Hard --> Enter '3'.";
  let difficultyLevel;
  let yesNoOptions = new Array(
    `  - Yes --> Enter '1'\n`,
    `  - No  --> Enter '2'\n`
  );
  let playAgainAnswer;
  ggMsg = new Array(`Do you want to play again?\n`);

  console.log("Welcome to The Hangman Game.");

  playerName = prompt("Please, enter your name:");

  optionSetWord_Play = optionSetWord_PlayFunction();

  if (optionSetWord_Play === "1") {
    console.log("Play!");
  } else {
    do {
      wordsGenerated = generateNewWord(0, false);
    } while (wordsGenerated);
  }

  difficultyLevel = prompt(`${regularDifficultyHeader}${difficultyOptions}`);

  do {
    if (
      difficultyLevel !== "1" &&
      difficultyLevel !== "2" &&
      difficultyLevel !== "3"
    ) {
      difficultyLevel = prompt(
        `Error. The character entered is not valid.\n${regularDifficultyHeader}${difficultyOptions}`
      );
    }
  } while (
    difficultyLevel !== "1" &&
    difficultyLevel !== "2" &&
    difficultyLevel !== "3"
  );

  game(difficultyLevel);
  gamesCounter++;
  gamesSummary += `[\n  Game ${gamesCounter}\n  Player name: ${playerName}\n  Word guessed: ${gameWon}\n  Lives remaining: ${lives}\n  $Time: ${time}\n  Letters used: [${lettersUsed}]\n  Rounds: ${round}\n]\n\n`;
  lives = 6;
  lettersUsed = "";
  letterUsed = false;
  wordGuessed = false;
  round = 1;
  playAgainAnswer = optionsFunct(ggMsg, yesNoOptions);
  if (playAgainAnswer === "1") {
    keepPlaying = true;
  } else {
    keepPlaying = false;
    seeGamesSummary = optionsFunct(seeGamesSummaryMsg, yesNoOptions);
    if (seeGamesSummary === "1") {
      window.alert(gamesSummary);
    }
  }
}

function optionSetWord_PlayFunction() {
  let optionMsg =
    " - Type '1' to play with a random word.\n" +
    " - Type '2' to add words by difficulty.";
  let regularOptionMsg = "Choose one of the following options:\n";
  let errorOptionMsg = "Error. Please, enter either '1' or '2' to proceed.\n";
  let option = prompt(regularOptionMsg + optionMsg);

  do {
    if (option !== "1" && option !== "2") {
      option = prompt(errorOptionMsg + optionMsg);
    }
  } while (option !== "1" && option !== "2");

  return option;
}

function generateNewWord(level, noWords) {
  let options =
    " - Type '1' to enter an easy word (Max. 4 letters).\n" +
    " - Type '2' to enter a medium level word (Between 5 & 7 letters).\n" +
    " - Type '3' to enter a hard level word (7 or more letters).";
  let option;
  let errorMsg = "Error. Please, enter either '1', '2' or '3' to proceed.\n";

  if (noWords) {
    enterWord(level, noWords);
  } else {
    option = prompt(`${chooseOptionsMsg}${options}`);

    do {
      if (option !== "1" && option !== "2" && option !== "3") {
        option = prompt(`${errorMsg}${options}`);
      }
    } while (option !== "1" && option !== "2" && option !== "3");

    enterWord(option, noWords);
  }

  return anotherWordOption();
}

function enterWord(optionNumber, noWords) {
  let introducedWord;
  let maxLengthAllowed;
  let minLenghtAllowed;
  let noWordsMsg = "There are no words available in this level. Please:\n";
  let introduceEasyWordMsg =
    "Add an easy word.\n" +
    "Remember:\n" +
    " - Maximun 4 letters long.\n" +
    " - No spaces.\n" +
    " - No numbers.";
  let introduceMedWordMsg =
    "Add a medium word.\n" +
    "Remember:\n" +
    " - Between 5 and 7 letters long.\n" +
    " - No spaces.\n" +
    " - No numbers.";
  let introduceHardWordMsg =
    "Add a hard word.\n" +
    "Remember:\n" +
    " - More than 7 letters long.\n" +
    " - No spaces.\n" +
    " - No numbers.\n" +
    " - Max 100 letters long.";

  if (noWords) {
    introduceEasyWordMsg = noWordsMsg + introduceEasyWordMsg;
    introduceMedWordMsg = noWordsMsg + introduceMedWordMsg;
    introduceHardWordMsg = noWordsMsg + introduceHardWordMsg;
  }

  switch (optionNumber) {
    case "1":
      maxLengthAllowed = 4;
      minLenghtAllowed = 1;
      introducedWord = prompt(introduceEasyWordMsg);

      introducedWord = preCheckWord(
        introducedWord,
        maxLengthAllowed,
        minLenghtAllowed,
        introduceEasyWordMsg
      );

      wordsEasy.push(introducedWord);
      break;

    case "2":
      maxLengthAllowed = 7;
      minLenghtAllowed = 5;
      introducedWord = prompt(introduceMedWordMsg);

      introducedWord = preCheckWord(
        introducedWord,
        maxLengthAllowed,
        minLenghtAllowed,
        introduceMedWordMsg
      );

      wordsMedium.push(introducedWord);
      break;

    case "3":
      maxLengthAllowed = 100;
      minLenghtAllowed = 8;
      introducedWord = prompt(introduceHardWordMsg);

      introducedWord = preCheckWord(
        introducedWord,
        maxLengthAllowed,
        minLenghtAllowed,
        introduceHardWordMsg
      );

      wordsHard.push(introducedWord);
      break;

    default:
      break;
  }
}

function preCheckWord(
  introducedWord,
  maxLengthAllowed,
  minLenghtAllowed,
  introduceWordMsg
) {
  do {
    correctWord = false;
    correctWord = checkWord(introducedWord, maxLengthAllowed, minLenghtAllowed);

    if (correctWord) {
      console.log("Word entered successfully.");
    } else {
      introducedWord = prompt(
        "Error. The word is not valid. Try again:\n\n" + introduceWordMsg
      );
    }
  } while (!correctWord);

  return introducedWord;
}

function checkWord(introducedWord, maxLengthAllowed, minLenghtAllowed) {
  let correctWord = true;
  let i = 0;

  if (
    introducedWord.length > maxLengthAllowed ||
    introducedWord.length < minLenghtAllowed
  ) {
    correctWord = false;
  } else {
    while (i < introducedWord.length && correctWord) {
      if (
        (introducedWord.charCodeAt(i) > 47 &&
          introducedWord.charCodeAt(i) < 58) ||
        introducedWord.trim() === ""
      ) {
        correctWord = false;
      }

      i++;
    }
  }

  return correctWord;
}

function anotherWordOption() {
  let isAnotherWord = false;
  let regularHeader = "Do you wish to add another word?\n";
  let errorHeader = "Error. Please choose one of the following options:\n";
  let optionsMsg = "Yes --> Enter '1'.\n" + "No --> Enter '2'.";
  let option = prompt(regularHeader + optionsMsg);

  do {
    if (option !== "1" && option !== "2") {
      option = prompt(errorHeader + optionsMsg);
    }
  } while (option !== "1" && option !== "2");

  if (option === "1") {
    isAnotherWord = true;
  }
  return isAnotherWord;
}

function optionsFunct(messages, options) {
  let msgPrompt;
  let completeMsg = "";

  for (let i = 0; i < messages.length; i++) {
    completeMsg += messages[i];
  }

  for (let i = 0; i < options.length; i++) {
    completeMsg += options[i];
  }

  return (msgPrompt = prompt(`${completeMsg}`));
}

function game(difficultyLevel) {
  let selectedWord = "";
  let num;
  let playerWordStatus;
  let letter = "";
  let wordAdded = true;

  switch (difficultyLevel) {
    case "1":
      if (wordsEasy.length === 0) {
        do {
          wordsGenerated = generateNewWord("1", wordAdded);
          wordAdded = false;
        } while (wordsGenerated);
      }
      num = randomNum(wordsEasy.length);
      selectedWord = wordsEasy[num];
      break;

    case "2":
      if (wordsMedium.length === 0) {
        do {
          wordsGenerated = generateNewWord("2", wordAdded);
          wordAdded = false;
        } while (wordsGenerated);
      }
      num = randomNum(wordsMedium.length);
      selectedWord = wordsMedium[num];
      break;

    case "3":
      if (wordsHard.length === 0) {
        do {
          wordsGenerated = generateNewWord("3", true);
          wordAdded = false;
        } while (wordsGenerated);
      }
      num = randomNum(wordsHard.length);
      selectedWord = wordsHard[num];
      break;

    default:
      break;
  }

  playerWordStatus = initialWordStatus(selectedWord);

  do {
    letter = showInfo_getLetter(round, difficultyLevel, playerWordStatus);
    playerWordStatus = checkStatus(letter, selectedWord, playerWordStatus);
    if (!playerWordStatus.includes("_")) {
      wordGuessed = true;
    }
    round++;
  } while (lives > 0 && !wordGuessed);

  ggMsg.unshift(
    `Game summary:\n  
       - Total time: ${time}\n
       - Letters used: [${lettersUsed}]\n
       - Rounds: ${round}\n\n`
  );

  if (lives === 0) {
    ggMsg.unshift("You lose.\n\n");
    gameWon = "No";
    asciiHangman();
  } else {
    ggMsg.unshift(`Correct! The word is: [${selectedWord}]\n\n`);
    gameWon = "Yes";
  }
}

function randomNum(max) {
  return Math.floor(Math.random() * max);
}

function initialWordStatus(selectedWord) {
  let wordStatus = "";

  for (let i = 0; i < selectedWord.length; i++) {
    wordStatus += "_ ";
  }

  return wordStatus;
}

function checkStatus(letter, selectedWord, playerWordStatus) {
  if (lettersUsed.includes(letter)) {
    letterUsed = true;
  } else {
    letterUsed = false;
    lettersUsed += letter;
    if (selectedWord.includes(letter)) {
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === letter) {
          playerWordStatus =
            playerWordStatus.substr(0, i * 2) +
            letter +
            playerWordStatus.substr(i * 2 + 1);
        }
      }
    } else {
      lives--;
    }
  }

  return playerWordStatus;
}

function showInfo_getLetter(round, difficultyLevel, playerWordStatus) {
  let wordStatusMsg = `Word status:   ${playerWordStatus}\n\n`;
  let playerNameMsg = `Player name: ${playerName}\n`;
  let roundMsg = `Round: ${round}\n`;
  let levelMsg = `[Level ${difficultyLevel}]\n`;
  let livesMsg = `Lives remaining: ${lives}\n\n`;
  let errorMsg = `Error. Only one alfabetic character allowed. Please:\n`;
  let letterUsedMessage = `[Warning] --> You've already used this letter. No lives has been deducted.\n`;
  let msg = `Enter one letter:`;
  let letter;

  asciiHangman();

  if (!letterUsed) {
    letter = prompt(
      `${playerNameMsg}${roundMsg}${levelMsg}${livesMsg}${wordStatusMsg}${msg}`
    );
  } else {
    letter = prompt(
      `${playerNameMsg}${roundMsg}${levelMsg}${livesMsg}${wordStatusMsg}${letterUsedMessage}${msg}`
    );
  }

  do {
    if (
      letter.trim() === "" ||
      letter.length !== 1 ||
      letter.toLowerCase().charCodeAt(0) < 97 ||
      letter.toLowerCase().charCodeAt(0) > 122
    ) {
      letter = prompt(
        `${playerNameMsg}${roundMsg}${levelMsg}${livesMsg}${wordStatusMsg}${errorMsg}${msg}`
      );
    }
  } while (
    letter.trim() === "" ||
    letter.length !== 1 ||
    letter.toLowerCase().charCodeAt(0) < 97 ||
    letter.toLowerCase().charCodeAt(0) > 122
  );

  return letter;
}

function asciiHangman() {
  switch (lives) {
    case 6:
      console.log(`                                                                                                    
                                                                                                    
                                                                                                    
      ?Y55555555555555555555555555555555Y?                                
     :@@GY5555555555555555555555555555YG@@:                               
     :&@7                              7@&:                               
     :&@7                              7@&:                               
     :&@7                              7@&.                               
     :&@7                                                 
     :&@7                                              
     :&@7                                             
     :&@7                                             
     :&@7                                             
     :&@7                                              
     :&@7                                            
     :&@7                                                   
     :&@7                                                  
     :&@7                                               
     :&@7                                             
     :&@7                                             
     :&@7                                         
     :&@7                                        
     :&@7                                                    
     :&@7                                                   
     :&@7                                                 
     :&@7                                                   
     :&@7                                                 
     :&@7                                                
     :&@7                                               
     :&@7                                             
     :&@7                                          
     :&@7                                           
     :&@7                                        
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     .&@7                                                                 
75555555555@@GY5555555555555555555555555555555555555555557                     
75555555555YY555555555555555555555555555555555555555555557                     
                                                                          
                                                                          `);
      break;

    case 5:
      console.log(`                                                                                                    
                                                                                                    
                                                                                                    
      ?Y55555555555555555555555555555555Y?                                
     :@@GY5555555555555555555555555555YG@@:                               
     :&@7                              7@&:                               
     :&@7                              7@&:                               
     :&@7                              7@&.                               
     :&@7                            ^!P@@J~.                             
     :&@7                          7B@#G5PB&&P~                           
     :&@7                         5@#!.    :J@@?                          
     :&@7                        !@@^        J@&.                         
     :&@7                        !@@~        Y@#.                         
     :&@7                         J@@J^.  .~P@#~                          
     :&@7                          ^5#&#BB&&BJ.                           
     :&@7                            .:J@&~:                              
     :&@7                                                          
     :&@7                                                      
     :&@7                                                
     :&@7                                              
     :&@7                                            
     :&@7                                                
     :&@7                                                           
     :&@7                                                         
     :&@7                                                           
     :&@7                                                      
     :&@7                                                    
     :&@7                                                 
     :&@7                                                
     :&@7                                           
     :&@7                                          
     :&@7                                       
     :&@7                                         
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     .&@7                                                                 
75555555555@@GY5555555555555555555555555555555555555555557                     
75555555555YY555555555555555555555555555555555555555555557                     
                                                                          
                                                                          `);
      break;

    case 4:
      console.log(`                                                                                                    
                                                                                                    
                                                                                                    
      ?Y55555555555555555555555555555555Y?                                
     :@@GY5555555555555555555555555555YG@@:                               
     :&@7                              7@&:                               
     :&@7                              7@&:                               
     :&@7                              7@&.                               
     :&@7                            ^!P@@J~.                             
     :&@7                          7B@#G5PB&&P~                           
     :&@7                         5@#!.    :J@@?                          
     :&@7                        !@@^        J@&.                         
     :&@7                        !@@~        Y@#.                         
     :&@7                         J@@J^.  .~P@#~                          
     :&@7                          ^5#&#BB&&BJ.                           
     :&@7                            .:J@&~:                              
     :&@7                             .5@@7                               
     :&@7                           :Y&@@                        
     :&@7                         ^5@@YJ                        
     :&@7                       ~P@&J:                        
     :&@7                     !G@#?.                        
     :&@7                     YG7.                        
     :&@7                                                  
     :&@7                                                          
     :&@7                                                           
     :&@7                                                        
     :&@7                                                   
     :&@7                                                 
     :&@7                                                
     :&@7                                              
     :&@7                                     
     :&@7                                      
     :&@7                                      
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     .&@7                                                                 
75555555555@@GY5555555555555555555555555555555555555555557                     
75555555555YY555555555555555555555555555555555555555555557                     
                                                                          
                                                                          `);
      break;

    case 3:
      console.log(`                                                                                                    
                                                                                                    
                                                                                                    
      ?Y55555555555555555555555555555555Y?                                
     :@@GY5555555555555555555555555555YG@@:                               
     :&@7                              7@&:                               
     :&@7                              7@&:                               
     :&@7                              7@&.                               
     :&@7                            ^!P@@J~.                             
     :&@7                          7B@#G5PB&&P~                           
     :&@7                         5@#!.    :J@@?                          
     :&@7                        !@@^        J@&.                         
     :&@7                        !@@~        Y@#.                         
     :&@7                         J@@J^.  .~P@#~                          
     :&@7                          ^5#&#BB&&BJ.                           
     :&@7                            .:J@&~:                              
     :&@7                             .5@@7                               
     :&@7                           :Y&@@@@#7.                            
     :&@7                         ^5@@YJ@&7G@#?.                          
     :&@7                       ~P@&J:      ~P@&J:                        
     :&@7                     !G@#?.         ^5@&Y:                      
     :&@7                     YG7.             ^YB7                      
     :&@7                                                            
     :&@7                                                          
     :&@7                                                          
     :&@7                                                       
     :&@7                                                     
     :&@7                                                  
     :&@7                                               
     :&@7                                            
     :&@7                                         
     :&@7                                       
     :&@7                                        
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     .&@7                                                                 
75555555555@@GY5555555555555555555555555555555555555555557                     
75555555555YY555555555555555555555555555555555555555555557                     
                                                                          
                                                                          `);
      break;

    case 2:
      console.log(`                                                                                                    
                                                                                                    
                                                                                                    
      ?Y55555555555555555555555555555555Y?                                
     :@@GY5555555555555555555555555555YG@@:                               
     :&@7                              7@&:                               
     :&@7                              7@&:                               
     :&@7                              7@&.                               
     :&@7                            ^!P@@J~.                             
     :&@7                          7B@#G5PB&&P~                           
     :&@7                         5@#!.    :J@@?                          
     :&@7                        !@@^        J@&.                         
     :&@7                        !@@~        Y@#.                         
     :&@7                         J@@J^.  .~P@#~                          
     :&@7                          ^5#&#BB&&BJ.                           
     :&@7                            .:J@&~:                              
     :&@7                             .5@@7                               
     :&@7                           :Y&@@@@#7.                            
     :&@7                         ^5@@YJ@&7G@#?.                          
     :&@7                       ~P@&J: 7@&. ~P@&J:                        
     :&@7                     !G@#?.   7@&:   ^5@&Y:                      
     :&@7                     YG7.     7@&:     ^YB7                      
     :&@7                              7@&:                               
     :&@7                              7@&:                               
     :&@7                              ?@&^                               
     :&@7                                                       
     :&@7                                                      
     :&@7                                               
     :&@7                                             
     :&@7                                             
     :&@7                                          
     :&@7                                       
     :&@7                                       
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     .&@7                                                                 
75555555555@@GY5555555555555555555555555555555555555555557                     
75555555555YY555555555555555555555555555555555555555555557                     
                                                                          
                                                                          `);
      break;

    case 1:
      console.log(`                                                                                                    
                                                                                                    
                                                                                                    
      ?Y55555555555555555555555555555555Y?                                
     :@@GY5555555555555555555555555555YG@@:                               
     :&@7                              7@&:                               
     :&@7                              7@&:                               
     :&@7                              7@&.                               
     :&@7                            ^!P@@J~.                             
     :&@7                          7B@#G5PB&&P~                           
     :&@7                         5@#!.    :J@@?                          
     :&@7                        !@@^        J@&.                         
     :&@7                        !@@~        Y@#.                         
     :&@7                         J@@J^.  .~P@#~                          
     :&@7                          ^5#&#BB&&BJ.                           
     :&@7                            .:J@&~:                              
     :&@7                             .5@@7                               
     :&@7                           :Y&@@@@#7.                            
     :&@7                         ^5@@YJ@&7G@#?.                          
     :&@7                       ~P@&J: 7@&. ~P@&J:                        
     :&@7                     !G@#?.   7@&:   ^5@&Y:                      
     :&@7                     YG7.     7@&:     ^YB7                      
     :&@7                              7@&:                               
     :&@7                              7@&:                               
     :&@7                              ?@&^                               
     :&@7                             J@@@#!                              
     :&@7                           ^G@G^                          
     :&@7                          ?&@J                          
     :&@7                        :P@#~                             
     :&@7                       !#@5.                              
     :&@7                     .5@&7                                 
     :&@7                     G@G:                                   
     :&@7                     ^^                                    
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     .&@7                                                                 
75555555555@@GY5555555555555555555555555555555555555555557                     
75555555555YY555555555555555555555555555555555555555555557                     
                                                                          
                                                                          `);
      break;

    case 0:
      console.log(`                                                                                                    
                                                                                                    
                                                                                                    
      ?Y55555555555555555555555555555555Y?                                
     :@@GY5555555555555555555555555555YG@@:                               
     :&@7                              7@&:                               
     :&@7                              7@&:                               
     :&@7                              7@&.                               
     :&@7                            ^!P@@J~.                             
     :&@7                          7B@#G5PB&&P~                           
     :&@7                         5@#!.    :J@@?                          
     :&@7                        !@@^        J@&.                         
     :&@7                        !@@~        Y@#.                         
     :&@7                         J@@J^.  .~P@#~                          
     :&@7                          ^5#&#BB&&BJ.                           
     :&@7                            .:J@&~:                              
     :&@7                             .5@@7                               
     :&@7                           :Y&@@@@#7.                            
     :&@7                         ^5@@YJ@&7G@#?.                          
     :&@7                       ~P@&J: 7@&. ~P@&J:                        
     :&@7                     !G@#?.   7@&:   ^5@&Y:                      
     :&@7                     YG7.     7@&:     ^YB7                      
     :&@7                              7@&:                               
     :&@7                              7@&:                               
     :&@7                              ?@&^                               
     :&@7                             J@@@#!                              
     :&@7                           ^G@G^7&@Y.                            
     :&@7                          ?&@J   :G@B~                           
     :&@7                        :P@#~      J@@?                          
     :&@7                       !#@5.        ~B@G:                        
     :&@7                     .5@&7           .5@&7                       
     :&@7                     G@G:              !#@?                      
     :&@7                     ^^                 .~.                      
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     :&@7                                                                 
     .&@7                                                                 
75555555555@@GY5555555555555555555555555555555555555555557                     
75555555555YY555555555555555555555555555555555555555555557                     
                                                                          
                                                                          `);
      break;

    default:
      break;
  }
}

//Game code:

do {
  main();
  console.clear();
  console.log("Bye! Thanks for playing!");
} while (keepPlaying);
