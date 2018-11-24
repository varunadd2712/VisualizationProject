document.getElementById("victimsChart").style.display = "none";
document.getElementById("genderChart").style.display = "none";
document.getElementById("religionChart").style.display = "none";
document.getElementById("treemap-chart").style.display = "none";
document.getElementById("geographical-map-chart").style.display = "none";
document.getElementById("states-bar-chart").style.display = "none";
document.getElementById("chart").style.display = "none";
document.getElementById("trendchart").style.display = "none";
document.getElementById("map-text-chart").style.display = "none";

document.getElementById("victimsChart").style.display = "block";
document.getElementById("genderChart").style.display = "block";
document.getElementById("religionChart").style.display = "block";

let statesBarChart = new StatesBarChart();
let geographicalMapChart = new GeographicalMapChart();
let treemap = new Treemap();
let donutChart = new DonutChart();
let victimChart = new VictimChart();
let trendChart = new TrendChart();
trendChart.update();

var isStateShown = 0;
var isStateComparisionShown = 0;
var isTrendChartShown = 0;
var isTreeMapShown = 0;

let yearChart = new YearChart(statesBarChart, geographicalMapChart, treemap, donutChart, victimChart);
geographicalMapChart.drawMap()
yearChart.update();

let myScrollFunc = function() {

  var y = window.scrollY;
  console.log(y);

  if(y >= 960) {

    if(isStateShown == 0) {
      document.getElementById("map-text-chart").style.display = "block";

      document.getElementById("geographical-map-chart").style.display = "block";
      document.getElementById("states-bar-chart").style.display = "block";
      geographicalMapChart.updateFromScript();
      statesBarChart.updateFromScript();
      isStateShown = 1;
    }
  }

  if(y >= 2630) {

    if(isStateComparisionShown == 0) {
      document.getElementById("chart").style.display = "block";
      isStateComparisionShown = 1;
    }
  }

  if(y >= 4240) {

    if(isTreeMapShown == 0) {
      document.getElementById("treemap-chart").style.display = "block";
      treemap.updateFromScript();
      isTreeMapShown = 1;
    }
  }

  if(y >= 5018) {

    if(isTrendChartShown == 0) {
      document.getElementById("trendchart").style.display = "block";
      trendChart.update();
      isTrendChartShown = 1;
    }
  }
}

window.addEventListener("scroll", myScrollFunc);
