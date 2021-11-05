const Star = ({ starred }) => {
  let classes = starred ? 'fa fa-star' : 'fa fa-star-o';
  return (
    <i
      className={classes}
      style={starred ? { color: '#ffe563' } : { color: 'inherit' }}
      aria-hidden='true'
    ></i>
  );
};

export default Star;
