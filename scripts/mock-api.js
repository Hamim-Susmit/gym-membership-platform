#!/usr/bin/env node
const express = require('express');
const bodyParser = require('body-parser');
const { randomUUID } = require('crypto');

const app = express();
app.use(bodyParser.json());

const users = new Map();

app.post('/auth/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body || {};
  if (!email || !password || !firstName || !lastName) return res.status(400).json({ message: 'Missing fields' });
  if (users.has(email)) return res.status(409).json({ message: 'Email already registered' });
  const id = randomUUID();
  users.set(email, { id, email, password, firstName, lastName });
  const accessToken = `mock-access-${id}`;
  const refreshToken = `mock-refresh-${id}`;
  return res.status(201).json({ accessToken, refreshToken, user: { id, email, firstName, lastName, roles: [{ name: 'MEMBER' }] } });
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });
  const user = users.get(email);
  if (!user || user.password !== password) return res.status(401).json({ message: 'Invalid credentials' });
  const accessToken = `mock-access-${user.id}`;
  const refreshToken = `mock-refresh-${user.id}`;
  return res.status(200).json({ accessToken, refreshToken, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, roles: [{ name: 'MEMBER' }] } });
});

const port = 4000;
app.listen(port, () => console.log(`Mock API listening on ${port}`));
