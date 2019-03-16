
let router = require('express').Router();

const messagesController = require('./controller/messages.controller');

router.get('/', function (request, response) {
    response.json({
       status: 'OK',
       message: 'API up and running.'
    });
});

router.route('/clear').get(messagesController.clearMessages);
router.route('/search').get(messagesController.searchMessages);
router.route('/dump/sg').get(messagesController.dumpSgMessages);
router.route('/dump/client').get(messagesController.dumpClientMessages);
router.route('/load/sg').get(messagesController.loadSgMessages);
router.route('/count/sg').get(messagesController.countSgMessages);
router.route('/load/client').get(messagesController.loadClientMessages);
router.route('/count/client').get(messagesController.countClientMessages);
router.route('/client/:id').get(messagesController.getClientMessageByRef);
router.route('/sg/:id').get(messagesController.getSgMessageByRef);

module.exports = router;
