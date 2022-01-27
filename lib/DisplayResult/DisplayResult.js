import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import BibliographicInfo from '../BibliographicInfo';
import PublicationInfo from '../PublicationInfo';

const DisplayResult = ({
  result
}) => {
  return <>
    <Row>
      <Col xs={12}>
        <BibliographicInfo bibInfo={result.BibliographicInfo} />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <PublicationInfo pubInfo={result.PublicationInfo} />
      </Col>
    </Row>
  </>;
};

DisplayResult.propTypes = {
  result: PropTypes.object.isRequired
};

export default DisplayResult;
