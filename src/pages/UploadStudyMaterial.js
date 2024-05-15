import React, { useState } from 'react';
import StudyMaterialService from '../services/StudyMaterialService';
import '../assets/UploadStudyMaterial.css';

const UploadStudyMaterial = () => {
  const [title, setTitle] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [tags, setTags] = useState('');
  const [contentFile, setContentFile] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('educationLevel', educationLevel);
      formData.append('tags', tags);
      formData.append('contentFile', contentFile);
      formData.append('coverImageFile', coverImageFile);

      await StudyMaterialService.createStudyMaterial(formData);
      // Reset form fields
      setTitle('');
      setEducationLevel('');
      setTags('');
      setContentFile(null);
      setCoverImageFile(null);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to upload study material.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="upload-study-material-container">
      <h1>Upload Study Material</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="educationLevel">Education Level:</label>
          <input
            type="text"
            id="educationLevel"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contentFile">Content File:</label>
          <input
            type="file"
            id="contentFile"
            accept="video/*,application/pdf,image/*"
            onChange={(e) => setContentFile(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="coverImageFile">Cover Image File:</label>
          <input
            type="file"
            id="coverImageFile"
            accept="image/*"
            onChange={(e) => setCoverImageFile(e.target.files[0])}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

export default UploadStudyMaterial;
