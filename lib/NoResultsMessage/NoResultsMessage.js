import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@folio/stripes-components';

import css from './NoResultsMessage.css';

const NoResultsMessage = ({ isLoading }) => {
  let icon = 'search';
  let label = <FormattedMessage id="stripes-smart-components.sas.noResults.noResults" />;

  // Loading results
  if (isLoading) {
    icon = 'spinner-ellipsis';
    label = <FormattedMessage id="stripes-smart-components.sas.noResults.loading" />;
  }

  return (
    <div className={css.noResultsMessage}>
      <div className={css.noResultsMessageLabelWrap}>
        {icon && <Icon iconRootClass={css.noResultsMessageIcon} icon={icon} />}
        <span className={css.noResultsMessageLabel}>{label}</span>
      </div>
    </div>
  );
};

NoResultsMessage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default NoResultsMessage;
