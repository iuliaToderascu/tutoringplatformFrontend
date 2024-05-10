import React, { useState, useEffect } from 'react';
import StudyMaterialService from '../services/StudyMaterialService';
import '../assets/AllStudyMaterials.css';

const AllObjectsPage = () => {
  const [objects, setObjects] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7071/studymaterials").then((response) => response.json()).then((response) => {
      console.log(response);
      setObjects(response);
    })
  }, []);

  return (
    <div className="objects-container">
      {console.log('objects before render:', objects)}
      {objects.length > 0 && objects.map((object, index) => (
        <div key={index} className="object-card">
          <div className="object-title">
            <h2>{object.title}</h2>
          </div>
          <div className="object-details">
            <p>Education Level: {object.educationLevel}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllObjectsPage;
