import { useState, useEffect } from "react";
import axios from "axios";

const MemeGenerator = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [currentMemeIndex, setCurrentMemeIndex] = useState(0);

  useEffect(() => {
    const fetchMemePictures = async () => {
      try {
        const response = await axios.get("https://api.imgflip.com/get_memes");

        setFetchedData(response.data.data.memes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMemePictures();
  }, []);

  function goToNextMeme(e) {
    e.preventDefault();
    setCurrentMemeIndex((prev) => prev + 1);
    setTopText("");
    setBottomText("");
  }

  function goToPreviousMeme(e) {
    e.preventDefault();
    setCurrentMemeIndex((prev) => prev - 1);
  }
  return (
    <div id="generatorWrapper">
      {fetchedData && (
        <form id="generatorContainer">
          <label htmlFor="topText">Text on the top: </label>
          <input
            id="input"
            type="text"
            placeholder="Enter top text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
          />
          <label htmlFor="bottomText">Text on the bottom: </label>
          <input
            id="input"
            type="text"
            placeholder="Enter bottom text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
          />
        </form>
      )}
      {fetchedData !== null && (
        <div id="textWrapper">
          <img
            src={fetchedData[currentMemeIndex].url}
            alt={fetchedData[currentMemeIndex].name}
            id="memeImage"
          />
          <div id="topText">{topText}</div>
          <div id="bottomText">{bottomText}</div>
        </div>
      )}
      <div id="buttonWrapper">
        <button id="button" onClick={goToPreviousMeme}>
          Previous
        </button>
        <button id="button" onClick={goToNextMeme}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MemeGenerator;
