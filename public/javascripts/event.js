

function getEventInfo(eventID) {
  let titleNameElement = document.querySelector('.containerContent h1');
  let orgNameElement = document.querySelector('.containerContent h3');

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let json = JSON.parse(this.responseText);

      // Assuming json is an array and we need the first element
      if (json.length > 0) {
        let eventData = json[0];

        let titleText = eventData.event_name;
        let orgText = eventData.organisation_name;
        let timeText = "";
        let descText = "";

        let time = new Date(eventData.event_date).toLocaleTimeString();
        let day = new Date(eventData.event_date).toLocaleDateString('en-US', { weekday: 'long' });
        let date = new Date(eventData.event_date).toLocaleDateString('en-US');

        timeText = "<p>📍" + eventData.address + "</p> <p>⏰ " + time + ", " + day + ", " + date + "</p> <p>✉️ " + eventData.contact_email + "</p>";
        descText += "<h1>EVENT DESCRIPTION</h1> <hr> <p>" + eventData.event_description + "</p>";

        titleNameElement.innerHTML = titleText;
        orgNameElement.innerHTML = orgText;
        document.getElementById("description").innerHTML = descText;
        document.getElementById("conText").innerHTML = timeText;
      }
    }
  };
  xhr.open("GET", `/eventPageData?eventID=${eventID}`, true);
  xhr.send();
}



function addRSVP() {

  const urlParams = new URLSearchParams(window.location.search);
  const eventID = urlParams.get('eventID');

  const data = {
    event_id: eventID
  };

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        alert("RSVP successful");

      } 
    }
  };

  xhr.open("POST", "/rsvpUsers", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(data));
}


window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const eventID = urlParams.get('eventID');
  if (eventID) {
    getEventInfo(eventID);
  }
});

