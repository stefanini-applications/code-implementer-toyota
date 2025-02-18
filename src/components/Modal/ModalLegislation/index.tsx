/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Cell } from 'read-excel-file/types';
import readXlsxFile, { readSheetNames, Row } from 'read-excel-file';
import { Col, Radio, RadioChangeEvent, Row as RowLine, Tooltip } from 'antd';
import {
  AiOutlineCloudDownload,
  AiOutlineCloudUpload,
  AiFillQuestionCircle
} from 'react-icons/ai';
import Moment from 'moment';

import { translate } from '../../../locales';
import listToyotaJurisdictions from '../../../mocks/impact-tabs';
import phaseOptions from '../../../mocks/phase';
import dataDropdown from '../../../mocks/select-jurisdictions';
import {
  selectors as enumeratorsSelector,
  getJurisdictionsRequest,
  getAgencyRequest
} from '../../../store/modules/enumerators/actions';
import {
  createLegislationRecordRequest,
  editLegislationRecordRequest
} from '../../../store/modules/legislations/actions';
import { getSubstancesUsesRequest } from '../../../store/modules/substanceUses/actions';
import Button from '../../Button';
import CkEditor from '../../CkEditor';
import Input from '../../Input';
import Select from '../../Select';
import {
  Container,
  Content,
  MainSection,
  ContentWrapper,
  Wrapper,
  Label,
  MainSectionText,
  GeneralSection,
  ButtonsContainer,
  Overlay,
  UpdateModal,
  TitleModal,
  CloseIcon,
  JurisdictionWrapper,
  DropdownContainer,
  ErrorContainer,
  UploadDownloadSection,
  FilePlaceholder,
  ArrowUp,
  ArrowDown,
  IconSection,
  TextField,
  TextAreaField,
  InputWrapper
} from './styled';
import selectYear from '../../../mocks/select-year';
import Menu from '../../Menu';
import { ToastError } from '../../Toast';
import { getEnv } from '../../../utils/env-util';
import { genericS3Download } from '../../../services/api';

const stateBillTrackerColumns = [
  {
    title: 'Substance/Category',
    dataIndex: 0
  },
  {
    title: 'Bill Type',
    dataIndex: 1
  },
  {
    title: 'Application',
    dataIndex: 2
  },
  {
    title: 'State',
    dataIndex: 3
  },
  {
    title: 'Bill Number',
    dataIndex: 4
  },
  {
    title: 'Summary/Scope',
    dataIndex: 5
  },
  {
    title: 'Comments',
    dataIndex: 8
  }
];

interface IModalLegislation {
  open?: boolean;
  close?: any;
  editData?: any;
  modalTitle: any;
  updateList?: any;
  editOnlyPhase?: boolean;
}

