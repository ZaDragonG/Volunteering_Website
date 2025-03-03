
function loadLastVisit() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("navBar").innerHTML = this.responseText;

        }
    };
    xhttp.open("GET", "/last.txt", true);
    xhttp.send();

    var footerRequest = new XMLHttpRequest();
    footerRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Update footer with received HTML
            document.getElementById("footer").innerHTML = this.responseText;
        }
    };
    footerRequest.open("GET", "/footer.txt", true);
    footerRequest.send();
}


window.onload = loadLastVisit;

