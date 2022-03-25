var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var Remark = require("../models/remark");
var Event = require("../models/remark");

router.get("/", (req, res) => {
  Remark.find({}, (err, remark) => {
    console.log(remark);
  });
});

router.get("/:id/delete", (req, res) => {
  let id = req.params.id;

  Remark.findByIdAndDelete(id, (err, deletedEvent) => {
    if (err) return next(err);
    Event.findById(deletedEvent.eventId)
      .populate("remarks")
      .exec((err, event) => {
        res.redirect("/events/" + deletedEvent.eventId);
      });
  });
});

router.get("/:id/likes", (req, res) => {
  let id = req.params.id;
  Remark.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, event) => {
    if (err) return next(err);
    res.redirect("/events/" + event.eventId);
  });
});

router.get("/:id/dislikes", (req, res) => {
  let id = req.params.id;
  Remark.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, (err, event) => {
    if (err) return next(err);
    res.redirect("/events/" + event.eventId);
  });
});

router.get("/:id/edit", (req, res) => {
  let id = req.params.id;
  Remark.findById(id, (err, event) => {
    if (err) return next(err);
    res.render("updateRemark", { event });
  });
});

module.exports = router;
