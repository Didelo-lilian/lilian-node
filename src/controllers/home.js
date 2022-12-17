const Home = require("../models/Home");

exports.createHome = (req, res) => {
  const home = new Home({
    language: req.body.language,
    paragraphs: req.body.paragraphs,
  });
  home
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Home created!",
        createdHome: {
          language: result.language,
          paragraphs: result.paragraphs,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
}

exports.getHome = (req, res) => {
  if (req.body.language) {
    Home.find({ language: req.body.language })
      .then((home) => res.json({ message: "Home found", home }))
      .catch((err) =>
        res.status(404).json({ noHomeFound: "No home found with that ID" })
      );
  } else {
    Home.find()
      .then((home) => {
        res.json(home);
      })
      .catch((err) =>
        res.status(404).json({ noHomeFound: "No home found" })
      );
  }
}
  

exports.deleteHome = (req, res) => {
  Home.findOneAndDelete({ language: req.body.language })
    .then((home) => res.json({ message: "Home deleted" }))
    .catch((err) =>
      res.status(404).json({ noHomeFound: "No home found" })
    );
}

exports.updateHome = (req, res) => {
  Home.findOneAndUpdate({ language: req.body.language }, {
    language: req.body.language,
    paragraphs: req.body.paragraphs,
  })
    .then((home) => {
      res.json(home);
    })
    .catch((err) =>
      res.status(404).json({ noHomeFound: "No home found" })
    );
}