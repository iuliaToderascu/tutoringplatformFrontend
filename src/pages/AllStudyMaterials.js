import React, { useState, useEffect } from 'react';
import '../assets/AllStudyMaterials.css';
import { object } from 'yup';

const AllObjectsPage = ({ searchQuery }) => {
  const [objects, setObjects] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7071/studymaterials")
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      setObjects(response);
      setFilteredMaterials(response)
    })
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredMaterials(
        objects.filter(object =>
          object.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          object.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
    } else {
      setFilteredMaterials(objects);
    }
  }, [searchQuery, objects]);

  return (
    <div className="objects-container">
    {console.log('objects before render:', objects)}
    {objects.length > 0 &&
      objects.map((object, index) => (
        <div key={index} className="object-card">
          {object.coverImageUrl && (
            <img
              src={object.coverImageUrl}
              alt={object.title + " Cover Image"}
              className="object-card-image"
            />
          )}
          <div className="object-card-content">
            <div className="object-title">
              <h2>{object.title}</h2>
            </div>
            <div className="object-details">
              <p>Education Level: {object.educationLevel}</p>
              {/* Add more details here if needed */}
            </div>
          </div>
        </div>
      ))}
  </div>
);
};

export default AllObjectsPage;