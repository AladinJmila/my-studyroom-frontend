import { useEffect, useState, useRef, forwardRef } from 'react';
import ScrollTop from '../../common/ScrollTop';
import VerticalFoldingBar from './VerticalFoldingBar';

const containerStyles = {
  margin: '5px 10px',
  minWidth: 500,
  maxWidth: 500,
  display: 'inline-block',
  height: '90vh',
};

if (window.innerWidth < 500) {
  containerStyles.minWidth = window.innerWidth - 55;
  containerStyles.maxWidth = window.innerWidth - 55;
}
const DataColumn = forwardRef(
  ({ name, data, color, icon, show, count, setShow, setRef }, ref) => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const topRef = useRef();
    const divRef = useRef();
    const myRef = useRef();

    useEffect(() => {
      setRef(myRef);
    }, []);

    const handleScrollTop = () => {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const toggleShowScrollTop = () => {
      const div = divRef.current;
      const scrolled = div.scrollTop;
      setShowScrollTop(scrolled > 300 ? true : false);
    };

    return (
      <div ref={myRef}>
        <div
          ref={ref}
          style={{ padding: 0, height: '100%' }}
          className='data-column'
        >
          <VerticalFoldingBar
            name={name}
            color={color}
            icon={icon}
            show={show}
            count={count}
            setShow={setShow}
            itemRef={myRef}
          />
          {show && (
            <div
              ref={divRef}
              onScroll={toggleShowScrollTop}
              style={containerStyles}
              className='y-scroll'
            >
              <div ref={topRef}></div>
              {showScrollTop && <ScrollTop onClick={handleScrollTop} />}
              <h2>{name}</h2>
              {data}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default DataColumn;
