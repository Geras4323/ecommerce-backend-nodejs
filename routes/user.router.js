const express = require('express');
const passport = require('passport');

const UserService = require('../services/user.service');
const validationHandler = require('../middlewares/validation.handler');
const {
  getUserSchema,
  queryUserSchema,
  createUserSchema,
  updateUserSchema,
  updatePartiallyUserSchema
} = require('../schemas/user.schema');
const { checkRoles } = require('../middlewares/auth.handler');


const router = express.Router();
const service = new UserService();

// GET ////////////////////////////////////////////////////
router.get('/',
  validationHandler(queryUserSchema, 'query'),
  async (req, res, next) => {
    try {
      const users = await service.find(req.query);
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
)

router.get('/:id',
  validationHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
)

// POST ////////////////////////////////////////////////////
router.post('/',
  validationHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body)
      res.status(201).json(newUser)
    } catch (err) {
      next(err);
    }
  }
)

// PUT ////////////////////////////////////////////////////
router.put('/:id',
  validationHandler(getUserSchema, 'params'),
  validationHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updated = await service.update(id, body);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  }
)

// PATCH ////////////////////////////////////////////////////
router.patch('/:id',
  validationHandler(getUserSchema, 'params'),
  validationHandler(updatePartiallyUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updated = await service.updatePartially(id, body)
      res.status(200).json(updated)
    } catch (err) {
      next(err);
    }
  }
)

// DELETE ////////////////////////////////////////////////////
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles(['administrator']),
  validationHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await service.delete(id)
      res.status(200).json(deleted)
    } catch (err) {
      next(err)
    }
  }
)


module.exports = router;