# CalcuLabor

CalcuLabor calculates real-time productivity in any place on computer devices with customized efficiency
formula to optimize the operation of organization.

#### Website URL: [calculbor.online](https://calculabor.online/)

#### Test Accounts:
  - username: test12345
  - password: tT!5


## Table of content
* [Technologies](#technologies)
* [Domain knowledge of efficiency calculation](#Domain-knowledge-of-efficiency-calculation)
* [Database design](#database-design)
* [Features](#features)
* [Demos of key features](#demos-of-key-features)
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

## Domain knowledge of efficiency calculation
<img src="/public/logo/PPH.PNG">
<img src="/public/logo/EFFI.PNG">

## Database design
<img src="/public/logo/erDiagram.JPG">

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

## Demos of key features
* DASHBOARD MODULE
* Select process as process_2 from the dropdown list, start date as 2020/12/1, end date as 2020/12/24 then click "Show Process Effi. by Date" button and the trand chart show up
<img src="/public/logo/dash1.gif">
* Select date as 2020/12/14 then click "Show Daily Effi. by Process" button and the trand chart show up
<img src="/public/logo/dash2.gif">

* PRODUCTION PLANNING MODULE
* Print out barcode of below image file as a production order number to be scanned example
<img src="/public/logo/2012280001.png">
* Click "Turn on/off camera" button to activate camera of your device (note: please ALLOW calculabor.online to use your camera) then scan your barcode and the production order detail shows up
<img src="/public/logo/scan1.gif">

## Author
Jonathan Sun [@xrt0231](https://github.com/xrt0231)