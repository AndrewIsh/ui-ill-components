const useIsoToCql = ({
  iso = {
    BibliographicInfo: {},
    PublicationInfo: {}
  }
}) => {
  // Map from ISO properties to CQL indexes
  // TODO: This is just a start, it needs expanding
  const iso2CqlBiblio = {
    Title: {
      cql: 'title',
      quoted: true
    },
    Author: {
      cql: 'author',
      quoted: false
    }
  };
  const iso2CqlPub = {
    PublicationType: {
      cql: 'type',
      quoted: false
    }
  };

  // Receive a mapping object and metadata and return an
  // array of key=value strings, appropriately quoted
  const createParams = (mapping, data) => {
    return Object.keys(mapping).reduce((acc, curr) => {
      if (data[curr] && data[curr].length > 0) {
        const toPush = mapping[curr].quoted ?
          `${mapping[curr].cql}="${data[curr]}"` :
          `${mapping[curr].cql}=${data[curr]}`;
        acc.push(toPush);
      }
      return acc;
    }, []);
  };

  // Receive an array of arrays of key=value strings,
  // and reduce them down to a single ' and ' delimited string
  const reduceToAnd = (acc, curr) => {
    if (curr.length > 0) {
      acc.push(curr);
    }
    return acc;
  }

  const bibParams = createParams(iso2CqlBiblio, iso.BibliographicInfo);
  const pubParams = createParams(iso2CqlPub, iso.PublicationInfo);

  return [bibParams, pubParams].reduce(
    reduceToAnd,
    []
  ).join(' and ');
};

export default useIsoToCql;
