function formSubmit(event) {
    var url = "/parser";
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function() { // request successful
        // we can use server response to our request now
        const paragraph = document.getElementById("expression_value");
        paragraph.innerHTML = request.responseText;
        console.log(request.responseText);
    };

    request.onerror = function() {
        // request failed
        console.log("Request failed");
    };
    request.send(new FormData(event.target)); // create FormData from the form that triggered the event
    event.preventDefault();
}

// and you can attach form submit event like this for example
function attachFormSubmitEvent(formId){
    document.getElementById(formId).addEventListener("submit", formSubmit);
}

attachFormSubmitEvent("sci_expr_id");