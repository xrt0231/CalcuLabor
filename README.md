# CalcuLabor

CalcuLabor calculates real-time productivity in any place on computer devices with customized efficiency
formula to optimize the operation of organization.

## Table of content
* [Technologies](#technologies)
* [Database design](#database-design)
* [Features](#features)
* [Author](#author)


## Technologies

### Backend

* Node.js
* Express.js
* AWS EC2

### Frontend

* HTML
* CSS
* JavaScript
* AJAX

### Barcode reading
* QuaggaJS

### Database

* MySQL
* AWS RDS

### Networking

* HTTP & HTTPS
* Domain Name System (DNS)
* Nginx
* SSL Certificate

### Test

* Mocha
* Chai
* Artillery

### Others

* JS-Gantt-Chart
* Highcharts

## Database design
<img src="/logo/erDiagram.JPG">

## Features
<img src="/logo/dashBoardDemo.mp4">

### Features ready
* Dashboard: 
  * Built dashboard with Highcharts for efficiency status visualization which let decision maker easier to change operation strategy
* Barcode reading:
  * Created a live barcode scanner using QuaggaJS which let user easier to input data
* Gantt chart:
  * Built daily Gantt chart of production plan or actual working hour with JS-Gantt-Chart
* Multiple dropdown list:
  * Created multiple dropdown list and linked data with MySQL database.

### To-do features
* Let production orders from production planning module are synchronized with production orders from MRP 
* Integrate MES production parameter into production execution module

## Author
Jonathan Sun [@xrt0231](https://github.com/xrt0231)