var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var Event = require("../models/event");
var Remark = require("../models/remark");
var Category = require("../models/category");

router.get("/", (req, res, next) => {
  Event.find({}, (err, events) => {
    if (err) return next(err);

    res.render("events", { events });
  });
});

router.get("/subscribe", (req, res, next) => {
  res.render("subscribe");
});

router.post("/subscribe", (req, res, next) => {
  res.send("SUBSCRIBED");
});

router.get("/new", (req, res, next) => {
  res.render("createEvent");
});

router.post("/", (req, res, next) => {
  console.log(req.body);

  Event.create(req.body, (err, event) => {
    if (err) return next(err);

    res.redirect("/events");
  });
});

router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Event.findById(id)
    .populate("remarks")
    .exec((err, event) => {
      if (err) return next(err);

      res.render("eventDetails", { event });
    });
});

router.get("/:id/edit", (req, res) => {
  let id = req.params.id;
  Event.findById(id, (err, event) => {
    if (err) return next(err);

    res.render("updateEvent", { event });
  });
});

router.post("/:id", (req, res) => {
  let id = req.params.id;

  Event.findByIdAndUpdate(id, req.body, (err, updatedEvent) => {
    if (err) return next(err);
    res.redirect("/events/" + id);
  });
});

router.get("/:id/delete", (req, res) => {
  let id = req.params.id;
  Event.findByIdAndDelete(id, (err, deletedEvent) => {
    if (err) return next(err);
    Remark.deleteMany({ eventId: id }, (err, event) => {
      res.redirect("/events");
    });
  });
});

router.get("/category", (req, res) => {
  Event.find({});
});

router.post("/:id/remarks", (req, res, next) => {
  let id = req.params.id;

  Remark.create(req.body, (err, remark) => {
    if (err) return next(err);

    let remarkId = remark.id;
    Event.findByIdAndUpdate(
      id,
      { $push: { remarks: remarkId } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
      (err, updatedEvent) => {
        if (err) return next(err);

        res.redirect("/events/" + id);
      }
    );
  });
});

router.get("/:id/likes", (req, res) => {
  let id = req.params.id;
  Event.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, event) => {
    if (err) return next(err);
    res.redirect("/events/" + id);
  });
});

router.get("/:id/dislikes", (req, res) => {
  let id = req.params.id;
  Event.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, (err, event) => {
    if (err) return next(err);
    res.redirect("/events/" + id);
  });
});

module.exports = router;
