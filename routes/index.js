var express = require('express');
var router = express.Router();
const port = 8080;
const bodyParser = require('body-parser');


const CLIENT_ID = '439514934387-v5knb6rh1d5iu7m8g0al1vbqos2uparl.apps.googleusercontent.com';
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

var visitCount = 0;
var sessionUsername;
var isUserAdmin = false;
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/events', (req, res) => {
    res.sendFile('/workspaces/24S1_WDC_UG_Group_96/public/events.html');
});

router.get('/last.txt', function (req, res, next) {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        </head>
        <body>
        <header class="header">
        <a href="index.html"class="logo">AW</a>
        <nav class="navbar">
            <a href="organisation.html">Volunteer</a>
            <a href="events.html">Events</a>
            <a href="about.html">About</a>
            <div class="dropdown">
                <button class="dropbtn" onclick="myFunction()">Profile
                  <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-content" id="myDropdown">
                  <a href="userDashboard2.html">My Dashboard</a>
                  <a href="organisation.html">My Organisation</a>
                  <a href="profileSettings.html">Profile Settings</a>
            </div>
            <a href="login.html">Login</a>
            </div>
        </nav>
    </header>
        </body>
        </html>
    `);
});

router.get('/footer.txt', function (req, res, next) {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        </head>
        <body>
        <footer>
        <div class="footer">
            <div class="footer-logo">
                <h1>AW</h1>
            </div>
            <div class="footer-1">
                <h2>Quick Links</h2>
                <ul class="list">
                    <li><a href="/organisation.html">Volunteer</a></li>
                    <li><a href="/about.html">About</a></li>
                    <li><a href="/events.html">Events</a></li>
                    <li><a href="/login.html">Login</a></li>
                </ul>
            </div>
            <div class="footer-3">
                <h2>Extra</h2>
                <ul class="list">
                    <li><a href="#">Terms and Conditions</a></li>
                    <li><a href="">Privacy Policy</a></li>
                </ul>
            </div>
            <div class="footer-2">
                <h2>Contact Us</h2>
                <p>Email: eg@gmail.com</p>
                <p>Phone: 03948483939</p>
                <p>Address: your mums house</p>
            </div>
        </div>
        <div class="stamp">
            <p>&copy 2024 AW . All rights reserved</p>
        </div>
    </footer>
        </body>
        </html>
    `);
});

