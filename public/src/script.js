let inputForm = document.getElementById("form");
let errorNull = document.getElementById("errorNull");

const isNonEmptyString = (value) => typeof(value) == 'string' && value.length > 0;

async function getGPTResponse(from, to, subject) {
    const response = await fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        
        body: JSON.stringify({
            from: from,
            to: to,
            subject: subject
        }),
    })

    console.log(response);
}

inputForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    console.log("Form submitted");

    let from = document.getElementById("from").textContent;
    let to = document.getElementById("to").textContent;
    let subject = document.getElementById("subjectTextBox").textContent;
    console.log(from, to, subject);

    if (!isNonEmptyString(from) || !isNonEmptyString(to) || !isNonEmptyString(subject)) {
        errorNull.classList.remove("hidden");
        return;
    } else {
        errorNull.classList.add("hidden");
        console.log("Sending request...");
        getGPTResponse(from, to, subject);
    }
});
