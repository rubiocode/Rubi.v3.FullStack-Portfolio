const contactForm= document.querySelector('.contact-form');
let name= document.getElementById('fullName');
let email= document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log('I\'ve been clicked');

    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
    }

    console.log(formData);

    //creating new XMLHtt requests instance 
    let xhr = new XMLHttpRequest();

    //using built-in methods
    //Open takes two arguments 1. the method we are sending the request and 2. URL to we want to POST to
    xhr.open('POST', '/');

    //Second method to use setRequestHeader and takes two arguments 1. 'content-type' header and 2. 'application/json' needs to be sent in JSON
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Next, we want to use the function onload and this fxn will trigger once we get response from backend
    xhr.onload = function (){
        //console.log(xhr.responseText);

        if(xhr.responseText == 'success'){
            alert ('Thank you for reaching out. Your email has been sent successfully');

            //clear form after submitting
            fullName.value= '';
            email.value= '';
            subject.value= '';
            message.value= '';
        } else {
            alert('Something went wrong!');
        }
    }


    //send data to backend, needs to be parsed (needs to be stringified)
    xhr.send(JSON.stringify(formData));
})



    // Typewriter effect for homepage using ES6 class
    class typeWriter {
        constructor (txtElement, words, wait=2000){
            this.txtElement= txtElement;
            this.words= words;
            this.txt= '';
            this.wordIndex= 0;
            this.wait=parseInt(wait, 10)
            this.type();
            this.isDeleting = false;
        }
    
        type(){
            // current word index
            const current= this.wordIndex % this.words.length;
    
            // get full text of current word
            const fullTxt= this.words[current];
    
            //check if in deleting state
            if(this.isDeleting){
                //Remove character
                this.txt= fullTxt.substring(0, this.txt.length - 1);
            } else {
                //add character
                this.txt= fullTxt.substring(0, this.txt.length + 1);
            }
    
            //Insert txt into element
            this.txtElement.innerHTML= `<span class="txt">${this.txt}</span>`;
    
            // Initial Type Speed
            let typeSpeed= 300;
            if (this.isDeleting){
                typeSpeed /=2;
            }
    
            //check if word is complete
            if (!this.isDeleting && this.txt === fullTxt){
                // Pause at end
                typeSpeed= this.wait;
    
                //set to true
                this.isDeleting= true;
            } else if (this.isDeleting && this.txt===''){
                this.isDeleting=false;
    
                //move to next word
                this.wordIndex++;
    
                //pause before typing again
                typeSpeed=500;
            }
    
    
            setTimeout(()=> this.type(), typeSpeed);
        }
    }
    //Init on DOM load
    document.addEventListener('DOMContentLoaded', init);
    
    // Init app
    function init(){
        const txtElement = document.querySelector('.txt-type');
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait= txtElement.getAttribute('data-wait');
    
        //Init typewriter
        new typeWriter(txtElement, words, wait);
    }
    
