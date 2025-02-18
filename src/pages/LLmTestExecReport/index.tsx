import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, CheckboxProps, Input } from 'antd';

import { SectionContainer, Container, DatesContainer } from './styled';
import Button from '../../components/Button';
import { selectors, postExecReportRequest } from '../../store/modules/llm/actions';

const { TextArea } = Input;

const defaultPrompt = `
GRIIPS is a web application that stores information about legislations and regulations that restrict the use of potentially harmful chemical substance in the manufacture of Toyota"s products.
      
There is a metadata field called "Jurisdiction" associated with each legislation or regulation. This "Jurisdiction" can have the following values: "USA", "EUROPE", "CANADA", "GLOBAL".

There is another field called "Application Area", which can have the following values:
"Articles", "Operations - Direct", "Operations - Indirect" and "Service Products". 

The answer should be only the result, without any briefing like "Here is your summary" or anything like it

Use the content below to generate 1 or 2 paragraphs for an executive report summarizing the updates below for {type}:
{content}
`
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Calculate today's date and the date 30 days ago
const today = new Date();
const thirtyDaysAgo = new Date(today);
thirtyDaysAgo.setDate(today.getDate() - 30);

// Format the dates as yyyy-mm-dd
const defaultDateTo = formatDate(today);
const defaultDateFrom = formatDate(thirtyDaysAgo);

const LLmTestExecSummary: React.FC = () => {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [result, setResult] = useState<any>();
  const [dateFrom, setDateFrom] = useState<string>(defaultDateFrom);
  const [dateTo, setDateTo] = useState<string>(defaultDateTo);
  const [removeFirstRow, setRemoveFirstRow] = useState(false);
  const execReport: any = useSelector(
    selectors.execReport
  );

  const handleRequest = () => {
    dispatch(postExecReportRequest({ 
      prompt, 
      date_from: dateFrom, 
      date_to: dateTo,
      remove_first_row: removeFirstRow ?? false
    }));
  }

  const handleChangeDateFrom = (value) => {
    setDateFrom(value);
  }
  const handleChangeDateTo = (value) => {
    setDateTo(value);
  }


  useEffect(() => {
    setResult(execReport);
  }, [execReport]);

  const onChangeCheck: CheckboxProps['onChange'] = (e) => {
    console.log('checked = ', e.target.checked);
    setRemoveFirstRow(e.target.checked);
  };

  return (
    <Container>
      <SectionContainer>
        <TextArea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          autoSize />
      </SectionContainer>
      <SectionContainer>
        <p>Date range to generate executive report, the dates should be in the format yyyy-mm-dd</p>
        <DatesContainer>
          <Input
            value={dateFrom}
            onChange={(e) => handleChangeDateFrom(e.target.value)}
            style={{ marginRight: '10px', width: '150px' }}
          />
          <Input
            value={dateTo}
            onChange={(e) => handleChangeDateTo(e.target.value)}
            style={{ width: '150px' }}
          />
        </DatesContainer>
      </SectionContainer>
      <SectionContainer>
        <Checkbox onChange={onChangeCheck}>Remove first pharagraph</Checkbox>
      </SectionContainer>
      <SectionContainer>
        <Button
          type="primary"
          text="Send Request"
          onClick={handleRequest}
        />
      </SectionContainer>
      <SectionContainer>Regulations</SectionContainer>
      <SectionContainer>
        {result?.regulations}
      </SectionContainer>
      <br/>
      <SectionContainer>Legislations</SectionContainer>
      <SectionContainer>
        {result?.legislations}
      </SectionContainer>
    </Container>
  );
};

export default LLmTestExecSummary;
