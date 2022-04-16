const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscribers')
module.exports = router

// Getting all subscribers
router.get('/', async (req, res) => {
    res.send('Getting all subscribers')
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// Getting a single subscriber
router.get('/:id', getSubscriber, async (req, res) => {
    res.send(`Getting subscriber ${req.Subscriber.name}`)
    try {
        const subscriber = await Subscriber.findById(req.params.id)
        res.json(subscriber)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// Creating a new subscriber
router.post('/', async (req, res) => {
    res.send('Creating a new subscriber')
    const subscriber = new Subscriber({
        name: req.body.name,
        email: req.body.email,
        subscriberToChannel: req.body.subscriberToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})
// Updating a subscriber
router.patch('/:id', getSubscriber, async (req, res) => {
    res.send(`Updating subscriber ${req.Subscriber.name}`)
    if (req.body.name != null) {
        req.Subscriber.name = req.body.name
    }
    if (req.body.email != null) {
        req.Subscriber.email = req.body.email
    }
    if (req.body.subscriberToChannel != null) {
        req.Subscriber.subscriberToChannel = req.body.subscriberToChannel
    }
    try {
        const updatedSubscriber = await req.Subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    } 

})
// Deleting a subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    res.send(`Deleting subscriber ${req.Subscriber.name}`)
    try {
        await res.subscriber.remove()
        res.json({ message: 'Subscriber removed' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// Getting all subscribers to a channel
router.get('/channel/:channel', async (req, res) => {
    res.send(`Getting all subscribers to channel ${req.params.channel}`)
    try {
        const subscribers = await Subscriber.find({ subscriberToChannel: req.params.channel })
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: 'Cannot find subscriber' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.Subscriber = subscriber
    next()
}

