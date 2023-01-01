import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { yearPaginate } from '../services/StatsService';
import {
  setSelectedDayViz,
  loadVizData,
} from '../../store/apps/timerRecordsActions';
import YearlyActivityBar from './YearlyActivityBar';
import YearlyActivityPie from './YearlyActivityPie';

const YearlyActivity = ({ vizData }) => {
  // const { vizData } = useSelector(state => state.apps.timerRecords);
  // const [pageIndex, setPageIndex] = useState(vizData?.length - 1);
  const [pageIndex, setPageIndex] = useState(1);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // console.log(filteredData);

  const filterData = {
    subject: { name: 'Genesys', _id: '620e13f300b78f00146ff85e' },
    groups: [
      [
        { name: 'Genesys', _id: '62383ee2519aae00146fc4f4', label: 'Admin' },
        { name: 'Genesys-DX', _id: null, label: 'Admin' },
        { name: 'Planning', _id: null, label: 'Admin' },
      ],
      [
        {
          name: 'Training',
          _id: '62383fa1519aae00146fc4f6',
          label: 'Training',
        },
        { name: 'GenEd-Training', _id: null, label: 'Training' },
        { name: 'GenEd-PersonalGrowth', _id: null, label: 'Training' },
        { name: 'Coding', _id: null, label: 'Training' },
        { name: 'Design', _id: null, label: 'Training' },
      ],
      [
        {
          name: 'RBS',
          _id: '630884ed86c2d30014c4baea',
          label: 'Billable',
        },
        {
          name: 'RBS Bankline',
          _id: '630884ed86c2d30014c4baea',
          label: 'Billable',
        },
        {
          name: 'Vodafone',
          _id: '62b44080a3eabc00145a2207',
          label: 'Billable',
        },
        {
          name: 'SeeGroup',
          _id: '6266850ace78b30014ff5e2a',
          label: 'Billable',
        },
        {
          name: 'NatWest',
          _id: '624abd670a679200141215c9',
          label: 'Billable',
        },
        { name: 'ATOS', _id: '6241c1bbd4fda20014682c00', label: 'Billable' },
      ],
    ],
  };

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(loadVizData());

    dispatch(setSelectedDayViz(vizData[pageIndex]));
    setFilteredData(yearPaginate(vizData, filterData));

    setData(filteredData[pageIndex]);
  }, [pageIndex, vizData]);

  return (
    <div
      className='mt-4 mb-4'
      style={{
        padding: '1rem 2rem 1rem 2rem',
        border: '#fdfdfd solid 2px',
        overflow: 'auto',
        position: 'relative',
        borderRadius: '10px',
        boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
      }}
    >
      <div className='d-flex justify-content-around flex-wrap'>
        <YearlyActivityBar data={data} />
        <YearlyActivityPie data={data} />
      </div>

      <div
        className='d-flex justify-content-between flex-wrap pt-2'
        style={{ borderTop: '1px solid grey', color: 'grey' }}
      >
        <h5 className='m-0'>Genesys</h5>
      </div>
    </div>
  );
};

export default YearlyActivity;