const ModalLegislation: React.FC<IModalLegislation> = ({
  open,
  close,
  editData,
  modalTitle,
  updateList,
  editOnlyPhase = false
}) => {
  const history = useHistory();
  const listAgency = useSelector(enumeratorsSelector?.agency);
  const legislativeNameRef: any = useRef('');
  const nicknameRef: any = useRef('');
  const selectedUsesRef: any = useRef([]);
  const executiveSummary: any = useRef('');
  const resultValue: any = editData;
  const jurisdictionRef: any = useRef();
  const phaseRef: any = useRef();
  const legistativeBodyRef: any = useRef();
  const dispatch = useDispatch();
  const [emptyLegislationName, setEmptyLegislationName] = useState(false);
  const [maxLengthRegulationName, setMaxLengthRegulationName] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [autoFocusRegNick, setAutoFocusRegNick] = useState(false);
  const [maxLengthRegulationNickName, setMaxLengthRegulationNickName] =
    useState(false);
  const [phaseDropDownValue, setPhaseDropDownValue] = useState<any>(null);
  const [emptyJuridiction, setEmptyJuridiction] = useState(false);
  const [emptySubJuridiction, setEmptySubJuridiction] = useState(false);
  const [emptyLegislativePhase, setEmptyLegislativePhase] = useState(false);
  const [emptyYear, setEmptyYear] = useState(false);
  const [filteredAgencyList, setFilteredAgencyList] = useState<any>([]);
  const regulationName: any = useRef('');
  const regulationNickName: any = useRef('');
  const YearName: any = useRef('');
  const [regulationSummary, setregulationSummary] = useState('');
  const [regulatoryBody, setregulatoryBody] = useState<any>(null);
  const [jurisdiction, setJurisdiction] = useState<any>(null);
  const [phase, setPhase] = useState<any>(null);
  const [year, setYear] = useState<any>(null);
  const [status, setStatus] = useState<string>('active');
  const [iconMenu, setIconMenu] = useState(<ArrowDown />);
  const [recordType, setRecordType] = useState('TYPENEW');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      if (!resultValue) {
        regulationNickName.current = '';
        regulationName.current = '';
        setregulationSummary('');
      }
      setFilteredAgencyList([]);
      dispatch(getSubstancesUsesRequest());
      dispatch(getAgencyRequest({ type: '2', onlyActive: true }));
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (resultValue) {
      if (resultValue.Jurisdiction) {
        resultValue.Jurisdiction.tab = resultValue?.Jurisdiction?.description;
      }
      if (resultValue.Agency) {
        resultValue.Agency.tab = resultValue.Agency.description;
      }
      regulationNickName.current = resultValue.nickname;
      regulationName.current = resultValue.billTitle;
      setregulationSummary(resultValue.billEpaDocket);
      setregulatoryBody(resultValue.Agency);
      setJurisdiction(resultValue.Jurisdiction.id);
      setPhase(resultValue.phase);
      setPhaseDropDownValue({
        id: resultValue.phase,
        number: resultValue.phase
      });
      setYear(resultValue.year);
    }
  }, [resultValue]);

  useEffect(() => {
    if (resultValue && resultValue.Jurisdiction && listAgency) {
      setFilteredAgencyList(
        listAgency.filter(
          x =>
            x.Jurisdictions.find(
              j => j.id === resultValue.Jurisdiction.id.toString()
            ) !== undefined
        )
      );
      setStatus(resultValue.status);
    }
  }, [resultValue, listAgency]);

  function handleSubmit() {
    document.body.classList.remove('hide-overflow');
    if (
      regulationName.current &&
      jurisdiction &&
      regulatoryBody &&
      phase != undefined &&
      year != undefined
    ) {
      if (resultValue?.id) {
        dispatch(
          editLegislationRecordRequest({
            id: Number(resultValue?.id),
            active: true,
            agencyId: Number(regulatoryBody.id),
            phase:
              status.toLowerCase() === 'inactive' ||
              status.toLowerCase() === 'passed'
                ? 6
                : Number(phase),
            billEpaDocket: regulationSummary || '',
            billTitle: regulationName.current,
            categoryId: Number(resultValue?.categoryId) || 1,
            jurisdictionId: Number(jurisdiction),
            nickname: regulationNickName.current || '',
            recordType: resultValue?.recordType,
            tags: [],
            typeId: Number(resultValue?.typeId),
            year: Number(year),
            status,
            toyotaRegion: Number(localStorage.getItem('user.toyotaRegion'))
          })
        );
      } else {
        dispatch(
          createLegislationRecordRequest({
            active: true,
            agencyId: Number(regulatoryBody.id),
            phase: Number(phase),
            billEpaDocket: regulationSummary || '',
            billTitle: regulationName.current,
            categoryId: 1,
            jurisdictionId: Number(jurisdiction),
            nickname: regulationNickName.current || '',
            recordType: 2,
            tags: [],
            typeId: 1,
            status,
            year: Number(year)
          })
        );
      }
      close && close(phase);
      updateList && updateList();
    } else {
      console.log(year);
      !regulationName.current
        ? setEmptyLegislationName(true)
        : setEmptyLegislationName(false);
      !jurisdiction ? setEmptyJuridiction(true) : setEmptyJuridiction(false);
      !regulatoryBody
        ? setEmptySubJuridiction(true)
        : setEmptySubJuridiction(false);
      !phase ? setEmptyLegislativePhase(true) : setEmptyLegislativePhase(false);
      !year ? setEmptyYear(true) : setEmptyYear(false);
    }
  }

  const handleClose = () => {
    document.body.classList.remove('hide-overflow');
    setEmptyLegislationName(false);
    setEmptyJuridiction(false);
    setEmptySubJuridiction(false);
    setEmptyLegislativePhase(false);
    setEmptyYear(false);
    close();
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add('hide-overflow');
    } else {
      document.body.classList.remove('hide-overflow');
    }
  }, [open]);

  const handleClickMenu = e => {
    if (e.length > 0) {
      setIconMenu(<ArrowUp />);
    } else {
      setIconMenu(<ArrowDown />);
    }
  };

  const handleDownloadFile = async () => {
    let bucket = process.env.REACT_APP_PROD_YORDAS_S3_BUCKET;

    switch (getEnv()) {
      case 'local':
        bucket = process.env.REACT_APP_LOCAL_YORDAS_S3_BUCKET;
        break;
      case 'development':
        bucket = process.env.REACT_APP_DEV_YORDAS_S3_BUCKET;
        break;
      case 'qa':
        bucket = process.env.REACT_APP_QA_YORDAS_S3_BUCKET;
        break;
      default:
        break;
    }
    const url = await genericS3Download(
      bucket,
      'State Bill Tracker Template.xlsx'
    );

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleClickItem = e => {
    if (e.key === 'downloadIA') {
      handleDownloadFile();
    } else {
      inputRef.current?.click();
    }
  };

  const handleChooseFile = (e: any) => {
    const extension = e?.target?.files[0]?.name?.split('.').pop();
    const extAllowed: any = process.env.REACT_APP_XL_ATT_EXT_ALLOWED;

    if (!extAllowed?.includes(extension?.toUpperCase())) {
      ToastError('Invalid file format. Please upload an XLSX or XLS file.');
    } else if (e?.target?.files[0]?.size > 3145728) {
      // 3mb
      ToastError('File size exceeds 3MB. Please upload a smaller file.');
    } else {
      document.getElementById('loading-screen')!.style.visibility = 'visible';
      document.getElementById('loading-screen')!.style.opacity = '1';
      readSheets(e);
    }
  };
  function convertCellsToStrings(cells: Cell[]): string[] {
    return cells.map(cell => String(cell));
  }
  function hasAllMandatoryColumnsCaseInsensitive(
    row: string[],
    mandatoryColumns: string[]
  ): any {
    // Convert both arrays to lowercase and trim whitespace
    const lowerCaseTrimmedRow = row.map(column => column.toLowerCase().trim());
    const lowerCaseTrimmedMandatoryColumns = mandatoryColumns.map(column =>
      column.toLowerCase().trim()
    );

    // Filter missing columns
    const missingColumns = lowerCaseTrimmedMandatoryColumns.filter(
      column => !lowerCaseTrimmedRow.includes(column)
    );

    if (missingColumns.length > 0) {
      const capitalizedMissingColumns = missingColumns.map(
        capitalizeFirstLetter
      );
      return `${capitalizedMissingColumns.join(', ')}`;
    }

    return '';
  }
  function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const readSheets = async (e: any) => {
    const mandatoryColumns = stateBillTrackerColumns.map(x => x.title);

    try {
      const sheets = await readSheetNames(e.target.files[0]);

      if (!sheets.includes('Priority Legislation')) {
        throw new Error(
          'The file does not contain the sheet "Priority Legislation"'
        );
      }
      const sheet = await readXlsxFile(e.target.files[0], {
        sheet: 'Priority Legislation',
        trim: false
      });
      const stringRow: string[] = convertCellsToStrings(sheet[1]);

      const missingColumns = hasAllMandatoryColumnsCaseInsensitive(
        stringRow,
        mandatoryColumns
      );

      if (missingColumns) {
        throw new Error(
          `Missing required columns in the "Priority Legislation" sheet. Missing columns: ${missingColumns}`
        );
      }

      const listLegislations: any = [];

      const currentYear = Moment().year();
      const headerRow = sheet[1];

      const newColumnsIndex: any = stateBillTrackerColumns.map(x => {
        x.dataIndex = headerRow.findIndex(y => y === x.title);
        return x;
      });

      const substanceCategoryIndex = newColumnsIndex.find(
        x => x.title === 'Substance/Category'
      )?.dataIndex;
      const billTypeIndex = newColumnsIndex.find(
        x => x.title === 'Bill Type'
      )?.dataIndex;
      const applicationIndex = newColumnsIndex.find(
        x => x.title === 'Application'
      )?.dataIndex;
      const stateIndex = newColumnsIndex.find(
        x => x.title === 'State'
      )?.dataIndex;
      const billNumberIndex = newColumnsIndex.find(
        x => x.title === 'Bill Number'
      )?.dataIndex;
      const summaryScopeIndex = newColumnsIndex.find(
        x => x.title === 'Summary/Scope'
      )?.dataIndex;
      const commentsIndex = newColumnsIndex.find(
        x => x.title === 'Comments'
      )?.dataIndex;

      for (let i = 2; i < sheet.length; i++) {
        const row: Row = sheet[i];
        const legislation = {
          billTitle: `${row[stateIndex]} ${row[billNumberIndex]}`,
          nickname: `${row[substanceCategoryIndex]} ${row[billTypeIndex]} ${row[applicationIndex]} ${row[stateIndex]}`,
          jurisdictionId: 1, // USA
          agencyAcronym: row[stateIndex], // State acronym
          phase: 3,
          billEpaDocket: row[summaryScopeIndex], // Summary,
          currentYear,
          regulationUpdate: {
            agencyDate: extractDateFromString(row[commentsIndex]),
            comment: row[commentsIndex]
          }
        };

        listLegislations.push(legislation);
      }
      close();
      history.push('/legislation-bulk-upload', { state: { listLegislations } });
    } catch (error: any) {
      ToastError(error.message);
    } finally {
      document.getElementById('loading-screen')!.style.visibility = 'hidden';
      document.getElementById('loading-screen')!.style.opacity = '0';
    }
  };

  function extractDateFromString(input) {
    const dateRegex = /(\b(?:\d{1,2}[-/]\d{1,2}[-/]\d{2,4})\b)/;

    const match = input.match(dateRegex);

    if (match) {
      return convertToDateMMDDYYYY(match[0]);
    }
    return null;
  }

  function convertToDateMMDDYYYY(dateString: string): string | null {
    const [first, second, third] = dateString.split(/[-/]/);

    let retMonth;
    let retDay;
    let retYear;

    // If the year part is 2 digits, assume the format is mm-dd-yy or dd-mm-yy
    if (parseInt(first) > 12) {
      // If the first part is greater than 12, it's likely dd-mm-yy
      retDay = first;
      retMonth = second;
    } else {
      // Otherwise, assume mm-dd-yy
      retMonth = first;
      retDay = second;
    }
    // Assuming the input date format could be either dd-mm-yyyy or mm-dd-yyyy
    if (third.length === 4) {
      retYear = third;
    } else {
      retYear = `20${third}`; // Assuming 21st century for 2-digit years
    }

    return `${retMonth.padStart(2, '0')}/${retDay.padStart(2, '0')}/${retYear}`;
  }

  return open ? (
    <Container>
      <UpdateModal>
        <TitleModal>
          <p>{modalTitle}</p>
          <CloseIcon onClick={() => handleClose()} />
        </TitleModal>
        <Content>
          {!editData ? (
            <RowLine style={{ zIndex: '99999', marginTop: '10px' }}>
              <Col span={12}>
                <Radio.Group
                  onChange={(e: RadioChangeEvent) => {
                    setRecordType(e.target.value);
                  }}
                  defaultValue={recordType}
                >
                  <Radio value="TYPENEW">New</Radio>
                  <Radio value="TYPEUPLOAD">Upload</Radio>
                </Radio.Group>
              </Col>
            </RowLine>
          ) : null}

          {!editData && recordType === 'TYPEUPLOAD' ? (
            <UploadDownloadSection>
              <>
                <Menu
                  styling="button"
                  onClickItem={handleClickItem}
                  onClickMenu={handleClickMenu}
                  items={[
                    {
                      label: 'Upload Template',
                      key: 'SubMenu',
                      icon: iconMenu,
                      children: [
                        {
                          label: 'Upload spreadsheet',
                          key: 'uploadIA',
                          icon: <AiOutlineCloudUpload />
                        },
                        {
                          label: 'Download spreadsheet',
                          key: 'downloadIA',
                          icon: <AiOutlineCloudDownload />
                        }
                      ]
                    }
                  ]}
                />
                <FilePlaceholder
                  id="select-file"
                  ref={inputRef}
                  type="file"
                  name="file"
                  placeholder=""
                  onChange={(e: any) => handleChooseFile(e)}
                  onClick={(e: any) => {
                    // upload the same file again
                    e.target.value = null;
                  }}
                />
              </>
              <IconSection>
                <Tooltip
                  title="You can download an example of a spreadsheet acceptable for the system. Only insert files with an XLSX or XLS extension up to 3Mb"
                  placement="bottomRight"
                  arrow={{ pointAtCenter: true }}
                >
                  <AiFillQuestionCircle size={32} />
                </Tooltip>
              </IconSection>
            </UploadDownloadSection>
          ) : null}

          {recordType === 'TYPENEW' && (
            <>
              <MainSection>
                <InputWrapper>
                  <ContentWrapper>
                    <MainSectionText marginTop="-10px">
                      <Input
                        className="input-casnum"
                        type="form"
                        disableInput={editOnlyPhase}
                        defaultText={regulationName.current}
                        autoFocus={autoFocus}
                        onFocus={() => {
                          setAutoFocusRegNick(false);
                        }}
                        maxLength={255}
                        onChangeInput={value => {
                          regulationName.current = value;
                          if (regulationName.current.length > 255) {
                            setMaxLengthRegulationName(true);
                            setAutoFocus(true);
                          } else {
                            setMaxLengthRegulationName(false);
                          }
                        }}
                        formLabel={<Label noMargin>Legislation Name</Label>}
                        namePath="commonName"
                        triggerWarningMessage={emptyLegislationName}
                        warningMessage={translate(
                          'pages.regulatoryUpdates.toastEmpty'
                        )}
                      />
                      {maxLengthRegulationName && (
                        <ErrorContainer>Maximum Length is 255</ErrorContainer>
                      )}
                    </MainSectionText>
                  </ContentWrapper>

                  <ContentWrapper>
                    <MainSectionText marginTop="-10px">
                      <Input
                        type="form"
                        defaultText={regulationNickName.current}
                        disableInput={editOnlyPhase}
                        autoFocus={autoFocusRegNick}
                        maxLength={255}
                        onFocus={() => {
                          setAutoFocus(false);
                        }}
                        onChangeInput={value => {
                          regulationNickName.current = value;
                          if (regulationNickName.current.length > 255) {
                            setMaxLengthRegulationNickName(true);
                            setAutoFocusRegNick(true);
                          } else if (regulationNickName.current.length <= 255) {
                            setMaxLengthRegulationNickName(false);
                          }
                        }}
                        formLabel={<Label noMargin>Nickname</Label>}
                      />
                      {maxLengthRegulationNickName && (
                        <ErrorContainer>Maximum Length is 255</ErrorContainer>
                      )}
                    </MainSectionText>
                  </ContentWrapper>

                  <JurisdictionWrapper>
                    <MainSectionText>
                      <DropdownContainer marginTop="-10px">
                        <Select
                          labelValue="tab"
                          keyValue="id"
                          isDisabled={editOnlyPhase}
                          values={listToyotaJurisdictions}
                          inputRef={jurisdictionRef}
                          selectedValue={
                            resultValue
                              ? resultValue?.Jurisdiction?.description
                              : ''
                          }
                          defaultValue={resultValue?.Jurisdiction?.description}
                          onChange={(value: {
                            value: string;
                            label: React.ReactNode;
                          }) => {
                            setJurisdiction(value.value);
                            setregulatoryBody(null);
                            if (value) {
                              setEmptyJuridiction(false);
                            }
                            setFilteredAgencyList(
                              listAgency.filter(
                                x =>
                                  x.Jurisdictions.find(
                                    j => Number(j.id) === Number(value.value)
                                  ) !== undefined
                              )
                            );
                          }}
                          isFormType
                          formLabel={<Label noMargin>Jurisdiction</Label>}
                          namePath="jurisdiction"
                          triggerWarningMessage={emptyJuridiction}
                          warningMessage={translate(
                            'pages.regulatoryUpdates.toastEmpty'
                          )}
                          size="120px"
                        />
                      </DropdownContainer>
                    </MainSectionText>
                  </JurisdictionWrapper>
                </InputWrapper>

                <InputWrapper>
                  <ContentWrapper>
                    <MainSectionText>
                      <DropdownContainer>
                        <Select
                          labelValue="year"
                          keyValue="year"
                          values={
                            selectYear
                              .filter(
                                item =>
                                  item.year <= new Date().getFullYear() + 1
                              ) // Include current year and next year
                              .sort((a, b) => b.year - a.year) // Sort years in ascending order
                          } // Filter years till the current year
                          selectedValue={year}
                          onChange={value => {
                            setYear(value.value);
                            setEmptyYear(false);
                          }}
                          isFormType
                          formLabel={<Label noMargin>Year</Label>}
                          namePath="year"
                          triggerWarningMessage={emptyYear}
                          warningMessage={translate(
                            'pages.regulatoryUpdates.toastEmpty'
                          )}
                          size="120px"
                        />
                      </DropdownContainer>
                    </MainSectionText>
                  </ContentWrapper>

                  <ContentWrapper>
                    <MainSectionText>
                      <DropdownContainer>
                        <Select
                          labelValue="description"
                          keyValue="id"
                          values={filteredAgencyList}
                          isDisabled={editOnlyPhase}
                          selectedValue={
                            regulatoryBody ? regulatoryBody.description : ''
                          }
                          onChange={(value: {
                            value: string;
                            label: React.ReactNode;
                          }) => {
                            setregulatoryBody(
                              filteredAgencyList?.find(
                                x => x?.id === value.value
                              )
                            );
                            if (value) {
                              setEmptySubJuridiction(false);
                            }
                          }}
                          isFormType
                          formLabel={<Label noMargin>Sub-Jurisdiction</Label>}
                          namePath="subJuridiction"
                          triggerWarningMessage={emptySubJuridiction}
                          warningMessage={translate(
                            'pages.regulatoryUpdates.toastEmpty'
                          )}
                          size="300px"
                        />
                      </DropdownContainer>
                    </MainSectionText>
                  </ContentWrapper>

                  <ContentWrapper>
                    <MainSectionText>
                      <DropdownContainer>
                        <Select
                          labelValue="number"
                          keyValue="id"
                          values={phaseOptions}
                          isDisabled={
                            status === 'inactive' || status === 'passed'
                          }
                          selectedValue={
                            status === 'inactive' || status === 'passed'
                              ? 6
                              : phase
                          }
                          onChange={value => {
                            setPhase(value.value);
                            setEmptyLegislativePhase(false);
                          }}
                          isFormType
                          formLabel={<Label noMargin>Legislative Phase</Label>}
                          namePath="legislativePhase"
                          triggerWarningMessage={emptyLegislativePhase}
                          warningMessage={translate(
                            'pages.regulatoryUpdates.toastEmpty'
                          )}
                          size="300px"
                        />
                      </DropdownContainer>
                    </MainSectionText>
                  </ContentWrapper>

                  {editData ? (
                    <ContentWrapper>
                      <MainSectionText>
                        <DropdownContainer>
                          <Select
                            labelValue="label"
                            keyValue="value"
                            values={[
                              { label: 'Active', value: 'active' },
                              { label: 'Inactive', value: 'inactive' },
                              { label: 'Passed', value: 'passed' }
                            ]}
                            selectedValue={status}
                            onChange={value => {
                              setStatus(value.value);
                            }}
                            isFormType
                            formLabel={
                              <Label noMargin>Legislation Status</Label>
                            }
                            namePath="status"
                            triggerWarningMessage={emptyYear}
                            warningMessage={translate(
                              'pages.regulatoryUpdates.toastEmpty'
                            )}
                            size="120px"
                          />
                        </DropdownContainer>
                      </MainSectionText>
                    </ContentWrapper>
                  ) : null}
                </InputWrapper>
              </MainSection>

              <GeneralSection>
                <Label>{translate('pages.substanceRecord.execSummary')}</Label>
                <CkEditor
                  id="billEpaDocket"
                  name="billEpaDocket"
                  isReadOnly={editOnlyPhase}
                  data={regulationSummary}
                  onChange={(event: any, editor: any) => {
                    setregulationSummary(editor.getData());
                  }}
                  overFlowHide={false}
                  onClickNotify={() => {
                    setAutoFocus(false);
                    setAutoFocusRegNick(false);
                  }}
                />
              </GeneralSection>
            </>
          )}
        </Content>
        {recordType === 'TYPENEW' && (
          <ButtonsContainer>
            <Button text="Cancel" onClick={() => handleClose()} />
            <Button
              type="primary"
              isDisabled={
                maxLengthRegulationName || maxLengthRegulationNickName
              }
              text="Save"
              onClick={handleSubmit}
            />
          </ButtonsContainer>
        )}
      </UpdateModal>
      <Overlay />
    </Container>
  ) : null;
};

export default ModalLegislation;
