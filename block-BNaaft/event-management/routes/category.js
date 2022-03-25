var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var Events = require("../models/event");
var category = require("../models/category");

router.get("/work", (res, req) => {
  Event.find({ category: "work" }, (err, events) => {
    res.render("events", { events });
  });
});

router.get("/sports", (res, req) => {
  Event.find({ category: "sports" }, (err, events) => {
    res.render("events", { events });
  });
});

router.get("/travel", (res, req) => {
  Event.find({ category: "travel" }, (err, events) => {
    res.render("events", { events });
  });
});

router.get("/health", (res, req) => {
  Event.find({ category: "health" }, (err, events) => {
    res.render("events", { events });
  });
});

module.exports = router;
