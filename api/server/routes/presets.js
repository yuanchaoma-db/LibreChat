const express = require('express');
const router = express.Router();
const { getPresets, savePreset, deletePresets } = require('../../models');
const crypto = require('crypto');
const requireJwtAuth = require('../middleware/requireJwtAuth');

router.get('/', async (req, res) => {
  const presets = (await getPresets(req.user.id)).map((preset) => {
    return preset;
  });
  res.status(200).send(presets);
});

router.post('/', async (req, res) => {
  const update = req.body || {};

  update.presetId = update?.presetId || crypto.randomUUID();

  try {
    await savePreset(req.user.id, update);

    const presets = (await getPresets(req.user.id)).map((preset) => {
      return preset;
    });
    res.status(201).send(presets);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post('/delete', async (req, res) => {
  let filter = {};
  const { presetId } = req.body.arg || {};

  if (presetId) {
    filter = { presetId };
  }

  console.log('delete preset filter', filter);

  try {
    await deletePresets(req.user.id, filter);
    const presets = await getPresets(req.user.id);
    res.status(201).send(presets);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