router.get('/volunteer.html', function (req, res, next) {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        </head>
        <body>

        </body>
        </html>
    `);
});

router.get("/actors", (req, res, next) => {
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      conn.query(
        "SELECT * FROM events;",
        function (err, results, fields) {

          res.json(results);
        }
      );
    });
  });

  var org = 1;
  router.get("/user", (req, res, next) => {
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      conn.query(
        "SELECT * from WHERE organisation_id = ?;", [org],
        function (err,results, fields) {

          res.json(results);
        }
      );
    });
  });

  router.get("/allUserData", (req, res, next) => {
    var eventID = req.query.eventID;
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      conn.query(
        "SELECT user_id, first_name, last_name, email FROM user;",
        function (err, results, fields) {

          res.json(results);
        }
      );
    });
  });


  router.get("/eventPageData", (req, res, next) => {
    var eventID = req.query.eventID;
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      conn.query(
        "SELECT event_date, event_name, organisation_name, address, event_description FROM events INNER JOIN organisation ON events.organisation_id = organisation.organisation_id INNER JOIN address ON events.address_id = address.address_id WHERE event_id = ?;",
        [eventID],
        function (err, results, fields) {

          res.json(results);
        }
      );
    });
  });


  router.get("/eventData", (req, res, next) => {
    org = req.session.user;
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      conn.query(
        "SELECT event_name, event_date, event_description, event_id FROM events INNER JOIN organisation ON events.organisation_id = organisation.organisation_id INNER JOIN user on user.organisation_id = organisation.organisation_id WHERE user.username = 'alicej';", [sessionUsername],
        function (err,results, fields) {

          res.json(results);
        }
      );
    });
  });

  router.get("/postData", (req, res, next) => {
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      conn.query(
        "SELECT post_title, author_type, post_date, post_content FROM posts INNER JOIN organisation ON posts.organisation_id = organisation.organisation_id INNER JOIN user ON user.organisation_id = organisation.organisation_id WHERE user.username = 'alicej'", [sessionUsername],
        function (err,results, fields) {

          res.json(results);
        }
      );
    });
  });

  router.get("/getUserRSVPData", (req, res, next) => {
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      conn.query(
        "SELECT events.event_id, events.event_name, events.event_description FROM events INNER JOIN rsvp ON events.event_id = rsvp.event_id INNER JOIN user ON user.user_id = rsvp.user_id WHERE user.username = '?'", [sessionUsername],
        function (err,results, fields) {

          res.json(results);
        }
      );
    });
  });

  router.get("/filteredEvents", (req, res, next) => {
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      conn.query(
        "SELECT events.event_id, events.event_name, events.event_description, events.event_date FROM events WHERE WEEK(events.event_date) = WEEK(CURDATE()) AND YEAR(events.event_date) = YEAR(CURDATE()) LIMIT 3;",
        function (err,results, fields) {

          res.json(results);
        }
      );
    });
  });

  router.get("/rsvpedEvents", (req, res, next) => {
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      conn.query(
        "SELECT events.event_id, events.event_name, events.event_description, events.event_date FROM events INNER JOIN rsvp ON events.event_id = rsvp.event_id INNER JOIN user ON user.user_id = rsvp.user_id WHERE user.username = ?;",[sessionUsername],
        function (err,results, fields) {

          res.json(results);
        }
      );
    });
  });

  router.get("/publicPostEvents", (req, res, next) => {
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      conn.query(
        "SELECT post_title, post_content, author_type, post_date from posts where visibility = 'public';",
        function (err,results, fields) {

          res.json(results);
        }
      );
    });
  });

  router.get("/userInfo", (req, res, next) => {
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      conn.query(
        "SELECT user.;",
        function (err,results, fields) {

          res.json(results);
        }
      );
    });
  });




  router.post("/createEvent", (req, res, next) => {
    const { address_id, organisation_id, manager_id, event_name, event_date, event_type, event_description } = req.body;

    if (!address_id || !organisation_id || !manager_id || !event_name || !event_date || !event_type || !event_description) {
      res.status(400).send("All fields are required");
      return;
    }

    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      const query = `
        INSERT INTO events (address_id, organisation_id, manager_id, event_name, event_date, event_type, event_description)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      conn.query(query, [address_id, organisation_id, manager_id, event_name, event_date, event_type, event_description], function (err, results, fields) {
        conn.release();  // Release the connection back to the pool

        if (err) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
    });
  });


  router.post("/createPosts", (req, res, next) => {
    const { organisation_id, author_type, author_id, post_title, post_content, visibility, post_date} = req.body;

    if (!organisation_id || !author_type || !author_id || !post_title || !post_content || !visibility || !post_date) {
      res.status(400).send("All fields are required");
      return;
    }

    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      const query = `
        INSERT INTO posts (organisation_id, author_type, author_id, post_title, post_content, visibility, post_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      conn.query(query, [organisation_id, author_type, author_id, post_title, post_content, visibility, post_date], function (err, results, fields) {
        conn.release();  // Release the connection back to the pool

        if (err) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
    });
  });



router.post("/updateUser", (req, res, next) => {
    const { username, firstname, lastname, email, password } = req.body;
    var userID = 3;
    if (!username || !firstname || !lastname || !email || !password) {
        res.status(400).send("All fields are required");
        return;
    }

    req.pool.getConnection(function (err, conn) {
        if (err) {
            res.sendStatus(500);
            return;
        }

        const query = `
            UPDATE user SET username = ?, first_name = ?, last_name = ?, email = ?, password = ?
            WHERE user_id = ?
        `;

        conn.query(query, [username, firstname, lastname, email, password, userID], function (err, results, fields) {
            conn.release();  // Release the connection back to the pool

            if (err) {
                res.sendStatus(500);
                return;
            }

            res.sendStatus(200);
        });
    });
});

router.post("/makeManager", (req, res, next) => {

  const userID = req.body.userID;
  req.pool.getConnection(function (err, conn) {
      if (err) {
          res.sendStatus(500);
          return;
      }

      const query = `INSERT INTO managers (first_name, last_name, email, create_date, address_id) SELECT first_name, last_name, email, NOW(), address_id FROM user WHERE user_id = ?;`;

      conn.query(query, [userID], function (err, results, fields) {
          conn.release();  // Release the connection back to the pool

          if (err) {
              res.sendStatus(500);
              return;
          }

          res.sendStatus(200);
      });
  });
});



  router.post("/createPosts", (req, res, next) => {
    const { organisation_id, author_type, author_id, post_content, visibility, post_date} = req.body;

    if (!organisation_id || !author_type || !author_id || !post_content || !visibility || !post_date) {
      res.status(400).send("All fields are required");
      return;
    }

    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      const query = `
        INSERT INTO posts (organisation_id, author_type, author_id, post_content, visibility, post_date)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      conn.query(query, [organisation_id, author_type, author_id, post_content, visibility, post_date], function (err, results, fields) {
        conn.release();  // Release the connection back to the pool

        if (err) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
    });
  });


  router.post("/rsvpUsers", (req, res, next) => {

    const eventId = req.body.event_id;
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }


      const query = `
       INSERT INTO rsvp (user_id, event_id)
VALUES ((SELECT user_id FROM user WHERE username = ?), ?)`;

      conn.query(query, [sessionUsername, eventId], function (err, results, fields) {
        conn.release();

        if (err) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
    });
  });


  router.post("/joinOrganisation", (req, res, next) => {
    const orgID = req.body.orgID;
   // Ensure session management middleware sets this correctly

    if (!orgID) {
      res.sendStatus(400); // Bad Request if orgID or username is missing
      return;
    }

    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      const query = `UPDATE user SET organisation_id = ? WHERE username = ?;`;

      conn.query(query, [orgID, sessionUsername], function (err, results, fields) {
        conn.release();

        if (err) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
    });
  });


  router.post("/createOrganisation", (req, res, next) => {
    const { organisation_name, organisation_description, address_id, manager_id } = req.body;

    if (!organisation_name || !organisation_description || !address_id || !manager_id) {
      res.status(400).send("All fields are required");
      return;
    }

    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }

      const query = `
        INSERT INTO organisation (organisation_name, organisation_description, address_id, manager_id)
        VALUES (?, ?, ?, ?)
      `;

      conn.query(query, [organisation_name, organisation_description, address_id, manager_id], function (err, results, fields) {
        conn.release();  // Release the connection back to the pool

        if (err) {
          res.sendStatus(500);
          return;
        }

        res.sendStatus(200);
      });
    });
  });


  router.get("/isAdmin", (req, res, next) => {

    res.send(isUserAdmin);
  });


  router.get("/adminDashboard", (req, res, next) => {
    res.sendFile('/workspaces/24S1_WDC_UG_Group_96/public/adminDashboard.html');
  });

  router.get("/adminDashboard", (req, res, next) => {
    res.sendFile('/workspaces/24S1_WDC_UG_Group_96/public/adminDashboard.html');
  });


  router.get("/userDashboard", (req, res, next) => {
    res.sendFile('/workspaces/24S1_WDC_UG_Group_96/public/userDashboard.html');
  });


  router.get("/allEventData", (req, res, next) => {
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      conn.query(
        "SELECT event_name, event_date, event_id, event_description, event_type from events",
        function (err,results, fields) {

          res.json(results);
        }
      );
    });
  });

  router.get("/allOrganisationData", (req, res, next) => {
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      conn.query(
        "SELECT * from organisation ",
        function (err,results, fields) {

          res.json(results);
        }
      );
    });
  });

  router.get("/orgsPageData", (req, res, next) => {
    var orgID = req.query.orgID;
    req.pool.getConnection(function (err, conn) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      conn.query(
        "SELECT organisation_name, first_name, last_name, organisation_description FROM organisation INNER JOIN managers ON managers.manager_id = organisation.manager_id WHERE organisation_id = ?;",
        [orgID],
        function (err, results, fields) {
          if (err) {
            res.sendStatus(500);
            return;
          }

          res.json(results);
        }
      );
    });
  });


