#!/bin/bash
npm install
./node_modules/.bin/electron-rebuild

pyinstaller --onefile public/server.py
mv dist/server public/server
rm -rf build/
rm -rf dist/
rm server.spec