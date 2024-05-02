import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const [imageURLs, setImageURLs] = useState([]);
  const [tasks, setTasks] = useState([]);
  const { projectId } = useParams();
  console.log("The project id from Detail component is ", projectId);

  useEffect(() => {
    const fetchImages = async () => {
      console.log("enter to touch");
      try {
        const response = await fetch(`http://localhost:8000/project-progress/${projectId}/images`);

        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        console.log("result", result);
        const { imagePaths } = result;
        console.log("image path is", imagePaths);

        const imageUrls = imagePaths.map((relativePath) => {
          const normalizedPath = relativePath.replace(/\\/g, '/');
          return `http://localhost:8000/${normalizedPath}`;
        });

        // console.log(imageUrls);
        setImageURLs(imageUrls);
        setTasks(result.projectTitle)
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [projectId]);

  console.log("From outside the URL is", imageURLs);
  return (
    <div>
      <h1 ><b>Poofs</b></h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        {imageURLs.map((url, index) =>
          <div>
            <label key={index} htmlFor="img">{tasks[index]}</label>
            <img key={index} src={`${url}`} alt={`Project Image ${index}`} style={{ height: '200px', width: '220px' }} />
          </div>
        )}
      </div>
    </div>

  );
};

export default Detail;

