const game = () => {

    //set these variables globally within the game because I needed it with different functions
    let pScore = 0;
    let cScore = 0;
    const message = document.querySelector(".messageBoard");
    const playerScore =document.querySelector(".playerScore p");
    const computerScore =document.querySelector(".computerScore p");   
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const optionButton = document.querySelector(".options");

    //start game
    const startGame = () => {
        const startGameButton = document.querySelector(".intro #gameButton");
        const intro = document.querySelector(".intro");
        const match = document.querySelector(".actionArea");

        startGameButton.addEventListener("click", () => {
            intro.classList.add("fadeOut");
            match.classList.remove("fadeOut");
        });
    };

    //Play player option will generate computer choices
    const playMatch = () => {
        const options = document.querySelectorAll(".options button"); 
        const hands = document.querySelectorAll(".hands img");
        
        //this will remove style after playmatch function so that it will run again
        hands.forEach(hand => {
            hand.addEventListener("animationend", function() { //can't use ES6 because "this" will not bind, so write function normally
                this.style.animation = ""; 
            })
        })

        //computer choices
        const choices = ["rock", "paper", "scissors"];
                    
        options.forEach(playerButton => { /*everytime the player choose button, computer will generate its own choices */
            playerButton.addEventListener("click", function(){
                const computerRandomNumber = Math.floor(Math.random() * choices.length);
                const computerChoice = choices[computerRandomNumber];
        
        //to run animation before anything else
        setTimeout(() => {

            //call compare function and display message
            compareChoices(this.getAttribute("id"), computerChoice);
             
            //update images
            playerHand.src = `./images/${this.getAttribute("id")}.jpg`;
            computerHand.src = `./images/${computerChoice}.jpg`;

        }, 2000);

        //resetting hands before shake animation
        playerHand.src = "./images/rock.jpg";
        computerHand.src = "./images/rock.jpg";
        
        //hands animation of moving up and down
        playerHand.style.animation = "shakePlayerHand 2s ease";
        computerHand.style.animation = "shakeComputerHand 2s ease";
            });
        });
        
    };


    //update Scores
    const updateScore = () => {
        
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    }

    //compare computer choice and player choice
    const compareChoices = (playerChoice, computerChoice) => {

        //check for tie
        if(playerChoice === computerChoice) {
            message.textContent = "It's a tie"; 
            return;
        }
        //check for rock
        if(playerChoice === "rock"){
            if(computerChoice === "scissors"){
                message.textContent = "Player wins!";
                pScore++;
                updateScore();
                winner();
                return;
            }else {
                message.textContent = "Computer wins!";
                cScore++
                updateScore();
                winner();
                return;  
            };
            
        };
        //check for paper
        if(playerChoice === "paper"){
            if(computerChoice === "rock"){
                message.textContent = "Player wins!";
                pScore++;
                updateScore();
                winner();
                return;
            }else {
                message.textContent = "Computer wins!";
                cScore++
                updateScore();
                winner();
                return;
                
            };
        };
        //check for scissors
        if(playerChoice === "scissors"){
            if(computerChoice === "paper"){
                message.textContent = "Player wins!";
                pScore++;
                updateScore();
                winner();
                return;
            }else {
                message.textContent = "Computer wins!";
                cScore++
                updateScore();
                winner();
                return;
            };
        };
        
    }

    //checking for winner
    const winner = () => {
        
        if(pScore === 3){
            message.textContent = "Congratulations!!! Player wins!";
            optionButton.classList.add("stop")
            return;
        };
        if(cScore === 3){
            message.textContent = "Sorry! Computer wins!";
            optionButton.classList.add("stop")
            return;
        };
    }

    //RESET Game
    const restart = () => {
        const resetButton = document.querySelector("#reset")

        resetButton.addEventListener("click", () => {
            pScore = 0;
            cScore = 0
            playerScore.textContent = 0;
            computerScore.textContent = 0;
            message.textContent = "Choose an option";
            playerHand.src = "./images/rock.jpg";
            computerHand.src = "./images/rock.jpg";
            optionButton.classList.remove("stop")
        }) 
    }

    // calling functions
    startGame();
    playMatch();
    restart();
    
};

game();
