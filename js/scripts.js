//get random api
let xhr; 

xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4) {
        if(xhr.status == 200) {
            var myObj = JSON.parse(xhr.responseText);

            //insert response to gallery div
            for( let i = 0; i < myObj.results.length; i ++) {

                //create card
                var card = document.createElement('div');
                    card.setAttribute('class', 'card');

                var cardImageWrap = document.createElement('div');
                    cardImageWrap.setAttribute('class', 'card-img-container');
                
                var cardImage = document.createElement('img');
                    cardImage.setAttribute('class', 'card-img');
                    cardImage.src = myObj.results[i].picture.large;

                    cardImageWrap.appendChild(cardImage);
                    card.appendChild(cardImageWrap);

                var cardInfo = document.createElement('div');
                    cardInfo.setAttribute('class', 'card-info-container');

                var cardName = document.createElement('h3');
                    cardName.setAttribute('id', 'name');
                    cardName.setAttribute('class', 'card-name cap');
                    cardName.textContent = myObj.results[i].name.first + ' ' + myObj.results[i].name.last;
                
                var cardEmail = document.createElement('p');
                    cardEmail.setAttribute('class', 'card-text');
                    cardEmail.textContent = myObj.results[i].email;

                var cardLocation = document.createElement('p');
                    cardLocation.setAttribute('class', 'card-text');
                    cardLocation.textContent = myObj.results[i].location.city + ' ' + myObj.results[i].location.state;
                
                    cardInfo.appendChild(cardName);
                    cardInfo.appendChild(cardEmail);
                    cardInfo.appendChild(cardLocation);

                //add to cards to gallery div
                document.getElementById('gallery').appendChild(card).appendChild(cardInfo);
                
            }

            modalCard(myObj);


        } else {
            console.log('There was a problem with the request.');
        }
    }
}
xhr.open('GET', 'https://randomuser.me/api/?results=12', true);
xhr.send();



document.addEventListener('DOMContentLoaded', function(e) {
    //add search box
    var sForm = document.createElement('form');
    sForm.setAttribute('action', '#');
    sForm.setAttribute('method', 'get');

    sInput = document.createElement('input');
    sInput.setAttribute('type', 'search');
    sInput.setAttribute('id', 'search-input');
    sInput.setAttribute('class', 'search-input');
    sInput.setAttribute('placeholder', 'Search...');

    sInputBtn = document.createElement('input');
    sInputBtn.setAttribute('type', 'submit');
    sInputBtn.setAttribute('value', '\ud83d\udd0d');
    sInputBtn.setAttribute('id', 'search-submit');
    sInputBtn.setAttribute('class', 'search-submit');

    sForm.appendChild(sInput);
    sForm.appendChild(sInputBtn);

    document.querySelector('.search-container').appendChild(sForm);





});


//add modal card
function modalCard(obj) {
    var cards = document.querySelectorAll('.card');

    var myObj = obj;

    //add cards click events 
    cards.forEach(function(el, i) {
        el.addEventListener('click', function(){

            //create DOM for modal
            var modalContainer = document.createElement('div');
                modalContainer.setAttribute('class', 'modal-container');

            var modal = document.createElement('div');
                modal.setAttribute('class', 'modal');

            var btnClose = document.createElement('button');
                btnClose.setAttribute('type', 'button');
                btnClose.setAttribute('id', 'modal-close-btn');
                btnClose.setAttribute('class', 'modal-close-btn');
                btnClose.innerHTML = '<strong>X</strong>';
                //add click event to close modal
                btnClose.addEventListener('click', function(){
                    document.querySelector('body').removeChild(modalContainer);
                });

            var modalInfo = document.createElement('div');
                modalInfo.setAttribute('class', 'modal-info-container');

            var modalInfoImg = document.createElement('img');
                modalInfoImg.setAttribute('class', 'modal-img');
                modalInfoImg.src = myObj.results[i].picture.large;

            var modalInfoName = document.createElement('h3');
                modalInfoName.setAttribute('id', 'name')
                modalInfoName.setAttribute('class', 'modal-name cap');
                modalInfoName.textContent = myObj.results[i].name.first + ' ' + myObj.results[i].name.last;

            var modalInfoEmail = document.createElement('p');
                modalInfoEmail.setAttribute('class', 'modal-text');
                modalInfoEmail.textContent = myObj.results[i].email;

            var modalInfoCity = document.createElement('p');
                modalInfoCity.setAttribute('class', 'modal-text');
                modalInfoCity.textContent = myObj.results[i].location.city;

            var modalInfoLine = document.createElement('hr');

            var modalInfoContact = document.createElement('p');
                modalInfoContact.setAttribute('class', 'modal-text');
                modalInfoContact.textContent = myObj.results[i].phone;

            var modalInfoAddress = document.createElement('p');
                modalInfoAddress.setAttribute('class', 'modal-text');
                modalInfoAddress.textContent = myObj.results[i].location.street + ', ' + myObj.results[i].location.state;

            var modalInfoBday = document.createElement('p');
                modalInfoBday.setAttribute('class', 'modal-text');
                //change birth date format
            var birthday = myObj.results[i].dob.date.slice(0, 10).split('-');
            var bYear = birthday.shift();
                birthday.push(bYear);
                modalInfoBday.textContent = 'Birthday : ' + birthday.join('/');

                modalInfo.appendChild(modalInfoImg);
                modalInfo.appendChild(modalInfoName);
                modalInfo.appendChild(modalInfoEmail);
                modalInfo.appendChild(modalInfoCity);
                modalInfo.appendChild(modalInfoLine);
                modalInfo.appendChild(modalInfoContact);
                modalInfo.appendChild(modalInfoAddress);
                modalInfo.appendChild(modalInfoBday);

                modal.appendChild(btnClose);
                modal.appendChild(modalInfo);
                
                modalContainer.appendChild(modal);

                document.querySelector('body').appendChild(modalContainer);

        });
    });




}



