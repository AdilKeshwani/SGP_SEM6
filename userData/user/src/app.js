require('dotenv').config();
const express = require("express");
const { request } = require("http");
const multer = require("multer");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
require("./db/conn");
const Register = require("./models/registers");
const uploadModel = require("./models/upload");
const auth = require("./middleware/auth"); 
const async = require('hbs/lib/async');
const port = process.env.PORT || 3000;
const filedata = uploadModel.find({});
const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views")
const fs = require("fs");
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", views_path);



const Storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
}); 

const upload = multer({
    storage : Storage
}).single('file');



/* home get */

app.get("/", auth, (req, res) => {
    if (req.user == null) {
        res.status(201).render("index", {
            post : {
                class : "hiddelogout"
            }
        });
    } else {
        res.status(201).render("index", {
            post : {
                class : "hideSigninButton"
            }
        });
    }
})

app.get("/error", (req, res) => {
    res.status(201).render("error");
});



app.get("/files", auth, (req, res) => {
    if (req.user == null) {
        res.status(201).render("files", {
            post : {
                class : "hiddelogout",
                title: 'Upload file',
                records: null,
                //avatar: "",
            }
        });
    } else {
        /* iledata.where('id').in(req.user._id).exec(function(err,data){
            if(err) throw err;
            //console.log(data); */
            const data = req.user.dataurl;
            //console.log(data);
            /* req.user.dataurl = req.user.dataurl.filter((currElement) => {
                return currElement != "abc.jpg"
            });
            await req.user.save(); */
            res.status(201).render("files", {
                post : {
                    class : "hideSigninButton",
                    title: 'Upload file',
                    records: data,
                    //avatar: req.user.avatar,
                }
           // });
        });
    }
})



app.get("/logout", auth, async(req, res) => {
    try {
        /* req.user.tokens = req.user.tokens.filter((currElement) => {
            return currElement.token != req.token;
        }) */
        req.user.tokens = [];
        res.clearCookie("jwt");
        await req.user.save();
        res.render("signup");
    } catch (error) {
        res.render("error",{
            post : {
                 data : error
            } 
         });
    }
})


app.get("/contact", auth, (req, res) => {
    if (req.user == null) {
        res.status(201).render("contact", {
            post : {
                class : "hiddelogout"
            }
        });
    } else {
        res.status(201).render("contact", {
            post : {
                class : "hideSigninButton"
            }
        });
    }
})




app.get("/about", auth, (req, res) => {
    if (req.user == null) {
        res.status(201).render("about", {
            post : {
                class : "hiddelogout"
            }
        });
    } else {
        res.status(201).render("about", {
            post : {
                class : "hideSigninButton"
            }
        });
    }
})




//signup form get and post method.
app.get("/signup", (req, res) => {
    res.render("signup")
})
app.post("/signup", async (req, res) => {
    try {
        const password = req.body.password;
        const password2 = req.body.confirmpassword;
        if(password === password2){
            const registeruser = new Register({
                //avatar : req.body.file,
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email,
                phone : req.body.phone,
                password : password,
                confirmpassword : password2,
            })
            const token = await registeruser.generateAuthToken();

            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 60000),
                httpOnly:true,
            });


            const registers = await registeruser.save();
            res.status(201).render("index", {
                post : {
                    class : "hideSigninButton"
                }
            });


        }else{
            res.render("error",{
                post : {
                     data : "password not matched"
                } 
             });
        }

    } catch (error) {
        res.render("error",{
            post : {
                 data : error
            } 
         });
    }
})


//login get and post method
app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        const isMatch = await bcrypt.compare(password, useremail.password);
        const token = await useremail.generateAuthToken();
        

        if (isMatch) {
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 600000),
                httpOnly:true,
            });
            
            res.status(201).render("index", {
                post : {
                    class : "hideSigninButton"
                }
            });
        } else {
            res.render("error",{
               post : {
                    data : "Invalid Credentials."
               } 
            });
        }

    } catch (error) {
        res.render("error",{
            post : {
                 data : "Invalid Credentials."
            } 
         });
    }
})








/* Upload post */
app.post('/upload', upload, auth, async function(req, res, next){
    const upFile = req.file.filename;    
    if (req.user == null) {
        res.render("error",{
            post : {
                 data : "Please Login"
            } 
         });

    } else {
        const array = req.user.dataurl;
        let f = true;
        for (let index = 0; index < array.length; index++) {
            if(array[index] == upFile){
                f = false
            }
        }
        if(f == true){
            req.user.dataurl = req.user.dataurl.concat(upFile);
            await req.user.save();
        }
        else{
            res.render("error",{
                post : {
                     data : "Already Exist!"
                } 
             });
        }
        
        const data = req.user.dataurl;
        /* fileDetails.save(function(err, doc){
            if(err) throw err;     
            filedata.where('id').in(req.user._id).exec(function(err,data){
                if(err) throw err;
                //console.log(data); */
                res.status(201).render("files", {
                    post : {
                        class : "hideSigninButton",
                        title: 'Upload file',
                        records: data,
                        //avatar: req.user.avatar,
                    }
                });
            //});
        //});
    }  
    
    
});
/* Upload get */

app.get('/upload', auth, function(req, res, next){
    if (req.user == null) {
        res.status(201).render("files", {
            post : {
                class : "hiddelogout",
                title: 'Upload file',
                records: null,
                avatar: "",
            }
        });
    } else {
        /* filedata.where('id').in(req.user._id).exec(function(err,data){
            if(err) throw err;
            //console.log(data); */
            const data = req.user.dataurl;
            res.status(201).render("files", {
                post : {
                    class : "hideSigninButton",
                    title: 'Upload file',
                    records: data,
                    //avatar: req.user.avatar,
                }
           // });
        });
    }
});

app.post("/delete", auth, async(req, res) => {
    try {
        const data = req.user.dataurl;
        req.user.dataurl = req.user.dataurl.filter((currElement) => {
            return currElement != req.body.btn;
        });
        await req.user.save();
        var filePath = './public/uploads/'+req.body.btn; 
        fs.unlinkSync(filePath); 
        res.status(201).render("files", {
            post : {
                class : "hideSigninButton",
                title: 'Upload file',
                records: data,
                avatar: req.user.avatar,
            }
        });
    } catch (error) {
        res.status(201).render("error",{
            post : {
                 data : "Can not Delete file."
            } 
         });
    }
})




app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})