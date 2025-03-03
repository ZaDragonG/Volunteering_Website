var user_tag;
let user = false;
let isAdmin = false;

function login(){
    let logindata = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };
    let req = new XMLHttpRequest();
    req.onreadystatechange=function(){
        if (req.readyState==4 && req.status==200){
            window.location.replace("/userDashboard2.html");
            var json = JSON.parse(this.responseText);
            user_tag = json.user_id;
            var user = true;
        }else if(req.readyState==4 && req.status==401){
            //alert('Login Failed');
        }
    };
    req.open('POST','/login');
    req.setRequestHeader('Content-Type','application/json');
    req.send(JSON.stringify(logindata));
}

function adminLogin(){
    let admindata = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };
    let req = new XMLHttpRequest();
    req.onreadystatechange=function(){
        if (req.readyState==4 && req.status==200){
            window.location.replace("/userDashboard2.html");
            var json = JSON.parse(this.responseText);
            user_tag = json.user_id;
            isAdmin = true;
        }else if(req.readyState==4 && req.status==401){
            //alert('Login Failed');
        }
    };
    req.open('POST','/adminLogin');
    req.setRequestHeader('Content-Type','application/json');
    req.send(JSON.stringify(admindata));
}

function signup(){
    let logindata = {
        username: document.getElementById('email').value,
        password: document.getElementById('signup_pass').value,
    };
    if (document.getElementById('signup_pass').value !== document.getElementById('signup_confirm').value){
        alert('Passwords dont match');
        return;
    }
    let req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if (req.readyState==4 && req.status==200){
            document.getElementById('text').innerHTML = "Signup Successful";
            window.location.replace("/userDashboard2.html");
        }else if(req.readyState==4 && req.status==401){
            alert('Login Failed');
        }
    };
    req.open('POST','/signup');
    req.setRequestHeader('Content-Type','application/json');
    req.send(JSON.stringify(logindata));
}

function logout(){
    let req = new XMLHttpRequest();
    req.onreadystatechange=function(){
        if (req.readyState==4 && req.status==200){
            alert('Logged Out');
            window.location.replace("/index.html");
        }else if(req.readyState==4 && req.status==401){
            alert('Not logged in');
        }
    };
    req.open('POST','/logout');
    req.send();
}

function googleLogin(response){
    let logindata = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };
    let req = new XMLHttpRequest();
    req.onreadystatechange=function(){
        if (req.readyState==4 && req.status==200){
            window.location.replace("/userDashboard2.html");
            var json = JSON.parse(this.responseText);
            user_tag = json.user_id;
            var user = true;
        }else if(req.readyState==4 && req.status==401){
            //alert('Login Failed');
        }
    };
    req.open('POST','/login');
    req.setRequestHeader('Content-Type','application/json');
    req.send(JSON.stringify(response));

}
