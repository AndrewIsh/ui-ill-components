import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import {
  Accordion,
  Layout,
} from '@folio/stripes/components';

const Abstract = ({
  abstract
}) => {
  return (
    <Layout className="margin-start-gutter">
      <Accordion
        id="abstractSection"
        label={<FormattedMessage id="ui-ill-components.abstractSection" />}
      >
              {abstract}
      </Accordion>
    </Layout>
  );
};

Abstract.propTypes = {
  abstract: PropTypes.string.isRequired
};

Abstract.defaultProps = {
  abstract: {}
};

export default Abstract;
