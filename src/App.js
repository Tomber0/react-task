import React, { useEffect, useState } from 'react';

const TermsOfUse = ( { onAccept }) => {
  const[termsList, setTerms] = useState([]);

  useEffect(()=>{
    async function getTerms(){
      const response = await fetch('http://167.71.69.158/static/test.json');
      const data = await response.json();
      setTerms(data.terms_of_use.paragraphs);
    }
    getTerms();
  },[]);

  return (
    <div>
      <h2>Terms of Use</h2>
      {termsList.map((paragraph, index) => (
        <div key={index}>
          <h3>{paragraph.title}</h3>
          <p>{paragraph.content}</p>
          <p>{paragraph.text}</p>
        </div>
      ))}

      <button onClick={onAccept}>Accept</button>
    </div>
  );
};

const MainContent = () => {
  const [imageList, setImages] = useState([]);
  useEffect(() => {
    async function getTerms() {
      const response = await fetch('http://167.71.69.158/static/test.json');
      const data = await response.json();
      setImages(data.images);
    }
    getTerms();
  }, []);

  const saveImage = (image) => {
    console.log(`Saving an ${image} to the file system...`);
  };

  return (
    <div>
      <h2>Main Content</h2>
      <div>
        {imageList.map((image, index) => (
          <div key={index}>
            <img src={image.image_url} alt={`${index + 1}`} />
            <button onClick={() => saveImage(image.image_url)}>Save</button>
          </div>
        ))}
      </div>
    </div>
  );
};

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
        <MainContent />
      )}
    </div>
  );
};
export default App;
