const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
const rankingFile = path.join(__dirname, 'ranking.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Servir arquivos estáticos (e.g., lazer_runner.html)

// Inicializar arquivo de ranking se não existir
async function initializeRankingFile() {
  try {
    await fs.access(rankingFile);
    console.log('Arquivo ranking.json encontrado');
  } catch {
    await fs.writeFile(rankingFile, JSON.stringify([]));
    console.log('Arquivo ranking.json criado');
  }
}

// Ler ranking
async function getRanking() {
  try {
    const data = await fs.readFile(rankingFile
