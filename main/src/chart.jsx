import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const StackedBarChart = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Clear previous chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Dimensions
    const width = 928;
    const height = 500;
    const marginTop = 40;
    const marginRight = 30;
    const marginBottom = 60;
    const marginLeft = 70;

    // --- Prepare data ---
    const parseDate = d3.timeParse("%m/%d/%Y");
    const preparedData = data.map(d => ({
      date: parseDate(d.date),
      red: +d.nb_of_red,      // Didn't like it
      green: +d.nb_of_green,  // Liked it
      yellow: +d.nb_of_yellow, // Exceptional
    })).sort((a, b) => a.date - b.date);

    // Keys in stacking order (bottom to top)
    const keys = ['red', 'green', 'yellow'];

    // Create stack generator
    const stack = d3.stack()
      .keys(keys)
      .value((d, key) => d[key]);

    const series = stack(preparedData);

    // --- Scales ---
    const x = d3.scaleBand()
      .domain(preparedData.map(d => d.date))
      .range([marginLeft, width - marginRight])
      .padding(0.15);

    const y = d3.scaleLinear()
      .domain([0, d3.max(series, s => d3.max(s, d => d[1]))]).nice()
      .range([height - marginBottom, marginTop]);

    // Flashy colors
    const color = d3.scaleOrdinal()
      .domain(keys)
      .range(['#ff4d4d',   // bright red for "Didn't like it"
              '#00cc66',   // bright green for "Liked it"
              '#ffcc00']); // bright yellow for "Exceptional"

    // --- SVG container ---
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("max-width", "100%")
      .style("height", "auto")
      .style("font-family", "'Inter', system-ui, sans-serif");

    // --- Background grid (light and subtle) ---
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y)
        .ticks(6)
        .tickSize(-(width - marginLeft - marginRight))
        .tickFormat("")
      )
      .style("stroke", "#e0e0e0")
      .style("stroke-dasharray", "2,2")
      .style("opacity", 0.6);

    // --- Draw bars with animation ---
    const barGroups = svg.append("g")
      .selectAll("g")
      .data(series)
      .join("g")
      .attr("fill", d => color(d.key))
      .attr("class", d => `bar-group bar-group-${d.key}`);

    // Rectangular bars (no rounded corners)
    barGroups.selectAll("rect")
      .data(d => d)
      .join("rect")
      .attr("x", d => x(d.data.date))
      .attr("y", d => y(0)) // start from zero for animation
      .attr("height", 0)
      .attr("width", x.bandwidth())
      .on("mouseenter", (event, d) => {
        setTooltipData({
          date: d.data.date,
          red: d.data.red,
          green: d.data.green,
          yellow: d.data.yellow
        });
        setTooltipPos({ x: event.pageX, y: event.pageY });
      })
      .on("mousemove", (event) => {
        setTooltipPos({ x: event.pageX, y: event.pageY });
      })
      .on("mouseleave", () => {
        setTooltipData(null);
      })
      .transition()
      .duration(800)
      .delay((d, i) => i * 20)
      .attr("y", d => y(d[1]))
      .attr("height", d => y(d[0]) - y(d[1]));

    // --- Axes ---
    // X axis
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%a %d"))
        .tickSizeOuter(0)
      )
      .style("font-size", "11px")
      .selectAll("text")
      .attr("transform", "rotate(-25), translate(10,5)")
      .style("text-anchor", "end")
      .attr("dx", "-0.5em")
      .attr("dy", "0.3em");

    // Y axis
    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(6, "s"))
      .style("font-size", "11px");

    // --- Legend with descriptive labels ---
    const legend = svg.append("g")
      .attr("transform", `translate(${marginLeft}, ${marginTop - 25})`);

    const legendLabels = {
      red: "Didn't like it",
      green: "Liked it",
      yellow: "Exceptional"
    };

    keys.forEach((key, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(${i * 100}, 0)`);

      legendRow.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", color(key))
        .attr("rx", 0)   // square for consistency
        .attr("ry", 0);

      legendRow.append("text")
        .attr("x", 20)
        .attr("y", 12)
        .attr("fill", "#333")
        .style("font-size", "12px")
        .text(legendLabels[key]);
    });

  }, [data]);

  return (
    <>
      <svg ref={svgRef} style={{position: "absolute", left: "50%", transform: "translateX(-50%)"}}></svg>
      {tooltipData && (
        <div
          ref={tooltipRef}
          style={{
            position: "absolute",
            left: tooltipPos.x,
            top: tooltipPos.y,
            background: "rgba(30, 30, 30, 0.9)",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            pointerEvents: "none",
            fontSize: "12px",
            fontFamily: "sans-serif",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transform: "translate(-50%, -120%)", // closer to mouse (was -100%)
            whiteSpace: "nowrap",
            zIndex: 100,
          }}
        >
          <div><strong>{d3.timeFormat("%A %d, %B")(tooltipData.date)}</strong></div>
          <div style={{ color: "#ff4d4d" }}>🔴 Didn't like it: {tooltipData.red}</div>
          <div style={{ color: "#00cc66" }}>🟢 Liked it: {tooltipData.green}</div>
          <div style={{ color: "#ffcc00" }}>🟡 Exceptional: {tooltipData.yellow}</div>
        </div>
      )}
    </>
  );
};

export default StackedBarChart;