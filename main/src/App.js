import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'
import './App.css';

function App() {
  const [data] = useState([15, 60, 10, 35, 75, 10, 10])
  const [years] = useState([2000, 2001, 2002, 2003, 2004, 2005, 2006])
  const svgRef = useRef()

  useEffect(() => {
    // setting up svg
    const w = 400
    const h = 100
    const margin_data_percent = 0.2
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3')
      .style('margin-top', '50')
      .style('overflow', 'visible')

    // setting the scaling
    const max_data = d3.max(data)
    const min_data = d3.min(data)
    const margin_data = (max_data - min_data) * margin_data_percent

    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w])
    const yScale = d3.scaleLinear()
      .domain([min_data - margin_data, max_data + margin_data])
      .range([h, 0])
    const generateScaledLine = d3.line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveNatural)

    // setting the axes 
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(i => {return i % 2 === 0 ? years[i] : "";})
    const yAxis = d3.axisLeft(yScale)
      .ticks(5)

    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h})`)
    svg.append('g')
      .call(yAxis)

    // setting up the data for the svg
    svg.selectAll('.line')
      .data([data])
      .join('path')
        .attr('d', d => generateScaledLine(d))
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)

  }, [data])

  return (
    <div className="App">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default App;
