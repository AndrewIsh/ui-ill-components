import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

import {
  useNamespace,
  useOkapiKy
} from '@folio/stripes/core';

import {
  CONNECTOR_API
} from '../../../common/constants/api';

const useConnector = ({
  connector,
  method,
  endpoint
}) => {
  const ky = useOkapiKy();
  const [namespace] = useNamespace({ key: 'ill-connectors' });

  const queryFn = () => {
    return ky(`${CONNECTOR_API}/getter/${endpoint}`, {
      method,
      headers: { 'x-okapi-module-id': connector },
      hooks: {
        afterResponse: [
          async (_request, _options, response) => {
            // If we're receiving a response to a connector getter,
            // 'getterResult' is an escaped JSON string, so we need
            // to prepare it
            const json = await response.json();
            if (json.hasOwnProperty('getterResult')) {
              const unescaped = JSON.parse(json.getterResult.replace('\"', '"'));
              response = {
                ...response,
                getterResult: unescaped
              };
            }
            return new Response(JSON.stringify(response));
          }
        ]
      }
    })
    .json();
  };

  const { isFetching, data } = useQuery(
    [namespace, endpoint],
    queryFn
  );

  return {
    isFetching,
    data
  };
};

useConnector.propTypes = {
  connector: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired
};

export default useConnector;
