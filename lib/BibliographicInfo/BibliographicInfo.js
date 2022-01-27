import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  KeyValue,
  Layout,
  Row,
  Col
} from '@folio/stripes/components';

// A 2D array representing the row & column layout and what
// property is displayed in which
const layout = [
  ['SupplierUniqueRecordId', 'Title', 'Author'],
  ['Subtitle', 'SeriesTitle', 'Edition'],
  ['TitleOfComponent', 'AuthorOfComponent', 'Volume'],
  ['Issue', 'PagesRequested', 'EstimatedNoPages'],
  ['BibliographicItemId', 'Sponsor', 'InformationSource'],
  ['BibliographicRecordId']
];

// Receive an array of objects. Each object will have two properties,
// We need to return a message containing the value of both separated
// by a colon
const getArrayVals = (arr) => {
  if (arr.length === 0) return;
  return arr.map((obj, index) => <span key={index}>{Object.values(obj).join(': ')}</span>);
};

const getCol = ({ col, bibInfo }) => {
  return <Col key={col} xs={4}>
    <KeyValue
      data-testid={`iso18626-bibInfo-${col}`}
      label={<FormattedMessage id={`ui-ill-components.iso18626.bibInfo.${col}`} />}
      value={Array.isArray(bibInfo[col]) ? getArrayVals(bibInfo[col]) : bibInfo[col]}
    />
  </Col>;
};

const getRows = (bibInfo) => layout.map((row, index) => <Row key={index}>
  {row.map(col => getCol({ col, bibInfo }))}
</Row>
);

const BibliographicInfo = ({
  bibInfo
}) => {
  return (
    <Layout className="margin-start-gutter">
      <Accordion
        id="bibInfoSection"
        label={<FormattedMessage id="ui-ill-components.iso18626.bibInfo.heading" />}
      >
        {getRows(bibInfo)}
      </Accordion>
    </Layout>
  );
};

BibliographicInfo.propTypes = {
  bibInfo: PropTypes.object.isRequired
};

BibliographicInfo.defaultProps = {
  bibInfo: {}
};

export default BibliographicInfo;
