function reload() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "", true);
    xhttp.send();
}


    document.getElementById('textIframe').contentWindow.location.reload();
    //setTimeout(reload, 1000);
}

setTimeout(reload, 1000);