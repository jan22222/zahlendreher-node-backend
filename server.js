



// mongodb+srv://janweitzel:Abcd+9ef@cluster0.tffujiv.mongodb.net/?retryWrites=true&w=majority

const express = require("express");

const app = express();
const db = require("./app/models");
const Role = db.role;


app.use(express.json());

db.mongoose
  .connect(`mongodb+srv://janweitzel:Abcd+9ef@cluster0.tffujiv.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
  app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    const allowedOrigins = ['https://zahlendreher-node-frontend.vercel.app/', 'https://zahlendreher-node-frontend.vercel.app/signin'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
  });
  
  

const userroutes = require("./app/routes/user.routes.js")
const authroutes = require("./app/routes/auth.routes.js")
const taskroutes = require("./app/routes/task.routes.js")
const tableroutes = require("./app/routes/table.routes.js")
const coworkerroutes = require("./app/routes/coworker.routes.js")
app.use("/", authroutes)
app.use("/users", userroutes)
app.use("/tasks", taskroutes)
app.use("/tables", tableroutes)
app.use("/coworkers", coworkerroutes)

function initial() {
  // Role.deleteMany({}).then(
  //   (res,err)=> {
  //     if (err) {
  //       console.log(err);
  //       return
  //     }
  //     console.log(res.message)
  //   }  
  // )
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "editor"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'editor' to roles collection");
      });

      new Role({
        name: "creator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'creator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});