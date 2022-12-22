import { CircularProgressbar } from 'react-circular-progressbar';

const ProgressStats = ({ condition, tasksPercentage, resourcesPercentage }) => {
  return (
    <div className='d-flex flex-row justify-content-between mt-3'>
      <div className='text-center me-2 ms-2'>
        <CircularProgressbar
          value={condition ? tasksPercentage : 0}
          text={`${condition ? tasksPercentage : 0}%`}
        />
        <h5 className='mt-2'>Tasks</h5>
      </div>
      <div className='text-center ms-2 me-2'>
        <CircularProgressbar
          value={condition ? resourcesPercentage : 0}
          text={`${condition ? resourcesPercentage : 0}%`}
        />
        <h5 className='mt-2'>Resources</h5>
      </div>
    </div>
  );
};

export default ProgressStats;
