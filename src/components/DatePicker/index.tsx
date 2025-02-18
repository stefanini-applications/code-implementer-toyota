/* eslint-disable no-unused-expressions */
import React from 'react';
import { DatePicker } from 'antd';
import dayjs from "dayjs";
import { ContainerDate } from './styled';

interface IDatePicker {
  format: any;
  defaultValue?: any;
  onChange?: any;
  value?: any;
  openCalendar?: any;
  onSetOpenCalendar?: (openState: boolean) => void;
  width?: string;
}

const Calendar: React.FC<IDatePicker> = ({
  format,
  defaultValue,
  onChange,
  value,
  openCalendar,
  onSetOpenCalendar,
  width
}) => {
  const defVal = defaultValue ? dayjs(defaultValue) : undefined;
  const valVal = value ? dayjs(value) : undefined;

  return (
    <ContainerDate>
      <DatePicker
        format="MMM-DD-YYYY"
        placeholder={format}
        defaultValue={defVal}
        value={valVal}
        onChange={(date) => {
          onChange(date?.format('MM-DD-YYYY'));
        }}
        open={openCalendar}
        onOpenChange={(open) => {
          onSetOpenCalendar && onSetOpenCalendar(open);
        }}
        style={{
          width
        }}
      />
    </ContainerDate>
  );
};

export default Calendar;