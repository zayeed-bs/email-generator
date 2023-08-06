let inputForm = document.getElementById("form");
let errorNull = document.getElementById("errorNull");

const isNonEmptyString = (value) => typeof(value) == 'string' && value.length > 0

inputForm.addEventListener("submit", e => {
    e.preventDefault();

    let from = document.getElementById("from").innerText;
    let to = document.getElementById("to").innerText;
    let subject = document.getElementById("subjectTextBox").innerText;

    if(from.trim() == "" || to.trim() == "" || subject.trim() == "") {
        errorNull.classList.remove("hidden");
    } else {
        errorNull.classList.add("hidden");
    }

    console.log(subject);
})