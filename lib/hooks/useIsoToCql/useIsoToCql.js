const useIsoToCql = ({
  iso = { BibliographicInfo: {} }
}) => {
  // Map from ISO properties to CQL indexes
  // TODO: This is just a start, it needs expanding
  const iso2Cql = {
    Title: {
      cql: 'title',
      quoted: true
    },
    Author: {
      cql: 'author',
      quoted: false
    }
  };

  const bibinfo = iso.BibliographicInfo;

  const params = Object.keys(iso2Cql).reduce((acc, curr) => {
    if (bibinfo[curr] && bibinfo[curr].length > 0) {
      const toPush = iso2Cql[curr].quoted ?
        `${iso2Cql[curr].cql}="${bibinfo[curr]}"` :
        `${iso2Cql[curr].cql}=${bibinfo[curr]}`;
      acc.push(toPush);
    }
    return acc;
  }, []);

  return [params.join(' and ')];

};

export default useIsoToCql;
