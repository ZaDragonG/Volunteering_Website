
function loadAdminDash(){
    window.location.href = 'adminDashboard.html';
}

function loadManagerDash() {

  window.location.href = 'managerDashboardTest.html';
}

  function loadUserDash() {

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      let text='<button  onClick = loadManagerDash()>Manager Dashboard</button>';
      if (this.readyState === 4 && this.status === 200) {
        document.getElementById("content").innerHTML = this.responseText;
        document.getElementById("manButton").innerHTML = text;
      }
    };
    xhr.open("GET", "/userDashboard", true);
    xhr.send();
  }


  function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

  function getUsers() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let json = JSON.parse(this.responseText);
        let text = "<table class='content-table'> <thead> <tr> <th>Name</th> <th>Username</th> <th>Email</th> <th>Join Date</th> </tr> </thead> </table><tbody>";
        for (let u of json) {

          text += `<tr>
                     <td>${u.first_name || ''} ${u.last_name || ''}</td>
                     <td>${u.username || ''}</td>
                     <td>${u.email || ''}</td>
                     <td>${u.create_date || ''}</td>
                   </tr>`;
        }
        text += "</tbody>";
        document.getElementById("bruh").innerHTML = text;
      }
    };
    xhr.open("GET", "/user", true);
    xhr.send();
  }


  function getEvents() {
    var elementId = 1;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let json = JSON.parse(this.responseText);
            let text = "<h1>UPCOMING EVENTS</h1>";
            text += "<hr>";
            for (let u of json) {
              text += `<div class='upEvent'>`;
              text += `<h2>${u.event_name}</h2>
                       <p>${u.event_date}</p>
                       <p>${u.event_description}</p>
                       <div id='${elementId}'></div>
                       <button onclick='getRSVPs(${u.event_id}, ${elementId})'>VIEW MORE</button></div>`;
                elementId++;
            }

            document.getElementById("upEvents").innerHTML = text;
        }
    };
    xhr.open("GET", "/eventData", true);
    xhr.send();
}

function getRSVPs(eventID, elementID) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let json = JSON.parse(this.responseText);
            let text = "<table>";
            for (let u of json) {
                text += "<tr>";
                text += `<td>${u.first_name}</td><td>${u.last_name}</td></tr>`;
            }
            text += "</table>";
            document.getElementById(elementID).innerHTML = text;
        }
    };
    xhr.open("POST", "/RSVPData", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify({ eventID: eventID }));
}


  function getPosts() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let json = JSON.parse(this.responseText);
          let text = "";
          for (let u of json) {
            text+="<div class='Posts'> ";
            // Append each actor's first and last name as a table row
            text += `<h1>${u.post_title}</h1> <h5 style = "font-weight:bold";>${u.author_type}, ${u.post_date}</h5> <p>${u.post_content}</p></div>`;
          }

        document.getElementById("allPosts").innerHTML = text;
      }
    };
    xhr.open("GET", "/postData", true);
    xhr.send();
  }


function createPostPage(){
  window.location.href = 'createPost.html';
}