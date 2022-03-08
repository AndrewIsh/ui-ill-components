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
  ['Publisher', 'PublicationType', 'PublicationDate'],
  ['PlaceOfPublication']
];

const getCol = ({ col, pubInfo }) => {
  return <Col key={col} xs={4}>
    <KeyValue
      data-testid={`iso18626-PublicationInfo-${col}`}
      label={<FormattedMessage id={`ui-ill-components.iso18626.PublicationInfo.${col}`} />}
      value={pubInfo[col]}
    />
  </Col>;
};

const getRows = (pubInfo) => layout.map((row, index) => <Row key={index}>
  {row.map(col => getCol({ col, pubInfo }))}
</Row>
);

const PublicationInfo = ({
  pubInfo
}) => {
  return (
    <Layout className="margin-start-gutter">
      <Accordion
        id="pubInfoSection"
        label={<FormattedMessage id="ui-ill-components.iso18626.PublicationInfo.heading" />}
      >
        {getRows(pubInfo)}
      </Accordion>
    </Layout>
  );
};

PublicationInfo.propTypes = {
  pubInfo: PropTypes.object.isRequired
};

PublicationInfo.defaultProps = {
  pubInfo: {}
};

export default PublicationInfo;
