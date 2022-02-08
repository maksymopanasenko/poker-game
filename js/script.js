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

    const imgMast = {
        0: 'img/treff.png',
        1: 'img/bubn.png',
        2: 'img/cherv.png',
        3: 'img/pika.png'
    };

    let j = [];

    parent.forEach((i) => {
        j.push(i.children);
    
    });

    const treff = [],
          bubna = [],
          cherv = [],
          pika = [];
    
    


    // constants, lets !!!!!!!!!!!!!!!!!!


    xxx();
    
    

    start.addEventListener('click', () => {
       

        xxx();
        // console.log(digits);
    });


    
    
    function xxx() {

        digits.length = 0;
        int = 0;

        digitLeft.forEach((i) => {
            const counter = setNum(Object.keys(mast).length);
            i.textContent = mast[counter];
            digits.push(i.textContent);
        });

        equalsDigits();
        setMast();

        const tempArray = [...digits].sort();

        for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i + 1] === tempArray[i]&& tempArray[i + 2] === tempArray[i + 1] && tempArray[i + 3] === tempArray[i + 2] && tempArray[i + 4] === tempArray[i + 3]) {
                
                console.log(`${tempArray[i]} found number`);
                digits.length = 0;
                xxx();
                
            }
        }

  
        collection();
    }

    function equalsDigits() {
        digitRight.forEach((a) => {
            a.textContent = digits[int];
            int++;      
        });
    }

    function setMast() {
        img.forEach((i) => {
            const a = setNum(Object.keys(imgMast).length);
            i.setAttribute('src', imgMast[a]);  
                
        });
    }

    function setNum(q) {
        return Math.floor(Math.random()*q);
    }




    function collection() {
        checkTreff();
        checkBubna();
        checkCherv();
        checkPika();
    }

    // function checkAll() {  
    //     treff.length = 0;    
    //     for (let i of j) {
    //         for (let x = 0; x < i.length; x++) {
                
    //             if (i[0].getAttribute('class') == 'digit__left' && i[1].getAttribute('src') == 'img/treff.png') {
    //                 treff.push(i[0].textContent);
                    
    //                 break;
    //             } 
    //         }  
    //     }

    //     const sortedTreff = [...treff].sort();
        
    //     for (let i = 0; i < sortedTreff.length; i++) {
    //         if (sortedTreff[i + 1] === sortedTreff[i]) {
    //             console.log(`!!!!!!!!!!!!!!!  ${treff.length}`);
    //             console.log(`${sortedTreff[i]} found treff`);
    //             treff.length = 0;
    //             setMast();
    //             collection();
    //             break;
    //         }
    //     }
    // }


    function checkTreff() {  
        
        treff.length = 0;    
        for (let i of j) {
            for (let x = 0; x < i.length; x++) {
                
                if (i[0].getAttribute('class') == 'digit__left' && i[1].getAttribute('src') == 'img/treff.png') {
                    treff.push(i[0].textContent);
                    
                    break;
                } 
            }  
        }

        const sortedTreff = [...treff].sort();
        
        for (let i = 0; i < sortedTreff.length; i++) {
            if (sortedTreff[i + 1] === sortedTreff[i]) {
                // console.log(`!!!!!!!!!!!!!!!  ${treff.length}`);
                console.log(`${sortedTreff[i]} found treff`);
                treff.length = 0;
                setMast();
                collection();
                break;
            }
        }
    }
    
    

    // bubna
    function checkBubna() {
        bubna.length = 0;
        for (let i of j) {
            for (let x = 0; x < i.length; x++) {
                if (i[0].getAttribute('class') == 'digit__left' && i[1].getAttribute('src') == 'img/bubn.png') {
                    bubna.push(i[0].textContent);
                    break;
                }
            } 
        }
        
        const sortedBubna = [...bubna].sort();
        
        for (let i = 0; i < sortedBubna.length; i++) {
            if (sortedBubna[i + 1] === sortedBubna[i]) {

                console.log(`${sortedBubna[i]} found bubna`);
                bubna.length = 0;
                setMast();
                collection();
                break;
            }
        }
    }
    
    


    // chyrva

    function checkCherv() {
        cherv.length = 0;
        for (let i of j) {
            for (let x = 0; x < i.length; x++) {
                if (i[0].getAttribute('class') == 'digit__left' && i[1].getAttribute('src') == 'img/cherv.png') {
                    cherv.push(i[0].textContent);
                    break;
                }
            }   
        }

        const sortedCherv = [...cherv].sort();
        
        for (let i = 0; i < sortedCherv.length; i++) {
            if (sortedCherv[i + 1] === sortedCherv[i]) {

                console.log(`${sortedCherv[i]} found cherv`);
                cherv.length = 0;
                setMast();
                collection();
                break;
            }
        }
    }


    //pika
    function checkPika() {
        pika.length = 0;
        for (let i of j) {
            for (let x = 0; x < i.length; x++) {
                if (i[0].getAttribute('class') == 'digit__left' && i[1].getAttribute('src') == 'img/pika.png') {
                    pika.push(i[0].textContent);
                    break;
                }
            }
        }

        const sortedPika = [...pika].sort();
        
        for (let i = 0; i < sortedPika.length; i++) {
            if (sortedPika[i + 1] === sortedPika[i]) {

                console.log(`${sortedPika[i]} found pika`);
                pika.length = 0;
                setMast();
                collection();
                break;
            }
        }
    }
   



    


    
    
    




    
    

    




















});