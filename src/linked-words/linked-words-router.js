const express = require('express')
const LinkedWordsService = require('./linked-words-service')
const { requireAuth } = require('../middleware/jwt-auth')

const linkedWordsRouter = express.Router()

linkedWordsRouter
    .use(requireAuth)
    .get('/', async (req, res, next) => {
        try {
          const words = await LinkedWordsService.getLanguageWords(
            req.app.get('db'),
            req.language.id,
          )

          const linkedList = LinkedWordsService.populateWordsInList(words)

          res.json({
            linkedList
          })
          next()
        } catch (error) {
          next(error)
        }
    })

    module.exports = linkedWordsRouter;