# CalcuLabor

CalcuLabor is a real-time productivity calculation concetual tool let you to calculate labor hour and work efficiency.

#### Website URL: [calculbour.com](http://calculabour.com/)

#### Test Account:
  - username: test12345
  - password: tT!5

## Table of content
* [Technologies](#technologies)
* [Domain knowledge of efficiency calculation](#Domain-knowledge-of-efficiency-calculation)
* [Database design](#database-design)
* [Features](#features-ready)
* [Demo of key features](#demo-of-key-features)
* [Author](#author)


## Technologies

### Backend

* Node.js
* Express.js
* AWS ECS fargate

### Frontend

* HTML
* CSS
* JavaScript

* 3rd party log in (Google/Apple)

### Barcode reading
* QuaggaJS

### Database

* AWS RDS (MySQL)

### Networking

* HTTP & HTTPS
* Domain Name System (DNS)
* ECS (EC2)
* SSL Certificate

### Test

* Mocha
* Chai
* Artillery


### CI/CD

### CICD

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
  * Built dashboard with Highcharts for efficiency status visualization which let decision maker easier to change operation strategy.
* Barcode reading:
  * Created a live barcode scanner using QuaggaJS which let user easier to input data.
* Gantt chart:
  * Built daily Gantt chart of production plan or actual working hour with JS-Gantt-Chart.
* Multiple dropdown list:
  * Created multiple dropdown list and linked data with MySQL database.

### To-do features
* Let production orders from production planning module are synchronized with production orders from MRP. 
* Integrate MES production parameter into production execution module.

## Demo of key features
* DASHBOARD MODULE
* Select process as process_2 from the dropdown list, start date as 2020/12/1, end date as 2020/12/24 then click "Show Process Effi. by Date" button and the trand chart shows up.
<img src="/public/logo/dash1.gif">

* Select date as 2020/12/14 then click "Show Daily Effi. by Process" button and the trand chart show up.
<img src="/public/logo/dash2.gif">

* PRODUCTION PLANNING MODULE
* Print out barcode of below image file as a production order number for barcode reading.
<img src="/public/logo/2012280001.png">

* Click "Turn on/off camera" button to activate camera of your device (note: please ALLOW calculabor.online to use your camera) then scan your barcode and the production order detail shows up.
<img src="/public/logo/scan1.gif">

## Author
Jonathan Sun [@xrt0231](https://github.com/xrt0231)
