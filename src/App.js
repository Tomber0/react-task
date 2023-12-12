import React, {useState } from 'react';
import TermsOfUse from './components/TermsOfUse';
import ImageCollection from './components/ImageCollection';

const App = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
  };

  return (
    <div>
      {!acceptedTerms ? (
        <TermsOfUse onAccept={handleAcceptTerms} />
      ) : (
          <ImageCollection />
      )}
    </div>
  );
};
export default App;
