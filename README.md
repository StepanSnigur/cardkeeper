# CardKeeper
![tech](https://img.shields.io/badge/Framework-React%20Native-blue)
![tech](https://img.shields.io/badge/Platform-Expo-red)
![tech](https://img.shields.io/badge/Language-JavaScript-darkblue)
![tech](https://img.shields.io/badge/Cloud-MongoDB-brightgreen)

CardKeeper is a React Native app for storage of discount cards

## Installation
Use the ```yarn``` package manager to install this app. Also you need to install ```Expo cli``` globally to 
run this App
```bash
yarn install
```
```bash
npm install --global expo-cli
```
```bash
expo start
```

## File structure

```/assets``` - folder to save media files

```/src/api``` - in this folder you should keep files which provide access to external API

```/src/components```  - folder to keep small components like buttons, etc.

```/src/navigation``` - folder to store routing files

```/src/screens``` - folder to store pages, like Auth or Profile

```/src/store``` - folder to keep ```mobx``` stores

```/src/utils``` - folder to store small functions which can be used on several components
