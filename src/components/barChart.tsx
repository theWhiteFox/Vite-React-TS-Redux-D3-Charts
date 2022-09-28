import { useEffect, useRef, useState } from 'react'
import { axisBottom, axisLeft, max, scaleBand, scaleLinear, select, Selection } from 'd3';

const initialData = [
  {
    name: 'foo',
    units: 32,
  },
  {
    name: 'bar',
    units: 67,
  },
  {
    name: 'baz',
    units: 81,
  },
  {
    name: 'hoge',
    units: 38,
  },
  {
    name: 'piyo',
    units: 28,
  },
  {
    name: 'hogera',
    units: 59,
  },
]

const dimensions = {
  width: 800,
  height: 500,
  chartWidth: 700,
  chartHeight: 500,
  marginLeft: 100,
  marginBottom: 40
}

const barChart = () => {
  const d3Chart = useRef<SVGSVGElement | null>(null);
  const [selection, setSelection] = useState<null | Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null)

  const [data, setData] = useState(initialData)

  const maxValue = max(data, d => d.units)
  const y = scaleLinear()
    .domain([0, maxValue!])
    .range([dimensions.chartHeight, 0])

  const x = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, dimensions.chartWidth])
    .paddingInner(0.05)

  const yAxis = axisLeft(y)
  const xAxis = axisBottom(x)

  useEffect(() => {
    if (!selection) {
      setSelection(select(d3Chart.current))
    } else {

      const xAxisGroup = selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, ${dimensions.chartHeight})`)
        .call(xAxis)

      const yAxisGroup = selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
        .call(yAxis)

      selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', d => dimensions.height - y(d.units))
        .attr('x', d => x(d.name)!)
        .attr('y', d => y(d.units))
        .attr('fill', 'orange')
    }
  }, [selection])

  return (
    <div id='3dDemo'>
      <svg ref={d3Chart} width={dimensions.width} height={dimensions.height}>
      </svg>
    </div>
  );
};

export default barChart;
