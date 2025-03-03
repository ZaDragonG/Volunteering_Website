function getUsers() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let json = JSON.parse(this.responseText);
        let text = ""; // Start table tag
        for (let actor of json) {
          // Append each actor's first and last name as a table row
          text += `<tr><td>${actor.first_name} ${actor.last_name}</td><td>${actor.last_name}</td><td>${actor.email}</td></tr>`;
        }
        text += ""; // End table tag
      document.getElementById("bruh").innerHTML = text;
    }
  };
  xhr.open("GET", "/user", true);
  xhr.send();
}

