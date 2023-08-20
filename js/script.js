"use strict";

window.addEventListener('DOMContentLoaded', () => {

    const digitLeft = document.querySelectorAll('.digit__left'),
          digitRight = document.querySelectorAll('.digit__right'),
          img = document.querySelectorAll('.card img'),
          emoji = document.querySelector('.hint-img'),
          startBtn = document.querySelector('.user-btn'),
          startBtnWrapper = document.querySelector('.wrapper__btn'),
          controlBtns = document.querySelector('.control__buttons'),
          gameBtns = document.querySelector('.buttons__wrapper'),
          tutorialBtns = document.querySelector('.buttons__wrapper_tutorial'),
          card = document.querySelectorAll('.card__container'),
          subtitleText = document.querySelector('.hint__subtitle'),
          coreText = document.querySelector('.hint__text');
    
    const playersC = document.querySelectorAll('[data-player]');
    const middles = document.querySelectorAll('[data-card="middle"]');
    const hiddenCard = [...playersC, ...middles];

    const digits = [];

    const values = {
        0: '2',
        1: '3',
        2: '4',
        3: '5',
        4: '6',
        5: '7',
        6: '8',
        7: '9',
        8: '10',
        9: 'J',
        10: 'Q',
        11: 'K',
        12: 'A'
    };

    const cardImgBySuit = {
        0: 'img/cards/clubs.png',
        1: 'img/cards/diamonds.png',
        2: 'img/cards/hearts.png',
        3: 'img/cards/spades.png'
    };

    const cardImgAltBySuit = {
        0: 'clubs',
        1: 'diamonds',
        2: 'hearts',
        3: 'spades'
    };

    let cardInnerElements = [];

    card.forEach((i) => {
        cardInnerElements.push(i.children);
    });

    const clubs = [],
          diamonds = [],
          hearts = [],
          spades = [];

    // variables above !!!!!!!!!!!!!!!!!!

    // start tutorial

    const text = document.querySelector('.greating_text'),
          overlay = document.querySelector('.overlay'),
          photo = overlay.querySelector('.my_person'),
          modalWrapper = overlay.querySelector('.modal_wrapper'),
          highlightedItems = document.querySelectorAll('.highlight');

    let userName;
    let counter = 1;

    tutorialBtns.addEventListener('click', (e) => {
        const target = e.target;

        if (target.className == 'tutorial_btn next') {
            chooseHighlight(counter, target);
            counter++;
        }

        if (target && target.nodeName == "BUTTON" && target.className != 'tutorial_btn next') {

            if (target.classList.contains('start')) {
                target.classList.remove('start');
                target.innerText = 'Skip all';
                addElementToDOM('.buttons__wrapper_tutorial', 'button', 'tutorial_btn', 'next', 'Next');
                chooseHighlight();
            } else if (target.classList.contains('close')) {
                closeTutorial();
            } else {
                highlightedItems.forEach(item => item.classList.remove('styled'));  
                finishTutorial();
                const newButton = document.querySelector('.next');
                newButton ? newButton.remove() : null;
                target.classList.add('close');
                target.parentElement.classList.add('center');
                target.innerText = "Save";
            }
        }
    });

    //

    function finishTutorial() {
        modalWrapper.innerHTML = '';
        modalWrapper.append(changeContentToInput());

        modalWrapper.querySelector('input').focus();

        const dataText = document.querySelector('.user_input');
        userName = dataText.value;
        dataText.addEventListener('keydown', (e) => {
            if (e.code == 'Enter') closeTutorial();
        });
        dataText.addEventListener('input', () => userName = dataText.value);
    }

    function closeTutorial() {
        if (!userName) {
            document.querySelector('.user_input').placeholder = 'This field cannot be empty!';
            return false;
        }
        
        overlay.style.display = 'none';
        document.querySelector('.stats__heading_player').innerText = userName;
        document.querySelector('.user_name').innerText = userName;   
        startBtn.removeAttribute('disabled');
    }
     
    //

    function addElementToDOM(parent, element, className1, className2, title) {
        const elemParent = document.querySelector(parent);
        
        const newElem = document.createElement(element);
        newElem.classList.add(className1, className2);
        newElem.innerText = title;
        elemParent.prepend(newElem);
    }

    //

    function chooseHighlight(counter = 0, button) {
        const sentences = {
            0: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
            1: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis maiores sunt, iusto aliquam porro dolore minus, voluptas nemo perferendis.',
            2: 'Perspiciatis maiores sunt, iusto aliquam porro dolore minus, voluptas nemo perferendis.',
            3: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis maiores sunt, iusto aliquam porro dolore minus',
        }

        highlightedItems.forEach((item, i) => {
            
            if (i == counter) {
                item.classList.add('styled');
                text.innerText = sentences[i];
                
            } else {
                item.classList.remove('styled');
            }
        });

        if (counter >= highlightedItems.length - 1 && counter < highlightedItems.length) {
            button.parentElement.lastChild.previousElementSibling.innerText = "Finish";
            button.remove();

        } else if (counter >= highlightedItems.length) {
            finishTutorial();
        }
    }

    //

    function changeContentToInput() {
        photo.remove();
        const elem = document.createElement('div');

        elem.innerHTML = `
            <h2 class="title_input">Enter your name</h2>
            <input type="text" id="name" class="user_input" value="Player">
        `;

        return elem;
    }

    // hand cards

    executeCardForming();

    function executeCardForming() {

        digits.length = 0;

        digitLeft.forEach((item, i) => {
            const counter = getRandomNum(Object.keys(values).length);
            item.textContent = values[counter];
            digitRight.forEach((dgt, n) => {
                if (n == i) {
                    dgt.textContent = item.textContent;
                }
            })
            digits.push(item.textContent);
        });

        setSuit();

        const tempArray = [...digits].sort();

        for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i + 1] === tempArray[i]&& tempArray[i + 2] === tempArray[i + 1] && tempArray[i + 3] === tempArray[i + 2] && tempArray[i + 4] === tempArray[i + 3]) {
                
                console.log(`${tempArray[i]} found number`);
                digits.length = 0;
                executeCardForming();  
            }
        }

        getherCollection();
    }

    function setSuit() {
        img.forEach((item) => {
            const a = getRandomNum(Object.keys(cardImgBySuit).length);
            item.setAttribute('src', cardImgBySuit[a]);
            item.setAttribute('alt', cardImgAltBySuit[a]);
        });
    }

    function getRandomNum(q) {
        return Math.floor(Math.random()*q);
    }

    function getherCollection() {
        let sortedSpades,
            sortedDiamonds,
            sortedHearts,
            sortedClubs;

        checkSuit(clubs, sortedClubs, 'clubs');
        checkSuit(diamonds, sortedDiamonds, 'diamonds');
        checkSuit(hearts, sortedHearts, 'hearts');
        checkSuit(spades, sortedSpades, 'spades');
    }

    function checkSuit(suitArr, sortedArr, suitName) {
        suitArr.length = 0;
        for (let key of cardInnerElements) {
            for (let x = 0; x < key.length; x++) {
                if (key[0].getAttribute('class') == 'digit__left' && key[1].getAttribute('src') == `img/cards/${suitName}.png`) {
                    suitArr.push(key[0].textContent);
                    break;
                }
            }
        }

        sortedArr = [...suitArr].sort();
        
        for (let i = 0; i < sortedArr.length; i++) {
            if (sortedArr[i + 1] === sortedArr[i]) {

                console.log(`${sortedArr[i]} found ${suitName}`);
                suitArr.length = 0;
                setSuit();
                getherCollection();
                break;
            }
        }
    }

    // handing cards

    const checkBtn = document.querySelector('#check'),
          raiseBtn = document.querySelector('#raise'),
          foldBtn = document.querySelector('#fold');
    const rateBtn = document.querySelector('.rate'),
          bar = document.querySelector('.buttons__bar');

    rateBtn.addEventListener('click', () => bar.style.display = 'block');
    raiseBtn.addEventListener('click', () => bar.style.display = 'none');

    function increaseScore() {
        const playerScore = document.querySelectorAll('.stats__player .stats__result'),
              compScore = document.querySelectorAll('.stats__computer .stats__result');

        const addPoints = (winner, looser) => {
            winner[0].innerHTML++;
            looser[1].innerHTML++;
            winner[2].innerHTML++;
            looser[2].innerHTML++;
        }

        switch (coreText.innerHTML) {
            case 'Opponent won!':
                addPoints(compScore, playerScore);
                break;
            case 'You won!':
                addPoints(playerScore, compScore);
                break;
            case 'Your cards are the same. It is definitely a draw!':
                compScore[0].innerHTML++;
                playerScore[0].innerHTML++;
                compScore[2].innerHTML++;
                playerScore[2].innerHTML++;
                break;
        }
    }

    handleArrayOnClick(hiddenCard, controlBtns);

    function handleArrayOnClick (array, btn) {
        let index = 0;
        let intervalId;
      
        const handleCards = () => {
          showCardContents(array[index], index+1)
          index++;
          addAttr();
      
            if (index >= array.length) {
                clearInterval(intervalId);
                intervalId = null;
                index = 0;
                addAttr();
                determineWinner(showMatches('[data-card=player]'), showMatches('[data-card=comp]'));
                increaseScore();
            }

            if (index > 3) {
                clearInterval(intervalId);
                intervalId = null;
                removeAttr();
            }
        };
      
        const handleClick = () => {
          if (!intervalId) {
            intervalId = setInterval(handleCards, 500);
            addAttr();  
          } else {
            clearInterval(intervalId);
            intervalId = null;
          }
        };
      
        btn.addEventListener('click', (e) => {
            const target = e.target;
            if (target && target.classList.contains('start-btn')) {
                handleClick();
                gameBtns.style.display = 'flex';
                startBtnWrapper.style.display = 'none';
            } else if (target && target.classList.contains('raise-btn')) {
                handleClick();
                calcChips();
            } else if (target && target.classList.contains('check-btn')) {
                handleClick();
            } else if (target && target.classList.contains('fold-btn')) {
                overlay.innerHTML=`
                    <div class="modal">
                        <div class="modal_content">
                            <h2 class="title_input">Would you like to fold?</h2>
                            <div class="buttons__wrapper_modal">
                                <button class="tutorial_btn reload">Yes</button>
                                <button class="tutorial_btn close">No</button>
                            </div>
                        </div>
                    </div>
                `;
        
                overlay.style.display = 'block';
        
                const reloadBtn = document.querySelector('.reload'),
                    close = document.querySelector('.close');
                
                close.addEventListener('click', () => {
                    overlay.style.display = 'none';
                });
        
                reloadBtn.addEventListener('click', () => {              
                    reload();
                    index = 0;
                });
            }
        });
      };

    // restart window
    
    function showRestartWindow() {
        overlay.innerHTML = `
            <p class="overlay__info">Click anywhere to start the next hand</p>
        `;
        
        overlay.classList.add('overlay_transparent');
        overlay.style.display = 'block';

        overlay.addEventListener('click', reload, {once: true});
    }

    //

    function removeAttr() {
        checkBtn.removeAttribute('disabled');
        raiseBtn.removeAttribute('disabled');
        foldBtn.removeAttribute('disabled');
    }

    function addAttr() {
        checkBtn.setAttribute('disabled', '');
        raiseBtn.setAttribute('disabled', '');
        foldBtn.setAttribute('disabled', '');
    }

    //

    function showCardContents(card, classElemNum) {
        card.classList.add('card__appear');
        card.classList.remove(`card__hidden_${classElemNum}`);   
    }

    // change img in hints

    function changeEmoji() {
        let numOfEmoji = Math.floor(Math.random()*10);
        emoji.src = `img/emoji/emoji${numOfEmoji}.png`;
    }

    // restart 

    function reload() {
        overlay.style.display = 'none';
        startBtnWrapper.style.display = 'flex';
        gameBtns.style.display = 'none';
        executeCardForming();

        hiddenCard.forEach((card, i) => {
            card.classList.remove('card__appear');
            card.classList.add(`card__hidden_${i+1}`);
            card.classList.remove('card__highlighted');
        });
        
        subtitleText.innerText = "Lorem";
        coreText.innerHTML = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit, reprehenderit!';
    }

    // combinations

    function determineWinner(player, comp) {

        const [pointsPlayer,, matchesPlayer,,, playersCards] = player;
        const [pointsComp,, matchesComp,,, compsCards] = comp;

        console.log(`You scored with ${pointsPlayer} points`)
        console.log(`Computer scored with ${pointsComp} points`)
        console.log(matchesPlayer)
        console.log(matchesComp)

        if (pointsPlayer > pointsComp) {
            highlightAndDescribeCombination(player.slice(1));
            coreText.innerText = "You won!";
        } else if (pointsComp > pointsPlayer) {
            highlightAndDescribeCombination(comp.slice(1));
            coreText.innerText = "Opponent won!";
        } else {
            
            const playerSum = compareEquals(matchesPlayer);
            const compSum = compareEquals(matchesComp);

            if (playerSum > compSum) {
                highlightAndDescribeCombination(player.slice(1));
                coreText.innerText = "You won!";
            } else if (compSum > playerSum) {
                highlightAndDescribeCombination(comp.slice(1));
                coreText.innerText = "Opponent won!";
            } else {
                const playersTotal = compareEquals(playersCards);
                const compsTotal = compareEquals(compsCards);

                if (playersTotal > compsTotal) {
                    highlightAndDescribeCombination(player.slice(1));
                    coreText.innerText = "You won!";
                } else if (compsTotal > playersTotal) {
                    highlightAndDescribeCombination(comp.slice(1));
                    coreText.innerText = "Opponent won!";
                } else {
                    highlightAndDescribeCombination(player.slice(1));
                    highlightAndDescribeCombination(comp.slice(1));
                    coreText.innerText = "Your cards are the same. It is definitely a draw!";
                }    
            }
            // need to develop cases tree
        }
        
        changeEmoji();
        setTimeout(() => showRestartWindow(), 2000);
    }

    function compareEquals(matches) {
        let counter = 0;

        matches.forEach(item => counter += +item[0]);

        return counter;
    }

    function showMatches(player) {
        let pointsCounter = 0;

        const [matches, cardValueEntries, arrCardsValues, arrCards, playersCards] = getMatches(player);

        if (matches.length == 3) {
            pointsCounter += 4;
        } else if (matches.length == 2) {
            pointsCounter += 2;
        } else if (matches.length == 5) {
            if (findFlush(matches)) {
                if (isStreet(matches)) {
                    if (matches[0][1] == '10') {
                        pointsCounter += 10; // royal flush
                    } else {
                        pointsCounter += 9; // straight flush
                    }
                } else {
                    pointsCounter += 6; // flush
                }
            } else {
                pointsCounter += 7; // full house
            }
        } else if (matches.length == 4) {
            if (matches[0][0] == matches[1][0] && matches[0][0] == matches[1][0] && matches[0][0] == matches[2][0] && matches[0][0] == matches[3][0]) {
                pointsCounter += 8;
            } else {
                pointsCounter += 3;
            }
        } else if (matches.length == 7) {
            //need to test
            pointsCounter += 7;
        } else {
            pointsCounter += 1;
        }

        const highestCard = [];
        highestCard.push(sortByValue(cardValueEntries, arrCardsValues).pop());
        const dataArr = [];
        dataArr.push(pointsCounter, arrCardsValues, matches, arrCards, highestCard, playersCards);

        return dataArr;
    };

    function findFlush(arr) {
        let hearts = [],
            diamonds = [],
            clubs = [],
            spades = [];

        arr.forEach(item => {
            const [first, second, third] = item;
            if (third == 'hearts') {
                hearts.push(item);
                return;
            } if (third == 'diamonds') {
                diamonds.push(item);
                return;
            } if (third == 'clubs') {
                clubs.push(item);
                return;
            } else {
                spades.push(item);
            }
        });

        const maxMatch = Math.max(hearts.length, diamonds.length, spades.length, clubs.length);
        const suit = [hearts, diamonds, spades, clubs].find(item => item.length === maxMatch);
        if (suit.length >= 5) {
            return suit.slice(-5);
        } else {
            return null;
        }
    }

    function getMatches(player) {
        const playersCards = document.querySelectorAll(player);
        const middleCards = document.querySelectorAll('[data-card=middle]');
        const cardValueEntries = Object.entries(values);
        
        const arrCards = [...playersCards, ...middleCards];
        const playersCardsArray = getCardValues([...playersCards]);

        const arrCardsValues = getCardValues(arrCards);

        const sortedCardsValues = sortByValue(cardValueEntries, arrCardsValues);
        const playersCardsValues = sortByValue(cardValueEntries, playersCardsArray);

        const matches = sortedCardsValues.filter((item, a) => {
            return sortedCardsValues.some((other, b) => {
                if (b != a) {
                    if (other[0] == item[0]) {
                        return other[0];
                    }
                }
            });
        });

        const matchedBySuit = sortedCardsValues.filter((item, a) => {
            return sortedCardsValues.some((other, b) => {
                if (b != a) {
                    if (other[2] == item[2]) {
                        return other[2];
                    }
                }
            });
        });

        function findSequentialCombinations(arr) {
            function processArray(arr) {
                const result = [];
                const seen = new Set();
                
                for (let i = 0; i < arr.length; i++) {
                  const subarray = arr[i];
                  const firstElement = subarray[0];
                  
                  if (!seen.has(firstElement)) {
                    result.push(subarray);
                    seen.add(firstElement);
                  }
                }
                
                return result;
            }

            const uniqueElems = processArray(arr);

            let longestSequence = [];
            let currentSequence = [];
          
            for (let i = 0; i < uniqueElems.length; i++) {
              if (
                currentSequence.length === 0 ||
                Number(uniqueElems[i][0]) === Number(currentSequence[currentSequence.length - 1][0]) + 1
              ) {
                currentSequence.push(uniqueElems[i]);
              } else {
                if (
                  currentSequence.length >= longestSequence.length
                ) {
                  longestSequence = currentSequence;
                }
                currentSequence = [uniqueElems[i]];
              }
            }
          
            if (currentSequence.length >= longestSequence.length) {
                longestSequence = currentSequence;
            }
          
            const sequences = [];
            let sequence = [];
            for (let i = 0; i < uniqueElems.length; i++) {
              if (i > 0 && Number(uniqueElems[i][0]) !== Number(uniqueElems[i - 1][0]) + 1) {
                sequences.push(sequence);
                sequence = [];
              }
              sequence.push(uniqueElems[i]);
            }
            sequences.push(sequence);
          
            let maxSequenceLength = 0;
            let maxSequenceIndex = -1;
          
            for (let i = 0; i < sequences.length; i++) {
              if (sequences[i].length > maxSequenceLength) {
                maxSequenceLength = sequences[i].length;
                maxSequenceIndex = i;
              }
            }
          
            longestSequence = sequences[maxSequenceIndex];
          
            for (let i = 0; i < sequences.length; i++) {
              if (
                sequences[i].length === longestSequence.length &&
                Number(sequences[i][0][0]) > Number(longestSequence[0][0])
              ) {
                longestSequence = sequences[i];
              }
            }
          
            if (longestSequence.length > 5) return longestSequence.slice(-5);
            return longestSequence;
        }

        function findFourOfKind(array) {
            for (let i = 0; i < array.length; i++) {
                const commonElement = array[i][0];
                const result = array.filter(subArray => subArray[0] === commonElement);
                if (result.length === 4) {
                    return result;
                    break;
                }
            }
        }
        
        const street = findSequentialCombinations(sortedCardsValues);
        const flush = findFlush(matchedBySuit);
        const straightFlush = flush ? isStreet(flush) : null;

        const cutMatches = [];
        
        if (matches.length == 6) {
            const resultArray = findFourOfKind(matches);
            if (resultArray) {
                cutMatches.push(...resultArray);
            } else if (matches[0][0] == matches[1][0] && matches[0][0] == matches[2][0]) {
                cutMatches.push(...matches.slice(1));
            } else {
                cutMatches.push(...matches.slice(2));
            }
        } else {
            cutMatches.push(...matches);
        }

        if (straightFlush && cutMatches.length <= 4) {
            return [flush, cardValueEntries, arrCardsValues, arrCards, playersCardsValues];
        } else if (flush && cutMatches.length <= 4) {
            return [flush, cardValueEntries, arrCardsValues, arrCards, playersCardsValues];
        } else if (street.length == 5 && cutMatches.length <= 4) { // fix cut can be four of kind
            return [street, cardValueEntries, arrCardsValues, arrCards, playersCardsValues];
        } else {
            return [cutMatches, cardValueEntries, arrCardsValues, arrCards, playersCardsValues];
        }

    }

    function sortByValue(cardValueEntries, arrCardsValues) {
        const arr = [];
        cardValueEntries.forEach(value => {
            arrCardsValues.forEach(card => {
                if (card[0] == value[1]) arr.push([...value, card[1], card[2]]);              
            });
        });
        return arr;
    }

    function getCardValues(cards) {
        return cards.map((card, i) => {
            const suit = card.querySelector('img').getAttribute('alt');
            const digit = card.querySelector('.digit__left').innerHTML;
    
            return [digit, suit, i];
        });
    }

    function highlightAndDescribeCombination([arrCardsValues, matches, arrCards, highest]) {

        if (matches.length == 0) {
            arrCardsValues.forEach((card, i) => {
                if (card[0] == highest[0][1]) {
                    arrCards[i].classList.add('card__highlighted');
                    return;
                }
            });

            subtitleText.innerHTML = "That's a <u>HIGH CARD</u>!";
        } else if (matches.length == 7) {
            let longer;
            let shorter = [];
            function handleSevenMatches(arr, index = 0) {
                let i = index;
                let dublicates;
                dublicates = arr.filter(item => {
                    return item[0] == arr[i][0]
                });
                if (dublicates.length == 4) {
                    longer = [...dublicates]
                } else {
                    if (dublicates.length == 3) {
                        longer = [...dublicates]
                        
                        if (i < arr.length - 1) {
                            handleSevenMatches(arr, i + 1)
                        }
                    } else {
                        shorter = [...dublicates]
                        if (i < arr.length - 1) {
                            handleSevenMatches(arr, i + 1)
                        }
                    }
                }
            }

            handleSevenMatches(matches);
    
            const result = [...shorter, ...longer];
            setHighlighting(arrCardsValues, result, arrCards);
            
            result.length == 4 ? subtitleText.innerHTML = "That's a <u>FOUR OF A KIND</u>!" : subtitleText.innerHTML = "That's a <u>FULL HOUSE</u>!";
        } else {
            setHighlighting(arrCardsValues, matches, arrCards); 

            if (matches.length == 3) {
                subtitleText.innerHTML = "That is <u>THREE OF A KIND</u>!";
            } else if (matches.length == 2) {
                subtitleText.innerHTML = "That's a <u>PAIR</u>!";
            } else if (matches.length == 5 || matches.length == 7) {
                if (matches[0][2] == matches[1][2] && matches[0][2] == matches[2][2] && matches[0][2] == matches[3][2] && matches[0][2] == matches[4][2]) {
                    if (matches[0][1] == '10') {
                        subtitleText.innerHTML = "That's a <u>ROYAL FLUSH</u>!";
                    } else if (isStreet(matches).length == 5) {
                        subtitleText.innerHTML = "That's a <u>STRAIGHT FLUSH</u>!"
                    } else {
                        subtitleText.innerHTML = "That's a <u>FLUSH</u>!";
                    }
                } else if (isStreet(matches).length == 5) {
                    subtitleText.innerHTML = "That's a <u>STRAIGHT</u>!";
                } else {
                    subtitleText.innerHTML = "That's a <u>FULL HOUSE</u>!";
                }
            } else if (matches.length == 4) {
                if (matches[0][0] == matches[1][0] && matches[0][0] == matches[1][0] && matches[0][0] == matches[2][0] && matches[0][0] == matches[3][0]) {
                    subtitleText.innerHTML = "That's a <u>FOUR OF A KIND</u>!"; 
                } else {
                    subtitleText.innerHTML = "That is <u>TWO PAIRS</u>!";
                }
            }
        }
    }

    function isStreet(arr) {
        const currentSequence = []
        for (let i = 0; i < arr.length; i++) {
            if (
              currentSequence.length === 0 ||
              Number(arr[i][0]) === Number(currentSequence[currentSequence.length - 1][0]) + 1
            ) {
              currentSequence.push(arr[i]);
            }
        }
        return currentSequence;
    }

    function setHighlighting(arrCardsValues, matches, arrCards) {

        arrCardsValues.forEach((card, i) => {
            for (const key of matches) {
                if (card[2] == key[3]) {
                    arrCards[i].classList.add('card__highlighted');
                    return;
                }
            }
        });
    }

    // chips calc

    const rangeInput = document.querySelector('.button__range');
    const rangeValue = document.querySelector('.rate__amount');

    rangeInput.addEventListener('input', () => {
        rangeValue.textContent = rangeInput.value;
    });


    const chipsPlayer = document.querySelector('.count_player');

    rangeInput.max = chipsPlayer.innerHTML;

    const observer = new MutationObserver(function(mutationsList) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                rangeInput.max = mutation.target.textContent;
            }
        }
    });

    observer.observe(chipsPlayer, { childList: true });

    function calcChips() {
        chipsPlayer.innerText -= parseInt(rangeValue.innerText);
        rangeValue.textContent = 5;
        rangeInput.value = 5;
    }
















});