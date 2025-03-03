
filterSelection("all") ;// Execute the function and show all columns
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });

}

function getEvents() {
  const xhr = new XMLHttpRequest();
  var eventID = 1;
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let json = JSON.parse(this.responseText);
        let text = "";
         for (let u of json) {
          let limitedEventName = u.event_name.substring(0, 15);
          text += "<div class='column " + u.event_type +"'> <div class='content' onclick='getNewPage(" + eventID + ")'> <img src='/images/paul-earle-wVjd0eWNqI8-unsplash.jpg' alt='Mountains' style='width:100%'>";
          text += `<h4>${limitedEventName} </h4> <p>${u.event_date}</p> <p>${u.event_description}</p>`;
          text += ' </div> </div>';
          eventID++;
      }

        document.getElementsByClassName("row")[0].innerHTML = text;
    }
  };
  xhr.open("GET", "/allEventData", true);
  xhr.send();
}

function getUpcomingEvents() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let json = JSON.parse(this.responseText);
        let text = "<h1>EVENTS THIS WEEK</h1><hr>";
         for (let u of json) {
          let time = new Date(u.event_date).toLocaleTimeString();
          let day = new Date(u.event_date).toLocaleDateString('en-US', { weekday: 'long' });
          let date = new Date(u.event_date).toLocaleDateString('en-US');
          text += '<div class = "upEvent" onclick="getNewPage(' + u.event_id + ')"><h2>' + u.event_name + '</h2>';
          text += '<p>' + date +  ' ' + day + ' ' + time + '</p>';
          text += '<p>' + u.event_description + '</p></div>';
      }

        document.getElementsByClassName("upEvents")[0].innerHTML = text;
    }
  };
  xhr.open("GET", "/filteredEvents", true);
  xhr.send();
}

function getNewPage(eventID) {
  // Example event ID
   window.location.href = "/event.html?eventID=" + eventID;
 }


window.addEventListener('load', getEvents);
window.addEventListener('load', getUpcomingEvents);

window.addEventListener('load', function() {

  var defaultOpenButton = document.getElementById("defaultOpen"); // Replace with the actual ID of your "show all" button

  defaultOpenButton.click();

});