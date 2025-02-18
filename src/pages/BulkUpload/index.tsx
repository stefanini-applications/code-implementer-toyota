import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Breadcrumb, Button, Col, DatePicker, Input, Row, Select } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import { FaTrashAlt } from 'react-icons/fa';
import selectYear from '../../mocks/select-year';
import listToyotaJurisdictions from '../../mocks/impact-tabs';
import { Container, EditorBox, FormBox, HeadingText, Label } from './styled';
import CkEditor from '../../components/CkEditor';
import phaseOptions from '../../mocks/phase';
import {
  createBulkLegislationRecordRequest,
  selectors
} from '../../store/modules/legislations/actions';
import {
  getAgencyRequest,
  selectors as enumeratorsSelector
} from '../../store/modules/enumerators/actions';
import { ToastSuccess } from '../../components/Toast';

interface LegislationsState {
  listLegislations: Array<any>;
}

const LegislationBulkUpload: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const listAgency = useSelector(enumeratorsSelector?.agency);
  const bulkLegislationRecord = useSelector(selectors.bulkLegislationRecord);
  const { state: locationState }: any = location;
  const [jurisdictionId, setJurisdictionId] = useState(1);
  const [isNavigated, setIsNavigated] = useState(false);
  const [activeListLegislations, setActiveListLegislations] = useState<
    LegislationsState['listLegislations']
  >([]);

  useEffect(() => {
    if (locationState?.state?.listLegislations) {
      document.body.classList.remove('hide-overflow');
      setActiveListLegislations(locationState.state.listLegislations);
      dispatch(getAgencyRequest({ type: '2', onlyActive: true }));
    } else {
      console.error('No legislations found in state');
    }

    return () => {
      setActiveListLegislations([]);
    };
  }, [dispatch, locationState]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async data => {
    const updatedLegislations = data.legislations.map(legislation => ({
      ...legislation,
      active: true,
      recordType: 2,
      jurisdictionId: 1,
      agencyId: Number(legislation.agencyId)
    }));
    dispatch(createBulkLegislationRecordRequest(updatedLegislations));
    setIsNavigated(true);
  };

  useEffect(() => {
    if (bulkLegislationRecord) {
      const { saved, duplicates } = bulkLegislationRecord;
      if ((saved?.length > 0 || duplicates?.length > 0) && isNavigated) {
        ToastSuccess(
          `Legislations Added Successfully - Saved: ${saved.length} Duplicate: ${duplicates.length}`
        );
        setIsNavigated(false);
        history.push('/imported-report', { state: { bulkLegislationRecord } });
      }
    }
  }, [bulkLegislationRecord]);

  const deleteRecord = (index: any) => {
    const updatedList = activeListLegislations.filter(
      item => item.billTitle !== index
    );
    setActiveListLegislations(prev => {
      reset();
      return updatedList;
    });
  };

  return (
    <Container>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: 'Home',
            href: '/'
          },
          {
            title: 'Imported State Bills'
          }
        ]}
      />

      <HeadingText>Imported State Bills</HeadingText>

      <Row>
        <Col>
          <Label>Jurisdiction</Label>

          <Select
            style={{ width: 150 }}
            optionLabelProp="label"
            defaultValue={jurisdictionId}
            fieldNames={{ label: 'label', value: 'id' }}
            options={listToyotaJurisdictions}
            onChange={(value: any) => setJurisdictionId(value)}
          />
        </Col>
      </Row>

      <form onSubmit={handleSubmit(onSubmit)}>
        {activeListLegislations && activeListLegislations.length > 0 ? (
          activeListLegislations.map((formData: any, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <FormBox key={formData.billTitle}>
              <Row justify="space-around">
                <Col span={4}>
                  <Label>
                    <span style={{ color: 'red', fontSize: '16px' }}>*</span>{' '}
                    Legislation Name
                  </Label>
                  <Controller
                    name={`legislations[${index}].billTitle`}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={formData.billTitle}
                    render={({ field }) => <Input {...field} />}
                  />
                  {errors.legislations?.[index]?.billTitle && (
                    <span style={{ color: 'red', fontSize: '12px' }}>
                      Mandatory field not filled in
                    </span>
                  )}
                </Col>

                <Col span={8}>
                  <Label>Nickname</Label>
                  <Controller
                    name={`legislations[${index}].nickname`}
                    control={control}
                    defaultValue={formData.nickname}
                    render={({ field }) => <Input {...field} />}
                  />
                  {errors.legislations?.[index]?.nickname && (
                    <span style={{ color: 'red', fontSize: '12px' }}>
                      Mandatory field not filled in
                    </span>
                  )}
                </Col>

                <Col>
                  <Label>
                    <span style={{ color: 'red', fontSize: '16px' }}>*</span>{' '}
                    Sub-Jurisdiction
                  </Label>
                  <Controller
                    name={`legislations[${index}].agencyId`}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={
                      listAgency &&
                      listAgency.find(
                        data =>
                          data.abbreviation.toLowerCase() ===
                          formData.agencyAcronym.toLowerCase()
                      )?.id
                    }
                    render={({ field }) => (
                      <Select
                        {...field}
                        style={{ width: 150 }}
                        optionLabelProp="description"
                        fieldNames={{ label: 'description', value: 'id' }}
                        options={
                          listAgency &&
                          listAgency.filter(
                            data => data.Jurisdictions[0].id == jurisdictionId
                          )
                        }
                      />
                    )}
                  />
                  {errors.legislations?.[index]?.agencyId && (
                    <span style={{ color: 'red', fontSize: '12px' }}>
                      Mandatory field not filled in
                    </span>
                  )}
                </Col>

                <Col>
                  <Label>
                    <span style={{ color: 'red', fontSize: '16px' }}>*</span>{' '}
                    Lagislative Phase
                  </Label>
                  <Controller
                    name={`legislations[${index}].phase`}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={formData.phase}
                    render={({ field }) => (
                      <Select
                        {...field}
                        style={{ width: 100 }}
                        optionLabelProp="number"
                        fieldNames={{ label: 'number', value: 'phase' }}
                        options={phaseOptions}
                      />
                    )}
                  />
                  {errors.legislations?.[index]?.phase && (
                    <span style={{ color: 'red', fontSize: '12px' }}>
                      Mandatory field not filled in
                    </span>
                  )}
                </Col>

                <Col>
                  <Label>
                    <span style={{ color: 'red', fontSize: '16px' }}>*</span>{' '}
                    Year
                  </Label>
                  <Controller
                    name={`legislations[${index}].year`}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={formData.currentYear}
                    render={({ field }) => (
                      <Select
                        {...field}
                        style={{ width: 100 }}
                        optionLabelProp="year"
                        fieldNames={{ label: 'year', value: 'year' }}
                        options={selectYear.filter(
                          item => item.year <= new Date().getFullYear()
                        )}
                      />
                    )}
                  />
                  {errors.legislations?.[index]?.year && (
                    <span style={{ color: 'red', fontSize: '12px' }}>
                      Mandatory field not filled in
                    </span>
                  )}
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <EditorBox>
                    <Label>Executive Summary</Label>
                    <Controller
                      name={`legislations[${index}].billEpaDocket`}
                      control={control}
                      defaultValue={formData.billEpaDocket}
                      render={({ field }) => (
                        <CkEditor
                          {...field}
                          id="billEpaDocket"
                          name="billEpaDocket"
                          isReadOnly={false}
                          onChange={(event, editor) => {
                            field.onChange(editor.getData());
                          }}
                          data={formData.billEpaDocket}
                          overFlowHide={false}
                          onClickNotify={() => {
                            console.log('editor');
                          }}
                        />
                      )}
                    />
                    {errors.legislations?.[index]?.billEpaDocket && (
                      <span style={{ color: 'red', fontSize: '12px' }}>
                        Mandatory field not filled in
                      </span>
                    )}
                  </EditorBox>
                </Col>
              </Row>

              <Row>
                <Col span={6} style={{ padding: '0 10px' }}>
                  <Label>
                    <span style={{ color: 'red', fontSize: '16px' }}>*</span>{' '}
                    Announcement Date
                  </Label>
                  <Controller
                    name={`legislations[${index}].agencyDate`}
                    control={control}
                    rules={{ required: true }}
                    defaultValue={
                      formData?.regulationUpdate?.agencyDate
                        ? Moment(
                            formData?.regulationUpdate?.agencyDate,
                            'MM-DD-YYYY'
                          )
                        : null
                    }
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        style={{ width: 300 }}
                        format="MM-DD-YYYY"
                      />
                    )}
                  />
                  {errors.legislations?.[index]?.agencyDate && (
                    <span style={{ color: 'red', fontSize: '12px' }}>
                      Mandatory field not filled in
                    </span>
                  )}
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <EditorBox>
                    <Label>Update Description</Label>
                    <Controller
                      name={`legislations[${index}].comment`}
                      control={control}
                      defaultValue={formData.regulationUpdate.comment}
                      render={({ field }) => (
                        <CkEditor
                          {...field}
                          id="comment"
                          name="comment"
                          isReadOnly={false}
                          onChange={(event, editor) => {
                            field.onChange(editor.getData());
                          }}
                          data={formData.regulationUpdate.comment}
                          overFlowHide={false}
                          onClickNotify={() => {
                            console.log('editor');
                          }}
                        />
                      )}
                    />
                    {errors.legislations?.[index]?.comment && (
                      <span style={{ color: 'red', fontSize: '12px' }}>
                        Mandatory field not filled in
                      </span>
                    )}
                  </EditorBox>
                </Col>
              </Row>

              <Row justify="end" style={{ marginTop: '10px' }}>
                <Col>
                  <Button
                    onClick={() => {
                      deleteRecord(formData.billTitle);
                    }}
                  >
                    <FaTrashAlt />
                  </Button>
                </Col>
              </Row>
            </FormBox>
          ))
        ) : (
          <p
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontWeight: '600'
            }}
          >
            No legislations to display.
          </p>
        )}
        {activeListLegislations && activeListLegislations.length > 0 && (
          <Row justify="end" style={{ marginTop: '10px' }}>
            <Col style={{ marginRight: '10px' }}>
              <Button onClick={() => history.goBack()}>Cancel</Button>
            </Col>
            <Col>
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Col>
          </Row>
        )}
      </form>
    </Container>
  );
};

export default LegislationBulkUpload;
