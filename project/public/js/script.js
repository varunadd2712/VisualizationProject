document.getElementById("victimsChart").style.display = "none";
document.getElementById("genderChart").style.display = "none";
document.getElementById("religionChart").style.display = "none";
document.getElementById("sexualOrientation").style.display = "none";
document.getElementById("treemap-chart").style.display = "none";
document.getElementById("geographical-map-chart").style.display = "none";
document.getElementById("states-bar-chart").style.display = "none";
document.getElementById("chart").style.display = "none";
document.getElementById("trendchart").style.display = "none";

  let statesBarChart = new StatesBarChart();
  let geographicalMapChart = new GeographicalMapChart();
  let treemap = new Treemap();
  let donutChart = new DonutChart();
  let victimChart = new VictimChart();
  let trendChart = new TrendChart();
  trendChart.update();

  let yearChart = new YearChart(statesBarChart, geographicalMapChart, treemap, donutChart, victimChart);
  geographicalMapChart.drawMap()
  yearChart.update();

  function openDiv(evt, selectionName) {

    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    evt.path["0"].className += " active";

    document.getElementById("victimsChart").style.display = "none";
    document.getElementById("genderChart").style.display = "none";
    document.getElementById("religionChart").style.display = "none";
    document.getElementById("sexualOrientation").style.display = "none";

    document.getElementById("treemap-chart").style.display = "none";
    document.getElementById("geographical-map-chart").style.display = "none";
    document.getElementById("states-bar-chart").style.display = "none";
    document.getElementById("chart").style.display = "none";

    if(selectionName === "Victims") {
      document.getElementById("victimsChart").style.display = "block";
      document.getElementById("genderChart").style.display = "block";
      document.getElementById("religionChart").style.display = "block";
      document.getElementById("sexualOrientation").style.display = "block";
      victimChart.updateFromScript();
    }
    else if (selectionName === "Map") {
      document.getElementById("geographical-map-chart").style.display = "block";
      document.getElementById("states-bar-chart").style.display = "block";
      geographicalMapChart.updateFromScript();
      statesBarChart.updateFromScript();

    }
    else if(selectionName === "Breakdown")
      document.getElementById("treemap-chart").style.display = "block";

    else if(selectionName === "StateCompare")
      document.getElementById("chart").style.display = "block";

    else if(selectionName === "trendchart") {
      document.getElementById("trendchart").style.display = "block";
      trendChart.update();
    }
}
