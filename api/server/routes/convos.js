const express = require('express');
const router = express.Router();
const { getConvo, saveConvo } = require('../../models');
const { getConvosByPage, deleteConvos } = require('../../models/Conversation');
const requireJwtAuth = require('../middleware/requireJwtAuth');

const USER_ID = 1;
router.get('/', async (req, res) => {
  const pageNumber = req.query.pageNumber || 1;
  res.status(200).send(await getConvosByPage(USER_ID, pageNumber));
});

router.get('/:conversationId', async (req, res) => {
  const { conversationId } = req.params;
  const convo = await getConvo(USER_ID, conversationId);

  if (convo) {
    res.status(200).send(convo);
  } else {
    res.status(404).end();
  }
});

router.post('/clear', async (req, res) => {
  let filter = {};
  const { conversationId, source } = req.body.arg;
  if (conversationId) {
    filter = { conversationId };
  }

  // for debugging deletion source
  // console.log('source:', source);

  if (source === 'button' && !conversationId) {
    return res.status(200).send('No conversationId provided');
  }

  try {
    const dbResponse = await deleteConvos(USER_ID, filter);
    res.status(201).send(dbResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post('/update', async (req, res) => {
  const update = req.body.arg;

  try {
    const dbResponse = await saveConvo(USER_ID, update);
    res.status(201).send(dbResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
