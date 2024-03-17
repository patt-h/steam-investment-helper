# Steam Investment Helper

## Table of contents
* [Introduction](#introduction)
* [Built with](#built-with)
* [Setup](#setup)
* [How app looks](#how-app-looks)

## Introduction


## Built with
- Java / Spring Boot
- JavaScript / React
- MySQL

## Setup
Run `docker-compose up -d --build` to start applications

## How app looks
If apps (<b>remember that Spring App, React App and MySQL database must be running</b>) has started successfully, it should be available at `localhost:3000`
<p align="center">
  <img src="/images/mainpage.png">
</p>

To start using investment helper, simply click on `Get started` button or click on `Investments` in navigation bar.

To add new item, click on green `+` button and then fill in required fields. You can set whatever name you want, just remember to add correct Steam Market link to the item.
<p align="center">
  This is how investments section looks like when filled with items
  <img src="/images/investments.png">
</p>

<p>
If you hover cursor over the item image, three icons will appear. <br />
You can edit values of provided item such as display name, bought price and quantity by clicking on pencil icon. You can also delete item by clicking on red cross icon. If you click on clock icon, registered price history of that item will appear.
</p>  

Price history of each added item is getting registered in database after the first visit to the website on a given day.
<p align="center">
  Registered price history for MOUZ sticker
  <img src="/images/pricehistory.png">
</p>

Lastly, this is how About section looks like
<p align="center">
  <img src="/images/about.png">
</p>
