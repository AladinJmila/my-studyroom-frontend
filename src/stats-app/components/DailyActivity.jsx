import * as d3 from 'd3'
import {  useSelector } from 'react-redux'


const DailyActivity = () => {
    const data = useSelector(state => state.apps.timerRecords.vizData)


    const width= 600
    const height = 200
    const margin = {top: 30, right: 10, bottom: 0, left: 30}
    const formatValue = x => isNaN(x) ? 'N/A' : x.toLacaleString('en')
    const formatPercent = d3.format('.1%')
    const x = d3.scaleLinear()
                .range([margin.left, width - margin.right])
    const y = 0
    // const y = d3.scaleBand()
    //             .domain(data?.map(d => d.name))
    //             .range([margin.top, height - margin.bottom])
    //             .padding(0.08)

  

    const XAxis = g => g.attr('transform', `translate(${margin.left},0)`)
                        .call(d3.axisTop(x).ticks(width / 100, '%'))
                        .call(g => g.selectAll('.domain'.remove()))

    const yAxis = g => g.att('transfrom', `translate(${margin.left},0)`)
                        .call(d3.axisLeft(y).tickSizeOuter(0))
                        .call(g => g.selectAll('.domain').remove())

    // const color = d3.scaleOrdinal()
    //                 .domain(data?.map(d => d.key))
    //                 .range(d3.schemeSpectral[data.length])
    //                 .unknown('#ccc')

    
    const chart = () => {
        const svg = d3.create('svg')
                    .attr('viewBox', [0, 0, width, height])
                    .style('overflow', 'visible')
    }

    return (
        <div className='mt-4 mb-4' style={{ width: '100%' }}>
            <h1>Daily Activity</h1>
        </div>
    )
}
 
export default DailyActivity;