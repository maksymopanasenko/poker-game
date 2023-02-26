"use strict";

window.addEventListener('DOMContentLoaded', () => {

    const digitLeft = document.querySelectorAll('.digit__left'),
          digitRight = document.querySelectorAll('.digit__right'),
          img = document.querySelectorAll('.card img'),
          startBtn = document.querySelector('.user-btn'),
          startBtnWrapper = document.querySelector('.wrapper__btn'),
          gameBtns = document.querySelector('.buttons__wrapper'),
          parent = document.querySelectorAll('.card__container');


    const digits = [];

    const mast = {
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

    let cardInnerElements = [],
        int = 0;



    parent.forEach((i) => {
        cardInnerElements.push(i.children);
    
    });

    const clubs = [],
          diamonds = [],
          hearts = [],
          spades = [];
    
    


    // constants, lets !!!!!!!!!!!!!!!!!!


    executeCardForming();
    
    
    startBtn.addEventListener('click', handCardsToPlayers);


    
    
    function executeCardForming() {

        digits.length = 0;
        int = 0;

        digitLeft.forEach((i) => {
            const counter = getNum(Object.keys(mast).length);
            i.textContent = mast[counter];
            digits.push(i.textContent);
        });

        equalsDigits();
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

    function equalsDigits() {
        digitRight.forEach((a) => {
            a.textContent = digits[int];
            int++;      
        });
    }

    function setSuit() {
        img.forEach((item) => {
            const a = getNum(Object.keys(cardImgBySuit).length);
            item.setAttribute('src', cardImgBySuit[a]);  
                
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
          restartBtn = document.getElementById('fold');



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
                    const time = setTimeout(()=> showCardContents(container, card, 7), 500);
            }
        });
    }

    

    function handStartSet() {
        const hiddenCard = document.querySelectorAll('[data-first]');

        hiddenCard.forEach((card, i) => {
            const container = card.querySelector('.card__container');

            switch (i) {
                case 0:
                    showCardContents(container, card, 3);
                case 1:
                    const time = setTimeout(()=> showCardContents(container, card, 4), 500);
                case 2:
                    const time1 = setTimeout(()=> {
                        showCardContents(container, card, 5);
                        removeAttr();
                    }, 1000);
            }
        });      
    }

    function removeAttr() {
        checkBtn.removeAttribute('disabled');
        raiseBtn.removeAttribute('disabled');
    }

    function handCardsToPlayers() {
        const hiddenCard = document.querySelectorAll('[data-player]');
              

        hiddenCard.forEach((card, i) => {
            const container = card.querySelector('.card__container');

            switch (i) {
                case 0:
                    showCardContents(container, card, 1);
                case 1:
                    const time = setTimeout(()=> showCardContents(container, card, 2), 500);
                case 2:
                    showCardContents(container, card, 8);
                case 3:
                    const time1 = setTimeout(()=> showCardContents(container, card, 9), 500);
                default:
                    const time2 = setTimeout(()=> handStartSet(), 1000); 
            }
        });
        gameBtns.style.display = 'flex';
        startBtnWrapper.style.display = 'none';
    }


    // +1 card



    function handAdditionalCard() {
        let counter = 6;
        const hiddenCard = document.querySelectorAll('.card__last');
        
        hiddenCard.forEach((card, i) => {

            if (i == 0) {
                const container = card.querySelector('.card__container');
                showCardContents(container, card, counter);
                counter++;
            } else {
                return;
            }
        });
    }

    //

    function showCardContents(container, card, classElemNum) {
        card.classList.add('card__appear');
        card.classList.remove(`card__hidden_${classElemNum}`);
        container.style.display = 'block';
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
        console.log(dataText);
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

    const foldBtn = document.querySelector('#fold');
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

        reloadBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
            startBtnWrapper.style.display = 'flex';
            gameBtns.style.display = 'none';
            executeCardForming();
            allCards.forEach((card, i) => {
                card.classList.remove('card__appear');
                card.classList.add(`card__hidden_${i}`)
            });
        });
    });


    





    
    
    




    
    

    




















});