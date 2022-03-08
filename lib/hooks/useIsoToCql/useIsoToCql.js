const useIsoToCql = ({
  iso = {
    BibliographicInfo: {},
    PublicationInfo: {}
  }
}) => {
  const getIdentifier = identifier => (delimiter, biblio) => {
    return biblio.BibliographicItemId.map(id => {
      if (id.BibliographicItemIdentifierCode === identifier) {
        return id.BibliographicItemIdentifier;
      }
    }).join(` ${delimiter} `);
  };

  // Enable us to build a CQL search string
  const cql2IsoBiblio = {
    ISBN: {
      delimiter: 'or',
      iso: [
        {
          isoName: 'BibliographicItemId',
          parser: getIdentifier('ISBN')
        }
      ]
    },
    ISSN: {
      delimiter: 'or',
      iso: [
        {
          isoName: 'BibliographicItemId',
          parser: getIdentifier('ISSN')
        }
      ]
    },
    Title: {
      delimiter: 'or',
      iso: [
        {
          isoName: 'Title',
          quoted: true
        }
      ]
    },
    TitleOfComponent: {
      delimiter: 'or',
      iso: [{
        isoName: 'TitleOfComponent',
        quoted: true
      }]
    },
    Author: {
      delimiter: 'or',
      iso: [
        {
          isoName: 'Author',
          quoted: true
        }
      ]
    },
    AuthorOfComponent: {
      delimiter: 'or',
      iso: [
        {
          isoName: 'AuthorOfComponent',
          quoted: true
        }
      ]
    },
    Volume: {
      delimiter: 'or',
      iso: [
        {
          isoName: 'Volume',
          quoted: false
        }
      ]
    }
  };

  const cql2IsoPub = {
    PublicationType: {
      delimiter: 'or',
      iso: [
        {
          isoName: 'PublicationType',
          quoted: false
        }
      ]
    }
  };

  const createParams = (mapping, data) => {
    const output = Object.keys(mapping).map(key => {
      const delimiter = mapping[key].delimiter;
      const isoOut = [];
      mapping[key].iso.map(iso => {
        let value = null;
        if (!iso.hasOwnProperty('parser')) {
          value = data[iso.isoName];
        } else {
          value = iso.parser(delimiter, data);
        }
        if (value && value.length > 0) {
          isoOut.push(key + '=' + (iso.quoted ? `"${value}"` : value));
        }
      });
      return isoOut.length > 0 ?
        '(' + isoOut.join(` ${delimiter} `) + ')' :
        null;
    }).filter(x => x);
    console.log(output.join(' and '));
    return output.join(' and ');
  }

  const bibParams = createParams(cql2IsoBiblio, iso.BibliographicInfo);
  const pubParams = createParams(cql2IsoPub, iso.PublicationInfo);

  return [bibParams, pubParams].flat().join(' and ');
};

export default useIsoToCql;
