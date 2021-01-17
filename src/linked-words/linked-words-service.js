const LinkedList = require('../linkedlist/linkedlist')

const LinkedWordsService = {
    getWordsForList(db, language_id) {
        return db
          .from('word')
          .select(
            'id',
            'language_id',
            'original',
            'translation',
            'next',
            'memory_value',
            'correct_count',
            'incorrect_count',
          )
          .where({ language_id })
      },

      populateWordsInList(words) {
        let returnList = new LinkedList()
        words.forEach(word => {
          returnList.addNewNode(word)
        })
        return returnList;
      }
}

module.exports = LinkedWordsService;