let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1;}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000);
}

function orgRoute(){
  window.location.href = "/events.html";
}

function eventRoute(){
  window.location.href = "/events.html";
}

function getEvents() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let json = JSON.parse(this.responseText);
      let text = "";
      // Limit to the first four events
      let limitedEvents = json.slice(0, 4);
      for (let u of limitedEvents) {
        let limitedEventName = u.event_name.substring(0, 30);
        text += "<div class='event'> <img src='/images/joel-muniz-A4Ax1ApccfA-unsplash.jpg' alt='event'>";
        text += `<h3>${limitedEventName}</h3> <p>${u.event_date}</p> <button class="event-button" onclick = "getNewPage(${u.event_id})">View Event</button>`;
        text += " </div> ";
      }
      document.getElementsByClassName("event-box")[0].innerHTML = text;
    }
  };
  xhr.open("GET", "/allEventData", true);
  xhr.send();
}


function getNewPage(eventID) {
 // Example event ID
  window.location.href = "/event.html?eventID=" + eventID;
}


document.addEventListener("DOMContentLoaded", function() {
  getEvents();
});



