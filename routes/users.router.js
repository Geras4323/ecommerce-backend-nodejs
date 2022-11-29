const express = require('express');
const UserService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
  updatePartiallyUserSchema
} = require('../schemas/user.schema');


const router = express.Router();
const service = new UserService();

// GET
router.get('/', async (req, res) => {
  const users = await service.find();
  res.status(200).json(users);
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await service.findOne(id);
  res.status(200).json(user);
})

// POST
router.post('/', async (req, res) => {
  const body = req.body;
  const newUser = await service.create(body)
  res.status(201).json(newUser)
})

// PUT
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updated = await service.update(id, body);
  res.status(200).json(updated);
})

// PATCH
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const updated = await service.updatePartially(id, body)
  res.status(200).json(updated)
})

// DELETE
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await service.delete(id)
  res.status(200).json(deleted)
})



module.exports = router;