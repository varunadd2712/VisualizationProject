  let statesBarChart = new StatesBarChart();
  let geographicalMapChart = new GeographicalMapChart();
  let treemap = new Treemap();

  let yearChart = new YearChart(statesBarChart, geographicalMapChart, treemap);
  geographicalMapChart.drawMap()
  yearChart.update();

