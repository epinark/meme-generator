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
  }

  function goToPreviousMeme(e) {
    e.preventDefault();
    setCurrentMemeIndex((prev) => prev - 1);
  }
  return (
    <div id="generatorWrapper">
      <form id="generatorContainer">
        <label htmlFor="topText">Text on the top: </label>
        <input
          type="text"
          placeholder="Enter top text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <label htmlFor="bottomText">Text on the bottom: </label>
        <input
          type="text"
          placeholder="Enter bottom text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
      </form>
      {fetchedData !== null && (
        <div>
          <img
            src={fetchedData[currentMemeIndex].url}
            alt={fetchedData[currentMemeIndex].name}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "white",
              fontSize: "24px",
              fontFamily: "impact",
              textShadow: "1px 1px 1px black",
            }}
          >
            {topText}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              color: "white",
              fontSize: "24px",
              fontFamily: "impact",
              textShadow: "1px 1px 1px black",
            }}
          >
            {bottomText}
          </div>
        </div>
      )}
      <div>
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
