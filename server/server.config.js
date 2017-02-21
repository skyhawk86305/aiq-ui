'use strict';

module.exports = {
  local: {
    host: 'localhost',
    port: 3000,
    subDir: '',
    username: 'testuser@solidfire.com',
    password: 'password123',
    fixture: 'default'
  },
  dev: {
    host: 'activeiq.dev.aiq.netapp.internal',
    port: 80,
    subDir: '/beta',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    fixture: null
  },
  prod: {
    host: 'activeiq.solidfire.com',
    port: 80,
    subDir: '/beta',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    fixture: null
  }
};
