import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  startDate: Date;
  factDate: string;
  setStartDate: Dispatch<SetStateAction<Date>>;
  setDate: (date: string) => void;
};

type InputProps = {
  value?: string;
  onClick?: () => void;
};

export const TheDatePicker = ({ startDate, setStartDate, setDate }: Props) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const MyContainer = ({ className, children }: any) => {
    return (
      <div style={{ padding: "1px", background: "red", color: "white" }}>
        <CalendarContainer className={className}>
          <div style={{ background: "white" }}>What is your favorite day?</div>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  // eslint-disable-next-line react/display-name
  const DateInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ value, onClick }, ref) => {
      return (
        <div>
          <input
            type="text"
            value={value}
            className="px-2 py-1 rounded-l-md border-2 border-white background-white"
            onClick={onClick}
            readOnly
          />
          <button
            onClick={onClick}
            className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500  text-zinc-100 px-2 py-1 cursor-pointer"
          >
            <span>Click me</span>
          </button>
        </div>
      );
    }
  );

  return (
    <DatePicker
      renderCustomHeader={({
        date,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>

          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      dateFormat="MM/dd"
      selected={startDate}
      onChange={(date) => {
        date && setStartDate(date);
      }}
      calendarContainer={MyContainer}
      shouldCloseOnSelect={false}
      placeholderText="Click to select a date"
      todayButton={new Date().toDateString()}
      customInput={<DateInput />}
    />
  );
};
