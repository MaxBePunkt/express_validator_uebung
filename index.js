const express = require("express");
const formidable = require("formidable");
const PORT = 1818;
const datas = require("./data.json");
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
let allLink = false;
let newLink = false;
let randomData = [...datas];
app.get("/", (req, res) => {
  res.render("pages/home", { datas, allLink: true, newLink });
});
app.get("/new", (req, res) => {
  res.render("pages/newArticle", { randomData, newLink: true, allLink });
});
app.get("/article/:id", (req, res) => {
  const id = req.params.id;
  const thisArticle = datas[id];
  res.render("pages/detailArticle", {
    randomData,
    thisArticle,
    allLink,
    newLink,
  });
});

app.post("/new", (req, res) => {
  const form = formidable({ uploadDir: __dirname + "/public/img/" });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      res.send({ status: "error", err });
    } else {
      const neuerUser = {
        title: fields.title,
        url: fields.url,
        author: fields.author,
        author_bild: fields.authorPic,
        body: files.textarea,
      };
      datas.push(neuerUser);
      res.redirect("/new");
    }
  });
});

app.listen(PORT, () => console.log("listening on port", PORT));
