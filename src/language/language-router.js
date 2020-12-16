const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')

const languageRouter = express.Router()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      const usersLanguage = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      const headWord = await LanguageService.getSpecificWord(
        req.app.get('db'),
        usersLanguage.head
      )

      console.log(headWord)

      const fullRes = {
        nextWord: headWord[0].original,
        totalScore: usersLanguage.total_score,
        wordCorrectCount: headWord[0].correct_count,
        wordIncorrectCount: headWord[0].incorrect_count
      }
      //implement serialization of this array^ so that this isnt terrible

      res.json({
        nextWord: headWord[0].original,
        totalScore: usersLanguage.total_score,
        wordCorrectCount: headWord[0].correct_count,
        wordIncorrectCount: headWord[0].incorrect_count})
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .post('/guess', async (req, res, next) => {
    // implement me
    res.send('implement me!')
  })

module.exports = languageRouter
