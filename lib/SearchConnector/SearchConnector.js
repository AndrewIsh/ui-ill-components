import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useIntl, FormattedMessage } from 'react-intl';

import css from './SearchConnector.css';

import {
  MultiColumnList,
  Button,
  Modal,
  ModalFooter
} from '@folio/stripes/components';

import {
  RESULT_COUNT_INCREMENT,
  PrevNextPagination,
} from '@folio/stripes-acq-components';

import NoResultsMessage from '../NoResultsMessage';
import DisplayResult from '../DisplayResult';

const visibleColumns = ['title', 'author', 'publisher', 'identifier', 'type'];

const columnMapping = {
  title: <FormattedMessage id="ui-ill-components.iso18626.bibInfo.Title" />,
  author: <FormattedMessage id="ui-ill-components.iso18626.bibInfo.Author" />,
  publisher: <FormattedMessage id="ui-ill-components.iso18626.pubInfo.Publisher" />,
  identifier: <FormattedMessage id="ui-ill-components.connector.result.identifier" />,
  type: <FormattedMessage id="ui-ill-components.iso18626.pubInfo.Publisher" />
};

const columnWidths = {
  title: '450px',
  author: '250px',
  publisher: '200px',
  identifier: '200px',
  type: '100px'
};

const resultsFormatter = {
  title: ({ metadata }) => metadata?.BibliographicInfo?.Title,
  author: ({ metadata }) => metadata?.BibliographicInfo?.Author,
  publisher: ({ metadata }) => metadata?.PublicationInfo?.Publisher,
  identifier: ({ metadata }) => {
    const ids = metadata?.BibliographicInfo?.BibliographicItemId;
    let toReturn = [];
    if (ids && ids.length > 0) {
      toReturn = ids.map(id =>
        <div key={id.BibliographicItemIdentifier}>{id.BibliographicItemIdentifierCode}: {id.BibliographicItemIdentifier}</div>
      );
    }
    return <>{toReturn.map(id => id)}</>;
  },
  type: ({ metadata }) => {
    let splut = metadata?.PublicationInfo?.PublicationType?.split('');
    splut[0] = splut[0].toUpperCase();
    return splut.join('');
  },
};

const columnFormatter = (currentClass, rowData, columnName) => {
  if (columnName === 'identifier') {
    return `${currentClass} ${css.flexDown}`;
  }
};

const SearchConnector = ({
  onNeedMoreData,
  totalRecords,
  isLoading,
  pagination,
  results
}) => {

  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState();
  const intl = useIntl();

  const resultsStatusMessage = (
    <NoResultsMessage isLoading={isLoading} />
  );

  const onRowClick = (event, selectedRow) => {
    setSelected(selectedRow.metadata);
    setModalOpen(true);
  }

  const footer = (
    <ModalFooter>
      <Button buttonStyle="primary" marginBottom0>
        <FormattedMessage id="ui-ill-components.button.placeRequest" />
      </Button>
      <Button onClick={() => setModalOpen(false)} marginBottom0>
        <FormattedMessage id="ui-ill-components.button.cancel" />
      </Button>
    </ModalFooter>
  );

  return <>
    {selected && modalOpen && (
      <Modal
        aria-label={intl.formatMessage({ id: "ui-ill-componenents.button.placeRequest" })}
        open={modalOpen}
        label={intl.formatMessage({ id: "ui-ill-components.button.placeRequest" })}
        footer={footer}
        size="large"
      >
        <DisplayResult result={selected} />
      </Modal>
    )}
    <MultiColumnList
      id="connector-search-results"
      totalCount={totalRecords}
      contentData={results}
      visibleColumns={visibleColumns}
      columnMapping={columnMapping}
      columnWidths={columnWidths}
      formatter={resultsFormatter}
      getCellClass={columnFormatter}
      loading={isLoading}
      onRowClick={onRowClick}
      onNeedMoreData={onNeedMoreData}
      isEmptyMessage={resultsStatusMessage}
      pagingType="click"
      hasMargin
      pageAmount={RESULT_COUNT_INCREMENT}
    />
    {results.length > 0 && (
      <PrevNextPagination
        {...pagination}
        totalCount={totalRecords}
        disabled={isLoading}
        onChange={onNeedMoreData}
      />
    )}
  </>
}

SearchConnector.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  onNeedMoreData: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  totalRecords: PropTypes.number.isRequired
};

SearchConnector.defaultProps = {
  results: [],
  totalRecords: 0
};

export default SearchConnector;
