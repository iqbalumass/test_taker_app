import React from 'react';
import {useNavigate } from 'react-router-dom';
import './SubjectList.css'; // Import the CSS file

const SubjectList = () => {
  const subjects = ['Math', 'Science', 'History'];
  const navigate = useNavigate();

  const handleSubjectClick = (subject) => {
    navigate(`/quiz/${subject}`);
    console.log(`Navigate to quiz for ${subject}`);
  };

  return (
    <div className="subject-list">
      <h1>Select a Subject</h1>
      <ul>
        {subjects.map((subject) => (
          <li key={subject} className="subject-item">
            <button className="subject-button" onClick={() => handleSubjectClick(subject)}>
              {subject}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectList;