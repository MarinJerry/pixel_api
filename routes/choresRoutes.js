const express = require('express');
const router = express.Router();
const choresServices = require('../services/choresService');

/* GET one. */
router.get('/:id', async function(req, res, next) {
  try {
      res.json(await choresServices.getOne(req.params.id));
  } catch (err) {
  console.error(`Error while getting my chores `, err.message);
  next(err);
}
});

/* GET all. */
router.get('/', async function(req, res, next) {
    try {
        res.json(await choresServices.getMultiple(req.query.page));
    } catch (err) {
    console.error(`Error while getting my chores `, err.message);
    next(err);
  }
});

/* POST store */
router.post('/', async function(req, res, next) {
  try {
    res.json(await choresServices.create(req.body));
  } catch (err) {
    console.error(`Error while creating chores`, err.message);
    next(err);
  }
});

/* PUT update */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await choresServices.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating chores`, err.message);
    next(err);
  }
});

/* DELETE */
router.put('/disable/:id', async function(req, res, next) {
  try {
    res.json(await choresServices.change(req.params.id, req.body.status));
  } catch (err) {
    console.error(`Error while deleting chores`, err.message);
    next(err);
  }
});

module.exports = router;