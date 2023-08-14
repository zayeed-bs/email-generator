let inputForm = document.getElementById("form");
let errorNull = document.getElementById("errorNull");
let errorUnknown = document.getElementById("errorUnknown");
let responseDiv = document.getElementById("responseText");
let summary = document.getElementById("summaryTextBox")

const isNonEmptyString = (value) => typeof(value) == 'string' && value.length > 0;

async function getGPTResponse(summary) {
    try {
        const response = await fetch("/generate-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                summary: summary
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
}


inputForm.addEventListener("submit", async(e) => {
    e.preventDefault();

    document.getElementById("submitButton").disabled = true;
    document.getElementById("submitButton").innerText = "...";

    console.log("Form submitted");

    if (!isNonEmptyString(summary.value)) {
        errorNull.classList.remove("hidden");
        return;
    } else {
        errorNull.classList.add("hidden");
        response = await getGPTResponse(summary.value);
        responseDiv.innerText = response
    }
});

summary.addEventListener("input", () => {
    document.getElementById("charCount").innerText = `${summary.value.length}/200`;
})