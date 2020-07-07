import React, { useState, useEffect, useRef } from 'react';
import faChevronLeft from './chevron-left.svg';
import faChevronRight from './chevron-right.svg';
import './index.css';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

/**
 *
 * @param {{
 *      onDateSelected:Function
 * }} props
 */
const Datepicker = (props) => {
  const { onDateSelected, visible = false, visibilityCallback } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCell, setSelectedCell] = useState({});
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (visible === true) {
      wrapperRef.current.focus();
    }
  }, [visible]);
  const onLeftButtonClick = () => {
    /* Reset selected cell */
    setSelectedCell({});

    /* Decrement current month by 1 */
    setCurrentDate(
      new Date(currentDate.setMonth(currentDate.getMonth() - 1))
    );
  };

  const onRightButtonClick = () => {
    setSelectedCell({});
    setCurrentDate(
      new Date(currentDate.setMonth(currentDate.getMonth() + 1))
    );
  };

  return (
    <div ref={wrapperRef} tabIndex={0} onBlur={() => visibilityCallback(false)} id='ss-datepicker' className={visible ? 'slide-in-top' : ''} style={{ visibility: visible ? 'visible' : 'collapse' }}>
      <div className='grid-container'>
        <div className='ss-title-bar'>
          <div
            style={{ marginLeft: '1%' }}
            onClick={onLeftButtonClick}
            className='date-btn'
          >
            <img
              width={8}
              className='ss-left-button'
              src={faChevronLeft}
            />
          </div>

          <h1 className='ss-date-month'>
            {getMonth(currentDate.getMonth())}&nbsp;
            {currentDate.getFullYear()}
          </h1>
          <div
            style={{ marginRight: '1%' }}
            onClick={onRightButtonClick}
            className='date-btn'
          >
            <img
              width={8}
              className='ss-right-button'
              src={faChevronRight}
            />
          </div>
        </div>

        <div className='dp-cell dp-c-1 dp-month'>Sun</div>
        <div className='dp-cell dp-c-2 dp-month'>Mon</div>
        <div className='dp-cell dp-c-3 dp-month'>Tue</div>
        <div className='dp-cell dp-c-4 dp-month'>Wed</div>
        <div className='dp-cell dp-c-5 dp-month'>Thu</div>
        <div className='dp-cell dp-c-6 dp-month'>Fri</div>
        <div className='dp-cell dp-c-7 dp-month'>Sat</div>

        {renderDatePicker(
          currentDate,
          onDateSelected,
          selectedCell,
          setSelectedCell,
          visibilityCallback
        )}
      </div>
    </div>
  );
};

function getMonth (month) {
  return months[month];
}

/**
 *
 * @param {Date} currentDate
 * @param {Function} onDateSelected
 * @param {*} selectedCell
 * @param {*} setSelectedCell
 */
function renderDatePicker (
  currentDate,
  onDateSelected,
  selectedCell,
  setSelectedCell,
  visibilityCallback
) {
  /* Set iterator to first day of current month */
  const iteratorDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const currentMonth = currentDate.getMonth();

  const prevMonthDate = new Date(iteratorDate);
  const nextMonthDate = new Date(iteratorDate);
  prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

  /* Iterator set to first day of the week of the first day of the month
     *
     * E.g if first day of the month is Wednesday, June 1st, iterator will
     * be set to Sunday, May 29th
     */
  iteratorDate.setDate(iteratorDate.getDate() - iteratorDate.getDay());

  /* Dates that will be rendered for the current month */
  const dates = [];

  /* Calculate current dates to display  */
  while (
    isIteratorDateInPreviousMonth(iteratorDate, prevMonthDate) ||
        isIteratorDateInNextMonth(iteratorDate, nextMonthDate) ||
        iteratorDate.getMonth() === currentMonth
  ) {
    dates.push(new Date(iteratorDate));
    iteratorDate.setDate(iteratorDate.getDate() + 1);
  }

  return dates.map((date) => {
    return (
      <div
        key={date.getTime()}

        onClick={(e) => {
          e.preventDefault();
          /* Dates not within current month are not selectable */
          if (!isDateCellSelectable(date, currentMonth)) return;

          /* Set cell as selected */
          setSelectedCell({
            [date.getTime()]: {
              isSelected: true
            }
          });

          visibilityCallback(false);

          onDateSelected(formatDate(date));
        }}
        className={[
          'dp-cell',
                    `dp-c-${date.getDay() + 1}`,
                    applySelectedDateStyles(date, currentMonth, selectedCell)
        ].join(' ')}
      >
        <div className={isDateCellSelectable(date, currentMonth) ? '' : 'dp-text-muted'}>
          {date.getDate()}
        </div>
      </div>
    );
  });
}

function formatDate (date) {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
/**
 *
 * @param {Date} iterator The current iterator
 * @param {Date} prevMonth The previous month
 * @returns {boolean}
 */
function isIteratorDateInPreviousMonth (iterator, prevMonth) {
  if (prevMonth.getMonth() === iterator.getMonth()) {
    return true;
  }

  return false;
}

/**
 *
 * @param {Date} iterator The current iterator
 * @param {Date} nextMonth The next month
 *
 * @returns {boolean}
 */
function isIteratorDateInNextMonth (iterator, nextMonth) {
  if (
    nextMonth.getMonth() === iterator.getMonth() &&
        iterator.getDay() !== 0
  ) {
    return true;
  }

  return false;
}

function applySelectedDateStyles (currentDate, currentMonth, selectedCell) {
  if (
    isDateCellSelectable(currentDate, currentMonth) &&
        selectedCell[currentDate.getTime()] !== undefined &&
        selectedCell[currentDate.getTime()].isSelected === true
  ) {
    return 'dp-cell-selected';
  }

  return '';
}

function isDateCellSelectable (currentDate, currentMonth) {
  const now = new Date();

  if (currentDate.getMonth() === now.getMonth()) {
    if (currentDate.getDate() >= now.getDate()) {
      return true;
    } else {
      return false;
    }
  }

  if (currentDate.getMonth() === currentMonth) {
    return true;
  }

  return false;
}
export default Datepicker;
