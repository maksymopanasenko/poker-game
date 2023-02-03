"use strict";

window.addEventListener('DOMContentLoaded', () => {

    const digitLeft = document.querySelectorAll('.digit__left'),
          digitRight = document.querySelectorAll('.digit__right'),
          img = document.querySelectorAll('img'),
          start = document.querySelector('button'),
          parent = document.querySelectorAll('.card');


    const digits = [];
    

    let int = 0;

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

    let j = [];

    parent.forEach((i) => {
        j.push(i.children);
    
    });

    const clubs = [],
          diamonds = [],
          hearts = [],
          spades = [];
    
    


    // constants, lets !!!!!!!!!!!!!!!!!!


    executeCardForming();
    
    

    start.addEventListener('click', () => {
       

        executeCardForming();
        // console.log(digits);
    });


    
    
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
        for (let i of j) {
            for (let x = 0; x < i.length; x++) {
                if (i[0].getAttribute('class') == 'digit__left' && i[1].getAttribute('src') == `img/${suitName}.png`) {
                    suitArr.push(i[0].textContent);
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

    const checkBtn = document.querySelector('#check');

    function handAdditionalCard() {
        const hiddenCard = document.querySelectorAll('[data-card]');

        hiddenCard.forEach((card, i) => {
            const container = card.querySelector('.card__container');
            if (i == 0) {
                card.classList.add('card__appear');
                card.classList.remove('card__hidden_4');
                container.style.display = 'block';
            } else {
                const time = setTimeout(()=> {
                    card.classList.add('card__appear');
                    card.classList.remove('card__hidden_5');
                    container.style.display = 'block';
                }, 1000);
            }
        });
    }
    

    checkBtn.addEventListener('click', handAdditionalCard);




    


    
    
    




    
    

    




















});