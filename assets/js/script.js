


const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const portfolio = document.getElementById('portfolio');


const error1 = document.getElementById('error1');
const error2 = document.getElementById('error2');
const error3 = document.getElementById('error3');
const error4 = document.getElementById('error4');
const error5 = document.getElementById('error5');
const error6 = document.getElementById('error6');




const field = document.querySelectorAll(".field2");
const checkbox = document.querySelectorAll(".checkbox");


const reviewName = document.querySelector(".reviewName");
const reviewEmail = document.querySelector(".reviewEmail");
const reviewPhone = document.querySelector(".reviewPhone");
const reviewHub = document.querySelector(".reviewHub");
const reviewLevel = document.querySelector(".reviewLevel");
const reviewChallenge = document.querySelector(".reviewChallenge");




// Validates all four input fields before allowing the user to proceed
function initiateStep1() {
    let isValid = true;

    if (fullname.value.length < 3 || fullname.value.length > 8) {
        error1.textContent = 'Name must be between 3 and 8 characters';
        isValid = false;
    } else {
        error1.textContent = ''

    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email.value)) {
        error2.innerHTML = 'Please enter a valid email address';
        isValid = false;
    } else {
        error2.textContent = ''
    }


    const regexPhone = /^\+91\s?\d{10}$/
    if (!regexPhone.test(phone.value)) {
        error3.textContent = 'Invalid Phone Number'
        isValid = false;
    } else {
        error3.textContent = ''
    }



    const regexPortfolio = /^github\.com\/[\w-]+$/

    if (!regexPortfolio.test(portfolio.value)) {
        error4.textContent =
            'Enter a valid GitHub profile link';
        isValid = false;
    } else {
        error4.textContent = ''
    }

    return isValid;

}



// Only one card can be active
let value = '';

function selectField(fld) {
    const selected = document.querySelector('.selected');

    if (selected) {
        selected.classList.remove('selected');
    }

    fld.classList.add('selected');
    value = fld.textContent;
}

field.forEach(item => {
    item.addEventListener('click', () => {
        selectField(item);
    });
});

// ensures the user has selected a skill level
function initiateStep2() {
    let valid = true;

    if (value == '') {
        error5.innerHTML = 'Please Selet one ';
        valid = false
    }
    else {
        error5.innerHTML = '';
    }
    return valid
}
;




//  checkboxes only one can be checked at a time.
let selectedBox = null;
let valueTech = '';

checkbox.forEach(box => {
    box.addEventListener('change', () => {

        if (selectedBox && selectedBox !== box) {
            selectedBox.checked = false;
        }

        if (box.checked) {
            selectedBox = box;
            valueTech = box.value;
        } else {
            selectedBox = null;
            valueTech = '';
        }
    });
});



// ensures the user has selected at least one challenge type

function initiateStep3() {

    let valid = true;
    if (valueTech == '') {
        error6.innerHTML = 'Please Selet one ';
        valid = false
    }
    else {
        error6.innerHTML = '';

    }
    return valid


}




// review all collected values from previous steps
function initiateStep4() {

    reviewName.innerHTML = fullname.value;
    reviewEmail.innerHTML = email.value;
    reviewPhone.innerHTML = phone.value;
    reviewHub.innerHTML = portfolio.value;
    reviewLevel.innerHTML = value;
    reviewChallenge.innerHTML = valueTech;
    return true;

}



const validations = {
    1: initiateStep1,
    2: initiateStep2,
    3: initiateStep3,
    4: initiateStep4,

};
// On click, reads the current step and navigates one step forward.

const btnsNext = document.querySelectorAll(".button");
const container = document.querySelectorAll(".container");

btnsNext.forEach(btn => {
    btn.addEventListener("click", () => {
        let status = Number(
            btn.closest('.container').getAttribute('data-step')
        );
        if (validations[status]()) {
            if (status === 3) {
                initiateStep4();
            }
            goToNext((status + 1))
        }
    })

})

// Hides the current step container and appear the next one

function goToNext(currentStep) {
    const next = document.querySelector(".container-" + (currentStep));
    const current = document.querySelector(".container-" + (currentStep - 1));
    if (current) {
        current.style.display = "none";
    }
    next.style.display = "block";

    if (currentStep == 5) {
        next.style.display = "flex";

    }


}

goToNext(1)

// reads the current step and navigates one step backward.
const btnsBack = document.querySelectorAll(".btn-back");

btnsBack.forEach(btn => {
    btn.addEventListener("click", () => {
        let status = Number(
            btn.closest('.container').getAttribute('data-step')
        );

        goToPrevious((status))

    })

})
// Hides the current step container and reveals the previous one
function goToPrevious(currentStep) {
    const current = document.querySelector(".container-" + (currentStep));
    const back = document.querySelector(".container-" + (currentStep - 1));
    if (back) {
        back.style.display = "block";
    }
    current.style.display = "none";

    if (currentStep == 5) {
        current.style.display = "flex";

    }

}



