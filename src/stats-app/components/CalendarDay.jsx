import { useSelector } from 'react-redux';

const CalendarDay = ({ index, dailyDurations }) => {
  const { selectedDayViz } = useSelector(state => state.apps.timerRecords);

  let color;
  let hours = dailyDurations.filter(
    item => Object.keys(item)[0] === String(index)
  );
  if (hours[0]) hours = hours[0][String(index)];

  switch (true) {
    case hours > 8:
      color = '#CC7400';
      break;

    case hours > 6:
      color = '#EB8500';
      break;

    case hours > 4:
      color = '#FF9C1A';
      break;

    case hours > 2:
      color = '#FFB452';
      break;

    case hours > 0:
      color = '#FFCE8F';
      break;

    default:
      color = '#D9D9D9';
      break;
  }

  const dayStyle = {
    height: '1.27rem',
    width: '1.27rem',
    backgroundColor: color,
    borderRadius: '0.65rem',
    margin: '0.2rem',
    boxShadow:
      selectedDayViz && selectedDayViz.dayOfYear === index
        ? '0px 0px 3px 3px #4d40d6'
        : '',
    marginTop: index === 0 ? 110 : '0.2rem',
  };

  return (
    <div title={hours ? hours : 0}>
      <div style={dayStyle}></div>
    </div>
  );
};

export default CalendarDay;
