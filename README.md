# musala-drones

Welcome to the drones-v1 Project! This project is a practice test to be presented to the Mulasa company.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Build](#build)
- [Run](#run)
- [Test](#test)

## Requirements

To run this project, you need to have the following software installed on your system:

- Node.js
- npm (Node Package Manager)
- Docker

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/hm1996/musala-drones.git
cd mmusala-drones
```

2. Install the required dependencies using npm:

```bash
npm install
```

## Configuration

No configuration needed, everything can be runned as it's:
URL to test (http://localhost:3000).


## Build

This project need to be build in order to get the dummy date loaded to the mongoDB database, you can do it running:

```bash
npm run build
```
*BE AWARE, RUNNING THE BUILD WILL RESTART THE DATABASE STATUS*

## Run

To start the application, use the following command:

```bash
npm start
```


This will run the Node.js application on the configured port 3000. You can access the application in your browser at `http://localhost:3000`.

## Test

To run the tests, use the following command:

```bash
npm test
```

This project uses Jest as the testing framework. All test files are located in the `./server/__tests__` directory.

*BE AWARE, RUNNING THE TEST WILL RESTART THE DATABASE STATUS*