router.post("/RSVPData", (req, res, next) => {
  const eventId = req.body.eventID;
  req.pool.getConnection(function (err, conn) {
      if (err) {
          res.sendStatus(500);
          return;
      }
      conn.query(
          "SELECT first_name, last_name FROM rsvp INNER JOIN user ON user.user_id = rsvp.user_id WHERE rsvp.event_id = ?;",
          [eventId],
          function (err, results, fields) {
              if (err) {
                  res.sendStatus(500);
                  return;
              }

              res.json(results);
          }
      );
  });
});

router.get('/username', (req, res, next) => {
  res.send(sessionUsername);
});

router.post('/login',async function(req,res,next){
  if ('client_id' in req.body){
      const ticket = await client.verifyIdToken({
          idToken: req.body.credential,
          audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      const userid = payload['sub'];
      req.session.user = payload['email'];
      res.send(JSON.stringify(req.session.user));
      console.log(payload['email']);
      // If the request specified a Google Workspace domain:
      // const domain = payload['hd'];
      res.end();
  }else if ('username' in req.body && 'password' in req.body) {
      req.pool.getConnection(function(err,connection){
          if (err){
              console.log(err);
          }
          let query = "SELECT `user_id`,`username`,`email` FROM user WHERE username =? AND password = ? ";
          connection.query(query,[req.body.username,req.body.password], function(err,rows,fields){
              connection.release();
              if (err){
                  console.log(err);
                  return;
              }
              console.log(JSON.stringify(rows));
              if (rows.length >0){
                  //User exists
                  req.session.user = req.body.username;
                  sessionUsername = req.body.username;
                  res.send(JSON.stringify(req.session.user));
              }else{
                  //No user
                  res.sendStatus(401);
              }
          });
      });
  }else{
      res.sendStatus(401);
  }
});
router.post('/adminLogin',function(req,res,next){
  if ('username' in req.body && 'password' in req.body) {
      req.pool.getConnection(function(err,connection){
          if (err){
              console.log(err);
          }
          let query = "SELECT `admin_id`,`first_name`,`last_name` FROM admin WHERE username =? AND password = ? ";
          connection.query(query,[req.body.username,req.body.password], function(err,rows,fields){
              connection.release();
              if (err){
                  console.log(err);
                  return;
              }
              console.log(JSON.stringify(rows));
              if (rows.length >0){
                  //User exists
                  req.session.user = req.body.username;
                  sessionUsername = req.body.username;
                  isUserAdmin = true;
                  res.send(JSON.stringify(req.session.user));

              }else{
                  //No user
                  res.sendStatus(401);
              }
          });
      });
  }else{
      res.sendStatus(401);
  }
});

router.post('/signup',function(req,res,next){
  if ('username' in req.body && 'password' in req.body) {
      req.pool.getConnection(function(err,connection){
          if (err){
              console.log(err);
          }
          let query = "INSERT INTO  user(first_name,last_name,username,password,create_date,address_id) VALUES ('NULL','NULL',?, ?,'2024-06-03 12:00:00',1)";
          connection.query(query,[req.body.username,req.body.password,req.body.username], function(err,rows,fields){
              connection.release();
              if (err){
                  console.log(err);
                  return;
              }
              res.json(req.session.user);
          });
      });
  }else{
      res.sendStatus(401);
  }
});

router.post('/logout',function(req,res,next){
  if ('username' in req.session){
      delete req.session.username;
      res.end();
  }else{
      res.sendStatus(403);
  }
});
module.exports = router;