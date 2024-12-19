const express = require('express');
const axios = require('axios');
const generateIDCards = require('../utils/pdfGenerator');

const router = express.Router();

const API_URL = 'https://freetestapi.com/api/v1/students';

router.get('/download-id-cards', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const students = response.data;
    generateIDCards(res, students);
  } catch (error) {
    console.error('Error fetching student data:', error.message);
    res.status(500).send('Error generating ID cards. Please try again later.');
  }
});

module.exports = router;
