/* eslint-disable no-unused-expressions */
import React from 'react';
import { DatePicker } from 'antd';
import dayjs from "dayjs";
import { ContainerDate } from './styled';

const { RangePicker } = DatePicker;

interface IRangePicker {
  format: string;
  onChange: any;
  defaultValue?: [string | Date, string | Date];
}

const Calendar: React.FC<IRangePicker> = ({
  format,
  onChange,
  defaultValue,
}) => {
  return (
    <ContainerDate>
      <RangePicker
        format={format ?? "MMM-DD-YYYY"}
        placeholder={[format ?? "MMM-DD-YYYY", format ?? "MMM-DD-YYYY"]}
        defaultValue={defaultValue ? [dayjs(defaultValue[0]), dayjs(defaultValue[1])] : undefined}
        onChange={(dates) => {
          onChange(dates?.map((date) => date?.toDate()));
        }}
      />
    </ContainerDate>
  );
};

export default Calendar;