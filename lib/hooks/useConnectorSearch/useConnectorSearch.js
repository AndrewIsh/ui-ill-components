import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

import {
  useNamespace,
  useOkapiKy
} from '@folio/stripes/core';

import {
  SEARCH_API
} from '../../../common/constants';

import useIsoToCql from '../useIsoToCql';

const useConnectorSearch = ({
  pagination,
  submission,
  connector
}) => {

  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: connector.id });
  const query = useIsoToCql({ iso: submission.submissionMetadata });

  const searchParams = {
    query,
    limit: pagination.limit,
    offset: pagination.offset,
    connector: connector.id
  };

  const queryKey = [namespace, query, pagination.timestamp, pagination.limit, pagination.offset];

  const options = {
    keepPreviousData: true,
    enabled: query.length > 0
  };

  const queryFn = () => {
    return ky
      .get(`${SEARCH_API}`, { searchParams })
      .json();
  };

  const { isFetching, data } = useQuery(
    queryKey,
    queryFn,
    options
  );

  return {
    isLoading: isFetching,
    results: data || []
  };

};

useConnectorSearch.propTypes = {
  pagination: PropTypes.object.isRequired,
  submission: PropTypes.object.isRequired,
  connector: PropTypes.object.isRequired
};

useConnectorSearch.defaultProps = {
  pagination: {},
  submission: {},
  connector: {}
};

export default useConnectorSearch;