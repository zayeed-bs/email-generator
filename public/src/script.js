let inputForm = document.getElementById("form");
let errorNull = document.getElementById("errorNull");
let responseDiv = document.getElementById("responseText");

const isNonEmptyString = (value) => typeof(value) == 'string' && value.length > 0;

async function getGPTResponse(from, to, subject) {
    try {
        const response = await fetch("/generate-email", {
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

        if (response.ok) {
            const data = await response.json(); // Parse the JSON response
            return data.response; // Return the generated email text
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }


    } catch(err) {
        console.log(err);
    }

}
  

inputForm.addEventListener("submit", async(e) => {
    e.preventDefault();
    console.log("Form submitted");

    let from = document.getElementById("from").textContent;
    let to = document.getElementById("to").textContent;
    let subject = document.getElementById("subjectTextBox").textContent;

    if (!isNonEmptyString(from) || !isNonEmptyString(to) || !isNonEmptyString(subject)) {
        errorNull.classList.remove("hidden");
        return;
    } else {
        errorNull.classList.add("hidden");
        response = await getGPTResponse(from, to, subject);
        responseDiv.innerText = response
        // typeWriter(response.response, 10)
    }
});
