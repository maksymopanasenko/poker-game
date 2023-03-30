"use strict";

window.addEventListener('DOMContentLoaded', () => {

    const digitLeft = document.querySelectorAll('.digit__left'),
          digitRight = document.querySelectorAll('.digit__right'),
          img = document.querySelectorAll('.card img'),
          startBtn = document.querySelector('.user-btn'),
          startBtnWrapper = document.querySelector('.wrapper__btn'),
          gameBtns = document.querySelector('.buttons__wrapper'),
          parent = document.querySelectorAll('.card__container'),
          info = document.querySelector('.hint-text');


    const digits = [];

    const value = {
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
        0: 'img/clubs.png',
        1: 'img/diamonds.png',
        2: 'img/hearts.png',
        3: 'img/spades.png'
    };

    const cardImgAltBySuit = {
        0: 'clubs',
        1: 'diamonds',
        2: 'hearts',
        3: 'spades'
    };

    let cardInnerElements = [];
    let int = 0,
        key = 0;



    parent.forEach((i) => {
        cardInnerElements.push(i.children);
    
    });

    const clubs = [],
          diamonds = [],
          hearts = [],
          spades = [];


    // variables above !!!!!!!!!!!!!!!!!!


    executeCardForming();
    
    startBtn.addEventListener('click', handCardsToPlayers);

    function executeCardForming() {

        digits.length = 0;
        int = 0;

        digitLeft.forEach((item, i) => {
            const counter = getNum(Object.keys(value).length);
            item.textContent = value[counter];
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
            const a = getNum(Object.keys(cardImgBySuit).length);
            item.setAttribute('src', cardImgBySuit[a]);
            item.setAttribute('alt', cardImgAltBySuit[a]);
        });
    }


    function getNum(q) {
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
                if (key[0].getAttribute('class') == 'digit__left' && key[1].getAttribute('src') == `img/${suitName}.png`) {
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



    raiseBtn.addEventListener('click', handAdditionalCard);
    checkBtn.addEventListener('click', handRestCards);

    function handRestCards() {
        const hiddenCard = document.querySelectorAll('.card__last');

        hiddenCard.forEach((card, i) => {
            const container = card.querySelector('.card__container');
            
            switch (i) {
                case 0:
                    showCardContents(container, card, 6);
                case 1:
                    setTimeout(()=> showCardContents(container, card, 7), 500);
            }
        });

        determineWinner(showMatches('[data-card=player]'), showMatches('[data-card=comp]'));
    }

    function handStartSet() {
        const hiddenCard = document.querySelectorAll('[data-first]');

        hiddenCard.forEach((card, i) => {
            const container = card.querySelector('.card__container');

            switch (i) {
                case 0:
                    showCardContents(container, card, 3);
                case 1:
                    setTimeout(()=> showCardContents(container, card, 4), 500);
                case 2:
                    setTimeout(()=> {
                        showCardContents(container, card, 5);
                        removeAttr();
                    }, 1000);
            }
        });      
    }

    function handCardsToPlayers() {
        const hiddenCard = document.querySelectorAll('[data-player]');
              

        hiddenCard.forEach((card, i) => {
            const container = card.querySelector('.card__container');

            switch (i) {
                case 0:
                    showCardContents(container, card, 1);
                case 1:
                    setTimeout(()=> showCardContents(container, card, 2), 500);
                case 2:
                    showCardContents(container, card, 8);
                case 3:
                    setTimeout(()=> showCardContents(container, card, 9), 500);
                default:
                    setTimeout(()=> handStartSet(), 1000); 
            }
        });
        gameBtns.style.display = 'flex';
        startBtnWrapper.style.display = 'none';
    }


    // +1 card


    let counterAdditionalCard = 6;

    function handAdditionalCard() {
        const hiddenCard = document.querySelectorAll('.card__last');

        if (hiddenCard.length < 2) {
            determineWinner(showMatches('[data-card=player]'), showMatches('[data-card=comp]'));
        }

        hiddenCard.forEach((card, i) => {

            if (i == 0) {
                const container = card.querySelector('.card__container');
                showCardContents(container, card, counterAdditionalCard);
                card.classList.remove('card__last');
                counterAdditionalCard++;
            } else {
                return;
            }
        });
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

    function showCardContents(container, card, classElemNum) {
        card.classList.add('card__appear');
        card.classList.remove(`card__hidden_${classElemNum}`);
        
    }


    // change img in hints

    const emoji = document.querySelector('.hint-img');
    let numOfEmoji = Math.floor(Math.random()*10);
    emoji.src = `img/emoji/emoji${numOfEmoji}.png`;


    // start tutorial

    const text = document.querySelector('.greating_text'),
          overlay = document.querySelector('.overlay'),
          modalContent = overlay.querySelector('.modal_content'),
          highlightedItems = document.querySelectorAll('.highlight');

    let userName;

    modalContent.addEventListener('click', (e) => {
        let counter = 1;
        const target = e.target;
        if (target.nodeName == "BUTTON" && target.className != 'tutorial_btn next') {

            if (target.classList.contains('start')) {
                target.classList.remove('start');
                target.innerText = 'Skip all';
                addElementToDOM('.buttons_wrapper', 'button', 'tutorial_btn', 'next', 'Next');
                const newButton = document.querySelector('.next');
                
                chooseHighlight(0);
                newButton.addEventListener('click', (e) => {
                    chooseHighlight(counter, e.target);
                    counter++;
                });
            } else if (target.classList.contains('close')) {
                if (!userName) {
                    return
                } else {
                    overlay.style.display = 'none';
                    document.querySelector('.player').innerText = userName;
                    document.querySelector('.user_name').innerText = userName;   
                    startBtn.removeAttribute('disabled');        
                    counter = 0;
                }
            } else {
                highlightedItems.forEach(item => item.classList.remove('styled'));  
                closeTutorial()       
                counter = 0;              
            }
        }
    });

    //

    function closeTutorial() {
        modalContent.innerHTML = '';
        modalContent.append(changeContentToInput());

        const input = modalContent.querySelector('input');
        input.focus();

        const dataText = document.querySelector('.user_input');
        // console.log(dataText);
        dataText.addEventListener('input', () => {
            userName = dataText.value;
        });
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

    function chooseHighlight(counter, button) {
        const text = {
            0: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
            1: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis maiores sunt, iusto aliquam porro dolore minus, voluptas nemo perferendis.',
            2: 'Perspiciatis maiores sunt, iusto aliquam porro dolore minus, voluptas nemo perferendis.',
            3: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis maiores sunt, iusto aliquam porro dolore minus',
        }

        highlightedItems.forEach((item, i) => {
            
            if (i == counter) {
                item.classList.add('styled');
                text.innerText = text[i];
                
            } else if (counter >= highlightedItems.length - 1 && counter < highlightedItems.length) {
                item.classList.remove('styled');
                button.innerText = 'Finish';
                button.parentElement.lastChild.previousElementSibling.style.display = 'none';
            } else if (counter >= highlightedItems.length) {
                
                closeTutorial();
            } else {
                item.classList.remove('styled');
            }
        });
    }

    //

    function changeContentToInput() {
        const elem = document.createElement('div');

        elem.innerHTML = `
            <h2 class="title_input">Enter your name</h2>
            <input type="text" class="user_input">
            <button class="tutorial_btn center close">Save</button>
        `;

        return elem;
    }

    // restart 

    const allCards = document.querySelectorAll('.card');

    foldBtn.addEventListener('click', () => {
        modalContent.innerHTML=`
            <h2 class="title_input">Would you like to fold?</h2>
            <div class="buttons__wrapper_modal">
                <button class="tutorial_btn reload">Yes</button>
                <button class="tutorial_btn close">No</button>
            </div>
            
        `;
        overlay.style.display = 'block';

        const reloadBtn = document.querySelector('.reload');
        
        key = 0;
        info.innerText = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

        reloadBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
            startBtnWrapper.style.display = 'flex';
            gameBtns.style.display = 'none';
            addAttr();
            executeCardForming();
            allCards.forEach((card, i) => {
                card.classList.remove('card__appear');
                card.classList.add(`card__hidden_${i}`);
                card.classList.remove('card__highlighted');
            });

            const lastCards = document.querySelectorAll('[data-class]');
            lastCards.forEach(card => {
                card.classList.add('card__last');
                counterAdditionalCard = 6;
            });
        });
    });

    // combinations

    function determineWinner(player, comp) {

        const [pointsPlayer, matchesPlayer, catchedP, highestPlayer] = player;
        const [pointsComp, matchesComp, catchedC, highestComp] = comp;

        console.log(`You scored with ${pointsPlayer} points`)
        console.log(`Computer scored with ${pointsComp} points`)
        console.log(matchesPlayer)
        console.log(matchesComp)
        if (pointsPlayer > pointsComp) {
            highlightWinner('[data-card=player]');
        } else if (pointsComp > pointsPlayer) {
            highlightWinner('[data-card=comp]');
        } else {
            const playerSum = highlightIfEqual(catchedP);
            const compSum = highlightIfEqual(catchedC);
            // console.log(catchedP)
            // console.log(catchedC)
            // console.log(playerSum);
            // console.log(compSum);

            if (playerSum > compSum) {
                highlightWinner('[data-card=player]');
                console.log('you won');
            } else if (compSum > playerSum) {
                highlightWinner('[data-card=comp]');
                console.log('comp won');
            } else {
                highlightWinner('[data-card=player]');
                highlightWinner('[data-card=comp]');
                console.log('draw');
            }
            // need to develop cases tree
            // need to solve and develop with high card
        }
    }

    function highlightIfEqual(matched) {
        let counter = 0;
        matched.forEach(item => counter += +item[0]);

        return counter;
    }

    function highlightWinner(player) {
        const playersCards = document.querySelectorAll(player);
        const middleCards = document.querySelectorAll('[data-card=middle]');
        const cardValueEntries = Object.entries(value);
        
        const arrCards = [...playersCards, ...middleCards];

        const arrCardsValues = getCardValues(arrCards);
        
        const matches = arrCardsValues.filter((item, a) => {
            return arrCardsValues.some((other, b) => {
                if (b != a) {
                    if (other[0] == item[0]) {
                        return other[0];
                    }
                }
            });
        });

        if (matches.length == 3) {
            info.innerText = "That are 3 of a kind!";
        } else if (matches.length == 2) {
            info.innerText = "That's a PAIR!";
        } else if (matches.length == 5) {
            info.innerText = "That's a FULL HOUSE!";
        } else if (matches.length == 4) {
            if (matches[0][0] == matches[1][0] && matches[0][0] == matches[1][0] && matches[0][0] == matches[2][0] && matches[0][0] == matches[3][0]) {
                info.innerText = "That's a FOUR OF A KIND!"; 
            } else {
                info.innerText = "That are TWO PAIRS!";
            }
        } else if (matches.length == 6) {
            const catched = detectHighest(cardValueEntries, matches);

            if (catched[0][0] == catched[1][0] && catched[0][0] == catched[2][0]) {
                info.innerText = "That are FULL HOUSE!";
            } else {
                info.innerText = "That are TWO PAIRS!";
            }
            
        } else {
            info.innerText = "That's a HIGH CARD!";
        }

        
        const highest = detectHighest(cardValueEntries, arrCardsValues).pop();

        highlightMatched(arrCardsValues, matches, cardValueEntries, arrCards, highest);
    }

    function showMatches(player) {
        let pointsCounter = 0;
        const playersCards = document.querySelectorAll(player);
        const middleCards = document.querySelectorAll('[data-card=middle]');
        const cardValueEntries = Object.entries(value);
        
        const arrCards = [...playersCards, ...middleCards];

        const arrCardsValues = getCardValues(arrCards);
        
        const matches = arrCardsValues.filter((item, a) => {
            return arrCardsValues.some((other, b) => {
                if (b != a) {
                    if (other[0] == item[0]) {
                        return other[0];
                    }
                }
            });
        });

        if (matches.length == 3) {
            pointsCounter += 4;
        } else if (matches.length == 2) {
            pointsCounter += 2;
        } else if (matches.length == 5) {
            pointsCounter += 5;
        } else if (matches.length == 4) {
            if (matches[0][0] == matches[1][0] && matches[0][0] == matches[1][0] && matches[0][0] == matches[2][0] && matches[0][0] == matches[3][0]) {
                pointsCounter += 6;
            } else {
                pointsCounter += 3;
            }
        } else if (matches.length == 6) {
            const catched = detectHighest(cardValueEntries, matches);

            if (catched[0][0] == catched[1][0] && catched[0][0] == catched[2][0]) {
                pointsCounter += 5;
            } else {
                pointsCounter += 3;
            }
            
        } else {
            pointsCounter += 1;
        }
        const catched = detectHighest(cardValueEntries, matches);

        const highest = detectHighest(cardValueEntries, arrCardsValues).pop();
        const dataArr = [];
        dataArr.push(pointsCounter, matches, catched, highest)

        return dataArr;
    }

    function detectHighest(cardValueEntries, arrCardsValues) {
        const arr = [];
        cardValueEntries.forEach(value => {
            arrCardsValues.forEach(card => {
                if (card[0] == value[1]) {
                    const ar = []
                    ar.push(...value, card[2]);
                    arr.push(ar);                 
                }                
            });
        });
        return arr;
    }

    function getCardValues(cards) {
        return cards.map((card, i) => {
            const pairOfValues = [];
            const suit = card.querySelector('img').getAttribute('alt');
            const digit = card.querySelector('.digit__left').innerHTML;

            pairOfValues.push(digit, suit, i);
    
            return pairOfValues;
        });
    }

    function highlightMatched(arrCardsValues, matches, cardValueEntries, arrCards, highest) {

        if (matches.length == 0) {
            arrCardsValues.forEach((card, i) => {
                if (card[0] == highest[1]) {
                    arrCards[i].classList.add('card__highlighted');
                    return;
                }
            });
        } else if (matches.length == 6) {
            const catched = detectHighest(cardValueEntries, matches);

            if (catched[0][0] == catched[1][0] && catched[0][0] == catched[2][0]) {
                const work = catched.slice(1);
                setHighlight(arrCardsValues, work, arrCards);
            } else {
                const work = catched.slice(2);
                setHighlight(arrCardsValues, work, arrCards);
            }
        } else {
            setHighlight(arrCardsValues, matches, arrCards); 
        }
    }

    function setHighlight(arrValues, arr, arrCards) {

        arrValues.forEach((card, i) => {
            for (const key of arr) {
                if (card[2] == key[2]) {
                    arrCards[i].classList.add('card__highlighted');
                    return;
                }
            }
        });
    }







    
    
    




    
    






















});