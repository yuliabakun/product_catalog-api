/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import type Product from './types/Product';

const PORT = 2040;

const app = express();

app.use(cors());

const publicPath = path.resolve(__dirname, '..', 'public');

app.get('/new', async (req, res) => {
  try {
    const filePath = path.join(publicPath, 'products.json');
    const rawData = await fs.readFile(filePath, { encoding: 'utf-8' });
    const data = JSON.parse(rawData);

    const newest: Product = data.sort((a: Product, b: Product) => {
      return b.year - a.year;
    }).slice(0, 10);

    res.send(newest);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/discount', async (req, res) => {
  try {
    const filePath = path.join(publicPath, 'products.json');
    const rawData = await fs.readFile(filePath, { encoding: 'utf-8' });
    const data = JSON.parse(rawData);

    const cheapest: Product = data.sort((a: Product, b: Product) => {
      return a.price - b.price;
    }).slice(0, 10);

    res.send(cheapest);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/recommended', async (req, res) => {
  try {
    const filePath = path.join(publicPath, 'products.json');
    const rawData = await fs.readFile(filePath, { encoding: 'utf-8' });
    const data = JSON.parse(rawData);

    const recommended: Product = data.sort((a: Product, b: Product) => {
      return (b.fullPrice - b.price) - (a.fullPrice - a.price);
    }).slice(0, 10);

    res.send(recommended);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log('Server is running on 2040');
});
