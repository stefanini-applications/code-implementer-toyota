import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';

import { SectionContainer, Container } from './styled';
import Button from '../../components/Button';
import { selectors, postSubstanceExecSummaryRequest } from '../../store/modules/llm/actions';

const { TextArea } = Input;

const defaultPrompt = `
  GRIIPS is a web application that stores information about legislations and regulations that restrict the use of potentially harmful chemical substance in the manufacture of Toyota's products.
  
  GRIIPS contains a page for each chemical substance, where are all of the information about that substance is documented. 
  There is a metadata field called 'Jurisdiction' associated with each legislation or regulation. This 'Jurisdiction' can have the following values: "USA", "EUROPE", "CANADA", "GLOBAL".

  There is another field called 'Application Area', which can have the following values:
  "Articles", "Operations - Direct", "Operations - Indirect" and "Service Products". 

  The response should have only the following format:
  "USA": xxxxxxxx
  "EUROPE": xxxxxxxx
  "CANADA": xxxxxxxx
  "GLOBAL": xxxxxxxx

  Use the content below to generate an executive summary for a substance page, with content for each 'Jurisdiction' mentioned above. Do not use any external information, only use the information provided below. If any information about application areas is included in the generated executive summary, ensure that the provided values mentioned above are used to specify which application areas are being referenced.


  {content}
`

const LLmTestExecSummary: React.FC = () => {
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState(defaultPrompt);
  const [result, setResult] = useState('');
  const [substance, setSubstance] = useState<any>(106);
  const substanceExecSummary: any = useSelector(
    selectors.substanceExecSummary
  );

  const handleRequest = () => {
    dispatch(postSubstanceExecSummaryRequest({ prompt, substance }));
  }

  const handleChangeSubstance = (value) => {
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(value) || value === '' || value === '-') {
      setSubstance(value);
    }
  }
  
  const handleBlur = (value) => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    setSubstance(valueTemp.replace(/0*(\d+)/, '$1'));
  };

  useEffect(() => {
    setResult(substanceExecSummary);
  }, [substanceExecSummary]);

  return (
    <Container>
      <SectionContainer>
        <TextArea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          autoSize />
      </SectionContainer>
      <SectionContainer>
        <Input
          value={substance}
          onChange={(e) => handleChangeSubstance(e.target.value)}
          onBlur={(e) => handleBlur(e.target.value)}
          maxLength={16}
        />
      </SectionContainer>
      <SectionContainer>
        <Button
          type="primary"
          text="Send Request"
          onClick={handleRequest}
        />
      </SectionContainer>
      <SectionContainer>
        {result}
      </SectionContainer>
    </Container>
  );
};

export default LLmTestExecSummary;
