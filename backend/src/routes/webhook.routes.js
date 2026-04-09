const express = require('express');
const automationService = require('../services/automation.service');

const router = express.Router();

// ── Instagram Webhook ──

// Webhook Verification (GET)
router.get('/instagram', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === 'MY_VERIFY_TOKEN') { // In real app, use ENV
      console.log('✅ Webhook Verified!');
      return res.status(200).send(challenge);
    }
  }
  res.sendStatus(403);
});

// Webhook Event Receiving (POST)
router.post('/instagram', async (req, res) => {
  try {
    const body = req.body;

    console.log('📬 Received Instagram Webhook:', JSON.stringify(body, null, 2));

    // Basic extraction logic for Demo
    // In real app, iterate over entries and changes
    if (body.object === 'instagram') {
      const entry = body.entry?.[0];
      const change = entry?.changes?.[0];
      
      if (change?.field === 'comments') {
        const commentData = {
          instagramMediaId: entry.id,
          username: change.value.from.username,
          message: change.value.text,
          instagramAccountId: entry.id, // simplified
        };

        // Call our automation logic
        await automationService.handleIncomingComment(commentData);
      }
    }

    res.status(200).send('EVENT_RECEIVED');
  } catch (error) {
    console.error('❌ Webhook Error:', error.message);
    res.status(200).send('EVENT_RECEIVED'); // Always send 200 to Instagram
  }
});

module.exports = router;
