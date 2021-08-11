const express = require('express')
const router = express.Router()
const { Coffee } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const coffees = await Coffee.findAll()

  res.send(coffees)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const coffee = await Coffee.findOne({ where: { id } })

  res.send(coffee)
})

router.post('/', auth, async function (req, res, next) {
  const coffee = await Coffee.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(coffee)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await Coffee.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const coffee = await Coffee.findOne({ where: { id } })

  coffee.flavour = req.body.flavour

  coffee.save()

  res.send(coffee)
})

module.exports = router
