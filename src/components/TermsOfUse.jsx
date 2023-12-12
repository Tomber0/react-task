import React, { useEffect,  useState } from 'react';

const TermsOfUse = ({ onAccept }) => {
    const [termsList, setTerms] = useState([]);

    useEffect(() => {
        async function getTerms() {
            const response = await fetch('http://localhost:8080/static/json/JSON_DATA.json');
            const data = await response.json();
            setTerms(data.terms_of_use.paragraphs);
        }
        getTerms();
    }, []);

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

export default TermsOfUse;