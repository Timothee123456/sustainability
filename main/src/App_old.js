import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'
import './App.css';

function App() {
  const [dataset, setDataset] = useState([
    { date: new Date("2020-08-09"), value:  52650  },
    { date: new Date("2020-09-09"), value:  54830  },
    { date: new Date("2020-10-09"), value:  49300  },
    { date: new Date("2020-11-09"), value:  45480  },
    { date: new Date("2020-12-09"), value:  25190  },
    { date: new Date("2021-01-09"), value:  32010  },
    { date: new Date("2021-02-09"), value:  23850  },
    { date: new Date("2021-03-09"), value:  30230  },
    { date: new Date("2021-04-09"), value:  37790  },
    { date: new Date("2021-05-09"), value:  67640  },
    { date: new Date("2021-06-09"), value:  60820  },
    { date: new Date("2021-07-09"), value:  45640  },
    { date: new Date("2021-08-09"), value:  63890  },
    { date: new Date("2021-09-09"), value:  81460  },
    { date: new Date("2021-10-09"), value:  56690  },
    { date: new Date("2021-11-09"), value:  45410  },
    { date: new Date("2021-12-09"), value:  34830  },
    { date: new Date("2022-01-09"), value:  35060  },
    { date: new Date("2022-02-09"), value:  22130  },
    { date: new Date("2022-03-09"), value:  25130  },
    { date: new Date("2022-04-09"), value:  48620  },
    { date: new Date("2022-05-09"), value:  62620  },
    { date: new Date("2022-06-09"), value:  69870  },
    { date: new Date("2022-07-07"), value:  66080  },
    { date: new Date("2022-08-09"), value:  61320  },
    { date: new Date("2022-09-09"), value:  81460  },
    { date: new Date("2022-10-09"), value:  56690  },
    { date: new Date("2022-11-09"), value:  54880  },
    { date: new Date("2022-12-09"), value:  37710  },
    { date: new Date("2023-01-09"), value:  46290  },
    { date: new Date("2023-02-09"), value:  38090  },
    { date: new Date("2023-03-09"), value:  46340  },
    { date: new Date("2023-04-09"), value:  55420  },
    { date: new Date("2023-05-09"), value:  86360  },
    { date: new Date("2023-06-09"), value:  90440  },
    { date: new Date("2023-07-09"), value:  69660  },
    { date: new Date("2023-08-09"), value:  75620  },
    { date: new Date("2023-09-09"), value:  88680  },
    { date: new Date("2023-10-09"), value:  68650  },
    { date: new Date("2023-11-09"), value:  55510  },
    { date: new Date("2023-12-09"), value:  39460  },
    { date: new Date("2024-01-09"), value:  53950  },
    { date: new Date("2024-02-09"), value:  49350  },
    { date: new Date("2024-03-09"), value:  57660  },
    { date: new Date("2024-04-09"), value:  72680  },
    { date: new Date("2024-05-09"), value:  55105  },
    { date: new Date("2024-05-22"), value:  89290  },
    { date: new Date("2024-07-01"), value:  67450  },
  ])
  const values = dataset.map(d => d.value)
  const dates = dataset.map(d => d.date)
  const svgRef = useRef()

  useEffect(() => {
    // setting up svg
    const w = 900
    const h = 360
    const margin_data_percent = 0.2
    const margin = { top: 20, right: 20, bottom: 60, left: 60 }
    
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3')
      .style('margin-top', '50')
      .style('overflow', 'visible')
      
    // setting the scaling
    const max_data = d3.max(values)
    const min_data = d3.min(values)
    const margin_data = (max_data - min_data) * margin_data_percent

    const xScale = d3.scaleTime()
      .domain(d3.extent(dates))
      .range([margin.left, w - margin.right])
      
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(values)])
      .range([h - margin.bottom, margin.top])

    const generateScaledLine = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .curve(d3.curveNatural)

    // setting the axes 
    const xAxis = d3.axisBottom(xScale)
      .ticks(d3.timeMonth.every(1))
      .tickFormat(d3.timeFormat('%b %Y'))
    const yAxis = d3.axisLeft(yScale)
      .ticks(5)

    svg.append('g')
      .attr('transform', `translate(0, ${h - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end")

    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)


    // setting up the data for the svg
    svg.append('path')
      .datum(dataset)
      .attr('class', 'line')
      .attr('d', d => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)

  }, [dataset])

  return (
    <div className="App">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default App;
