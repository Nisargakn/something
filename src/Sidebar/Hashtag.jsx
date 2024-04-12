import React, { useState, useEffect } from 'react';
import axiosInstance from '../helper/AxiosInstance';

const Fetch = () => {
  const [keyword, setKeyword] = useState('');
  const [recommendedHashtags, setRecommendedHashtags] = useState({});
  const [selectedHashtags, setSelectedHashtags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/quantum-socialshare/recommend?keyword=${keyword}`);
        if (response.data.status === "success") {
          setRecommendedHashtags(response.data.recommendedHashtag);
        } else {
          console.error('Error fetching data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (keyword.trim() !== '') {
      fetchData();
    } else {
      setRecommendedHashtags({});
    }
  }, [keyword]);

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSelectHashtag = (hashtag) => {
    setSelectedHashtags([...selectedHashtags, `#${hashtag}`]); // Append the selected hashtag with '#' tag to the list
  };

  const handleAddHashtags = () => {
    if (selectedHashtags.length > 0) {
      setKeyword(''); // Clear the text box
      setRecommendedHashtags({}); // Clear the dropdown
      // Do something with the selected hashtags, for now, we will just log them
      console.log(selectedHashtags);
    }
  };

  return (
    <div>
      {selectedHashtags.length === 0 && <div style={{ marginBottom: '30px' }}></div>} {/* Add empty div with margin if no hashtags have been added */}
      <div>
        {selectedHashtags.map((hashtag, index) => (
          <span key={index}>{hashtag} </span>
        ))}
      </div> {/* Display selected hashtags above the input field */}
      <div>
        <input
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Type here..."
        />
        {Object.keys(recommendedHashtags).length > 0 && (
          <ul>
            {Object.entries(recommendedHashtags).map(([hashtag, count]) => (
              <li key={hashtag} onClick={() => handleSelectHashtag(hashtag)}>
                {hashtag}: {count}
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleAddHashtags}>Add</button>
      </div>
    </div>
  );
};

export default Fetch;
