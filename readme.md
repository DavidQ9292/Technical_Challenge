# Technical challenge

1. [Description](#description)
2. [Prerequisites](#prerequisites)
2. [Installation](#instalation)
3. [Execution](#execution)
4. [Outputs](#outputs)

## Description

This project is a technical challenge based on 4 tests, the project has been developed using cypress, if a stakeholder want to create or check the tests we can apply cucumber to provide a more "friendly" experience.
The structure of the project is with a page object model to have a structure prepared for new implementations.

## Prerequisites
[Node.js] **4.2.x** or above installed.
- Have *Node.js* installation path added to **PATH** environment variable.

## Installation

Clone the repo
```bash
git clone https://github.com/usuario/proyecto.git
```

Access to the project
```bash
cd project
```

Install the dependencies
```bash
npm install
```

## Execution

To run the tests into the default environment (production)
```bash
npx cypress run
```

To run the tests into a specific environment. The possible environments are production, local, staging
```bash
npx cypress run --env environment=environment
```

To run the tests in local first you need to run the docker container
```bash
docker run -p 4000:4000 pocketaces2/fashionhub-demo-app:latest
```
Other option is to use the docker-compose.yml
```bash
docker-compose up
```

## Outputs
In this project once the tests has been executed a report is created in the ./cypress/reports
In the test 4 a CSV is created and is saved in the route ./cypress/downloads