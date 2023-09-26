/*
    1. Guardar nombre jugador. COMPLETADO
    2. Al empezar el juego se podrá elegir jugar o introducir palabras. COMPLETADO
    3. Dar opción al usuario de introducir palabras según niveles (fácil[4 o menos], medio [de 5 a 7], difícil [7 o más]).
        3.1. Checkear que la palabra introducida sea válida (no números, no repetida y dentro del rango). COMPLETADO
        3.2. Si la palabra es correcta, insertarla en el array indicado. COMPLETADO
        3.3 Dar opción de introducir tantas palabras como quiera el usuario. COMPLETADO
    4. Guardar datos partida (como nivel y palabra/s introducidas).
    5. Método que gestione el tiempo (guardar como dato de partida).
    6. Mostrar resumen de partida.
    7. Llevar ranking de partidas almacenando el tiempo de cada partida y su dificultad
    8. (Opcional) Dibujar ahorcado
*/

//Declaraciñón de variables:
let playerName;
let optionSetWord_Play;
let wordsEasy = new Array();
let wordsMedium = new Array();
let wordsHard = new Array();
let chooseOptionsMsj = "Choose one of the following options:\n";

//Declaración de funciones:

function main() {
  let regularDifficultyHeader = "Select difficulty:\n";
  let difficultyOptions =
    "Easy --> Enter '1'.\n" + "Medium --> Enter '2'.\n" + "Hard --> Enter '3'.";
  let difficultyLevel;

  console.log("Welcome to The Hangman Game.");

  playerName = prompt("Please, enter your name:");

  optionSetWord_Play = optionSetWord_PlayFunction();

  if (optionSetWord_Play === "1") {
    console.log("Play!");
  } else {
    do {
      wordsGenerated = false;
      generateNewWord(0, false);
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

  console.log("New game.");
  console.log("Game info:");
  game(difficultyLevel);
}

function optionSetWord_PlayFunction() {
  let optionMsj =
    " - Type '1' to play with a random word.\n" +
    " - Type '2' to add words by difficulty.";
  let regularOptionMsj = "Choose one of the following options:\n";
  let errorOptionMsj = "Error. Please, enter either '1' or '2' to proceed.\n";
  let option = prompt(regularOptionMsj + optionMsj);

  do {
    if (option !== "1" && option !== "2") {
      option = prompt(errorOptionMsj + optionMsj);
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
  let errorMsj = "Error. Please, enter either '1', '2' or '3' to proceed.\n";

  if (noWords) {
    enterWord(level, noWords);
  } else {
    option = prompt(`${chooseOptionsMsj}${options}`);

    do {
      if (option !== "1" && option !== "2" && option !== "3") {
        option = prompt(`${errorMsj}${options}`);
      }
    } while (option !== "1" && option !== "2" && option !== "3");

    enterWord(option, noWords);
  }

  wordsGenerated = anotherWordOption();
}

function enterWord(optionNumber, noWords) {
  let introducedWord;
  let maxLengthAllowed;
  let minLenghtAllowed;
  let noWordsMsj = "There are no words available in this level. Please:\n";
  let introduceEasyWordMsj =
    "Add an easy word.\n" +
    "Remember:\n" +
    " - Maximun 4 letters long.\n" +
    " - No spaces.\n" +
    " - No numbers.";
  let introduceMedWordMsj =
    "Add a medium word.\n" +
    "Remember:\n" +
    " - Between 5 and 7 letters long.\n" +
    " - No spaces.\n" +
    " - No numbers.";
  let introduceHardWordMsj =
    "Add a hard word.\n" +
    "Remember:\n" +
    " - More than 7 letters long.\n" +
    " - No spaces.\n" +
    " - No numbers.\n" +
    " - Max 100 letters long.";

  if (noWords) {
    introduceEasyWordMsj = noWordsMsj + introduceEasyWordMsj;
    introduceMedWordMsj = noWordsMsj + introduceMedWordMsj;
    introduceHardWordMsj = noWordsMsj + introduceHardWordMsj;
  }

  switch (optionNumber) {
    case "1":
      maxLengthAllowed = 4;
      minLenghtAllowed = 1;
      introducedWord = prompt(introduceEasyWordMsj);

      introducedWord = preCheckWord(
        introducedWord,
        maxLengthAllowed,
        minLenghtAllowed
      );

      wordsEasy.push(introducedWord);
      break;

    case "2":
      maxLengthAllowed = 7;
      minLenghtAllowed = 5;
      introducedWord = prompt(introduceMedWordMsj);

      introducedWord = preCheckWord(
        introducedWord,
        maxLengthAllowed,
        minLenghtAllowed
      );

      wordsMedium.push(introducedWord);
      break;

    case "3":
      maxLengthAllowed = 100;
      minLenghtAllowed = 8;
      introducedWord = prompt(introduceHardWordMsj);

      introducedWord = preCheckWord(
        introducedWord,
        maxLengthAllowed,
        minLenghtAllowed
      );

      wordsHard.push(introducedWord);
      break;

    default:
      break;
  }
}

function preCheckWord(introducedWord, maxLengthAllowed, minLenghtAllowed) {
  do {
    correctWord = false;
    correctWord = checkWord(introducedWord, maxLengthAllowed, minLenghtAllowed);

    if (correctWord) {
      console.log("Word entered successfully.");
    } else {
      introducedWord = prompt(
        "Error. The word is not valid. Try again:\n\n" +
          "Add an easy word.\n" +
          "Remember:\n" +
          " - Maximun 4 letters long.\n" +
          " - No spaces.\n" +
          " - No numbers."
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
  let optionsMsj = "Yes --> Enter '1'.\n" + "No --> Enter '2'.";
  let option = prompt(regularHeader + optionsMsj);

  do {
    if (option !== "1" && option !== "2") {
      option = prompt(errorHeader + optionsMsj);
    }
  } while (option !== "1" && option !== "2");

  if (option === "1") {
    isAnotherWord = true;
  }
  return isAnotherWord;
}

function game(difficultyLevel) {
  let lives = 6;
  let selectedWord = "";
  let num;
  let round = 1;

  switch (difficultyLevel) {
    case "1":
      num = randomNum(wordsEasy.length);
      if (wordsEasy.length !== 0) {
        selectedWord = wordsEasy[num];
      } else {
        generateNewWord("1", true);
      }

      break;

    case "2":
      num = randomNum(wordsMedium.length);
      if (wordsMedium.length !== 0) {
        selectedWord = wordsMedium[num];
      } else {
        generateNewWord("2", true);
      }
      break;

    case "3":
      num = randomNum(wordsHard.length);
      if (wordsHard.length !== 0) {
        selectedWord = wordsHard[num];
      } else {
        generateNewWord("3", true);
      }
      break;

    default:
      break;
  }

  /*---------------------------------------ESTAMOS AQUÍ-------------------------------------------------------------*
  /*
  Tenemos que desarrollar las siguientes funciones:
  */
  showInfo(round, lives);
}

function randomNum(max) {
  return Math.floor(Math.random() * max);
}

function showInfo(round, lives) {
  console.clear();
  console.log(`Player name: ${playerName}`);
  console.log(`Round: ${round}`);
  console.log(`Lives remaining: ${lives}`);
  asciiHangman(lives);
  //---------------------------------------------------ESTAMOS AQUÍ---------------------------------------------
  
}

function asciiHangman(lives) {
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
     :&@7                             .5@@7                               
     :&@7                           :Y&@@@@                            
     :&@7                         ^5@@YJ@&7                          
     :&@7                       ~P@&J: 7@&.                        
     :&@7                     !G@#?.   7@&:                         
     :&@7                     YG7.     7@&:                           
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

main();
