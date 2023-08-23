let inputForm = document.getElementById("form");
let errorNull = document.getElementById("errorNull");
let errorUnknown = document.getElementById("errorUnknown");
let responseDiv = document.getElementById("responseText");
let summary = document.getElementById("summaryTextBox")

const isNonEmptyString = (value) => typeof(value) == 'string' && value.length > 0;

function sanitizeInput(input) {
    const unsafeCharsPattern = /[<>&\/]/g;

    return input.replace(unsafeCharsPattern, "");
}

async function getGPTResponse(summary) {
    try {
        const response = await fetch("/generate-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                summary: sanitizeInput(summary)
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
        errorUnknown.classList.remove("hidden");
    }
}
  
function copy() {
    var copyText = document.getElementById("responseText").innerText;
    navigator.clipboard.writeText(copyText);

    document.getElementById("copyIcon").src = "src/images/check.png";
    document.getElementById("copyText").innerText = "";
}

function openHelpMenu() {
   let helpMenu = document.getElementById("helpMenu")

   helpMenu.classList.remove("hidden");

   document.getElementById('helpMenuContent').animate([
    { opacity: 0, transform: "scale(0.5)" },
    { opacity: 1, transform: "scale(1)" }
   ], {
        duration: 100,
        easing: "ease-in"
    })
}

function closeHelpMenu() {
    document.getElementById('helpMenuContent').animate([
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "scale(0.5)" }
       ], {
            duration: 100,
            easing: "ease-in"
        }).onfinish = () => {
            document.getElementById("helpMenu").classList.add("hidden");
        }

}

function disabledSubmitButton(bool) {
    document.getElementById("submitButton").disabled = bool;
    document.getElementById("submitButton").innerText = bool ? "..." : "GENERATE";
}


inputForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    disabledSubmitButton(true);

    console.log("Form submitted");

    if (!isNonEmptyString(summary.value)) {
        errorNull.classList.remove("hidden");
        return;
    } else {
        errorNull.classList.add("hidden");
        response = await getGPTResponse(summary.value)
        disabledSubmitButton(false);
        responseDiv.innerText = response
    }
});

summary.addEventListener("input", () => {
    document.getElementById("charCount").innerText = `${summary.value.length}/200`;
})