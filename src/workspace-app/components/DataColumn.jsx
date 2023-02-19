import { useEffect, useState, useRef, forwardRef } from 'react';
import ScrollTop from '../../common/ScrollTop';
import VerticalFoldingBar from './VerticalFoldingBar';

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
              className={`y-scroll data-column-content ${name}`}
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
