import React, { useState } from 'react';
import '../assets/UploadStudyMaterial.css';
import DOMPurify from 'dompurify';

const UploadStudyMaterial = () => {
  const [title, setTitle] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [tags, setTags] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const studyMaterial = {
        tutorId: '1', // Set tutorId to 1 for now
        title: DOMPurify.sanitize(title),
        educationLevel: DOMPurify.sanitize(educationLevel),
        tags: tags.split(',').map(tag => DOMPurify.sanitize(tag.trim())),
        coverImageUrl: DOMPurify.sanitize(coverImageUrl),
        contentUrl: DOMPurify.sanitize(contentUrl),
      };

      const response = await fetch('https://localhost:7071/studymaterials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studyMaterial),
      });

      if (!response.ok) {
        throw new Error('Failed to upload study material.');
      }

      setTitle('');
      setEducationLevel('');
      setTags('');
      setCoverImageUrl('');
      setContentUrl('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
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
          <label htmlFor="contentUrl">Content URL:</label>
          <input
            type="url"
            id="contentUrl"
            value={contentUrl}
            onChange={(e) => setContentUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="coverImageUrl">Cover Image URL:</label>
          <input
            type="url"
            id="coverImageUrl"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
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