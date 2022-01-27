import React from 'react';
import PropTypes from 'prop-types';

import {
  Col,
  Row,
} from '@folio/stripes/components';

import BibliographicInfo from '../BibliographicInfo';
import PublicationInfo from '../PublicationInfo';
import Abstract from '../Abstract';

const DisplayResult = ({
  result
}) => {
  return <>
    {result.abstract && (
      <Row>
        <Col xs={12}>
          <Abstract abstract={result.abstract} />
        </Col>
      </Row>
    )}
    <Row>
      <Col xs={12}>
        <BibliographicInfo bibInfo={result.metadata.BibliographicInfo} />
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <PublicationInfo pubInfo={result.metadata.PublicationInfo} />
      </Col>
    </Row>
  </>;
};

DisplayResult.propTypes = {
  result: PropTypes.object.isRequired
};

export default DisplayResult;
