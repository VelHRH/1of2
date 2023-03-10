import * as d3 from "d3";

const drawChart = (element, data) => {
 const colors = ["#F01414", "#F07514", "#F0BE14", "#D9F014", "#14F035"];
 const boxSize = 500;

 d3.select(element).select("svg").remove();
 const svg = d3
  .select(element)
  .append("svg")
  .attr("preserveAspectRatio", "xMidYMid meet")
  .attr("height", "100%")
  .attr("width", "100%")
  .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
  .append("g")
  .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);

 const arcGenerator = d3
  .arc()
  .cornerRadius(20)
  .padAngle(0.02)
  .innerRadius(100)
  .outerRadius(250);

 const pieGenerator = d3.pie().value((d) => d.value);

 const arcs = svg.selectAll().data(pieGenerator(data)).enter();
 arcs
  .append("path")
  .attr("d", arcGenerator)
  .style("fill", (d, i) => colors[i % data.length])
;

 arcs
  .append("text")
  .attr("text-anchor", "middle")
  .text((d, index) => d.data.value && index + 1)
  .style("fill", "#000")
  .style("font-size", "50px")
  .attr("transform", (d) => {
   const [x, y] = arcGenerator.centroid(d);
   return `translate(${x},${y})`;
  });
};

export default drawChart;
