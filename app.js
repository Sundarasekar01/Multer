const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const connectDB = require("./server/connect");
const gallery = require("./server/model"); 
const dis = require("./server/multer")

connectDB();



app.set("view engine", "ejs");
app.use(express.static("public"));
const fs = require("fs");


app.get("/", (req, res) => {
  res.render("./../index.ejs",(message=''));
});


app.post("/", dis.uploads.array("images", 5), async (req, res) => {
  try {
    if (req.files.length > 0) {
      const imagePaths = req.files.map((file) => file.filename);
      const title = req.body.title;

      const galleryData = new gallery({
        title: title,
        image: imagePaths,
      });

      await galleryData.save();
      res.redirect("/");
    } else {
      res.render("index", {
        message: "Please select at least one image.",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.render("./../index.ejs", { message: "An error occurred." });
  }
});


app.get("/show", async (req, res) => {
    try {
      const galleryData = await gallery.find();
      res.render("./../show", { gallery: galleryData });
    } catch (error) {
      console.log(error.message);
      res.render("./../show", { gallery: [], message: "An error occurred." });
    }
  });
  
  app.get("/show/:imageName", (req, res) => {
    const imagePath = path.join(__dirname,"gallery", req.params.imageName);
    res.sendFile(imagePath);
  });

  app.get("/delete/:imageName", async (req, res) => {
    try {
      const imageName = req.params.imageName;
      const galleryData = await gallery.findOneAndUpdate(
        {},
        { $pull: { image: imageName } },
        { new: true }
      );
      
      if (galleryData) {
        const imagePath = path.join(__dirname,"gallery", imageName);
        fs.unlinkSync(imagePath); // Delete the image file from the server
        res.redirect("/show");
      } else {
        res.redirect("/show");
      }
    } catch (error) {
      console.log(error.message);
      res.redirect("/show");
    }
  });

app.listen(1000, () => {
  console.log("Server is running on port 1000");
});
