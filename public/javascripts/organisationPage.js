function getOrgInfo(orgID) {
  let titleNameElement = document.querySelector('.containerContent h1');
  let orgNameElement = document.querySelector('.containerContent h3');

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let json = JSON.parse(this.responseText);

      if (json.length > 0) {
        let orgData = json[0]; // Since the query returns one organization based on the orgID

        let titleText = orgData.organisation_name;
        let orgText = orgData.first_name + " " + orgData.last_name;
        let timeText = "<p>" + orgData.organisation_description + "</p>";

        titleNameElement.innerHTML = titleText;
        orgNameElement.innerHTML = orgText + timeText;

      }
    }
  };
  xhr.open("GET", `/orgsPageData?orgID=${orgID}`, true);
  xhr.send();
}

function joinOrganisation() {
  const urlParams = new URLSearchParams(window.location.search);
  const orgID = urlParams.get('orgID');

  if (!orgID) {
    return;
  }

  const data = {
    orgID: orgID
  };

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        alert("Join successful");
      } else {
        console.log("Join failed with status: " + this.status);
      }
    }
  };

  xhr.open("POST", "/joinOrganisation", true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(data));
}

  window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orgID = urlParams.get('orgID');
    if (orgID) {
      getOrgInfo(orgID);
    }
  });



