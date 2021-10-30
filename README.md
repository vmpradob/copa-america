<h1>Copa America a microservice architecture example. </h1>

[![Python 3.9.6](https://img.shields.io/badge/python-3.9.6-green.svg)](https://www.python.org/downloads/release/python-396/)
<a href="https://github.com/psf/black" rel="nofollow"><img alt="Code style: black" src="https://warehouse-camo.ingress.cmh1.psfhosted.org/fbfdc7754183ecf079bc71ddeabaf88f6cbc5c00/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d626c61636b2d3030303030302e737667"></a>

<h2>Table of Content</h2>

1. [ Description. ](#description)
2. [ Case study. ](#project)

    - [ Features. ](#project-features)
    - [ ER Diagram. ](#project-er-diagram)
    - [ Solution. ](#project-solution)
2. [ Installation. ](#install)
3. [ Testing. ](#test)
4. [ About Me. ](#about)

<h2 id="description">1. Description</h2>
<p>
The main goal of this project is show an example of microservices architecture based on event driven
design. Using python as the main lenguage of the micros i'll show my own implementation of an API with KongHQ as proxy server and Apache Kafka as event stream service.
</p>

---

<h2 id="project">2. Case study</h2>

CONMEBOL confederation in charge of the american coup for his 47 editions wants to replace their old monolithic system by a new microservices aproach. The current  [ER Diagram](#project-er-diagram) shows the data model for the old version of the product. our job is propose a demo of an application that can host all the data an features of the old system but using the new architecture. This one must be implemented over docker cointainer services and has to satisfie the next list of features:

<h3 id="project-features">Features</h3>
- Create a ER Diagram for each database in the system.
- Provide an API with a CRUD for each table that need it.
- Give an endpoint that returns all the data of a given tournament (hosts, edition, participants, winner) and the selections of each group.
- Generate a endpoint that returns information about the team roster of an specific selection.
- Make and enpoint to load all the data for a new tournament, selections, tournament data, players, matches, etc...

<h3 id="project-er-diagram">ER Diagram</h3>

![alt database](https://github.com/vmpradob/copa-america/blob/main/docs/database.svg)

<h3 id="project-solution">Solution</h3>

---

<h2 id="install">3. Installation</h2>

---

<h2 id="test">4. Testing</h2>

---

<h2>5. Usage tips</h2>
<p></p>

---

<h2 id="about">About Me</h2>
<h1 align="center">Hi 👋, I'm Victor Prado</h1>
<h3 align="center">A backend developer and microservices enthusiast</h3>



- 🔭 I’m currently working on [EMQU tech](https://www.emqu.net/es/) as backend developer on python + flask over microservices architecture.

- 📫 How to reach me **vmpradob@gmail.com**

<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="https://twitter.com/vmpradob" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="vmpradob" height="30" width="40" /></a>
<a href="https://linkedin.com/in/vmpradob" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="vmpradob" height="30" width="40" /></a>
<a href="https://instagram.com/vmpradob" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/instagram.svg" alt="vmpradob" height="30" width="40" /></a>
</p>

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://aws.amazon.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws" width="40" height="40"/> </a> <a href="https://www.gnu.org/software/bash/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/gnu_bash/gnu_bash-icon.svg" alt="bash" width="40" height="40"/> </a> <a href="https://www.docker.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> <a href="https://flask.palletsprojects.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-icon.svg" alt="flask" width="40" height="40"/> </a> <a href="https://kafka.apache.org/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/apache_kafka/apache_kafka-icon.svg" alt="kafka" width="40" height="40"/> </a> <a href="https://mariadb.org/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/mariadb/mariadb-icon.svg" alt="mariadb" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://www.mysql.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" alt="mysql" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://www.python.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> </a> <a href="https://www.rabbitmq.com" target="_blank"> <img src="https://www.vectorlogo.zone/logos/rabbitmq/rabbitmq-icon.svg" alt="rabbitMQ" width="40" height="40"/> </a> <a href="https://www.sqlite.org/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg" alt="sqlite" width="40" height="40"/> </a> </p>
