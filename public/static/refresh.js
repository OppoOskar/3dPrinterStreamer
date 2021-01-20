//let isRunning = data.state == "Printing" || "Pausing";

function getColorFromState(param) {
    switch(param) {
    case 'Printing':
        return 'green';
    case 'Pausing', 'Operational':
        return 'orange';
    case 'Cancelling', 'Error', 'Offline':
        return 'red';
    default:
        return 'red';
    }
  }

function formatTime(seconds) {
    if(seconds == null)
    {
        return "0 min";
    }
    let minutes = Math.floor(seconds/60);
    if(minutes >= 1)
    {
      let hours = Math.floor(minutes/60);
      if(hours >= 1)
      {
        let days = Math.floor(hours/24);
        if(days >= 1)
        {
          return (days + "d, " + hours%24 + "h, " + minutes%60 + "m")
        }
        return (hours + "h, " + minutes%60 + "m")
      }
      return (minutes + "m");
    }
    return (seconds + "s")
  }

function setTextData(data) {
    //console.log(data);
    let state_border_color = document.querySelectorAll("#state_border_color");
    let state_background_color = document.querySelectorAll("#state_background_color");

    if(state_border_color) {
        state_border_color.forEach(element => {
            element.style.borderColor = getColorFromState(data.state);
        });
    }

    if(state_background_color) {
        state_background_color.forEach(element => {
            element.style.backgroundColor = getColorFromState(data.state);
        });
    }

    let state_text = document.querySelectorAll("#state_text");
    if(state_text) {
        state_text.forEach(element => {
            element.innerHTML = data.state;
        });
    }

    let currently_printing = document.querySelectorAll("#currently_printing");
    if(currently_printing) {
        currently_printing.forEach(element => {
            element.innerHTML = data.job.file.name;
        });
    }

    let time_left = document.querySelectorAll("#time_left");
    if(time_left) {
        time_left.forEach(element => {
            element.innerHTML = formatTime(data.progress.printTimeLeft);
        });
    }

    let total_print_time = document.querySelectorAll("#total_print_time");
    if(total_print_time) {
        total_print_time.forEach(element => {
            element.innerHTML = formatTime(data.job.estimatedPrintTime);
        });
    }

    let progress = document.querySelectorAll("#progress");
    if(progress) {
        progress.forEach(element => {
            element.innerHTML = Math.floor(data.progress.completion);
        });
    }
}





function reload() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            setTextData(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "/api/printerdata", true);
    xhttp.send();


    //document.getElementById('textIframe').contentWindow.location.reload();
    setTimeout(reload, 5000);
}

document.onload = reload();