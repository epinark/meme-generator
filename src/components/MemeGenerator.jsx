import { useState, useEffect } from "react";
import axios from "axios";

const MemeGenerator = () => {
  const [memePictures, setMemePictures] = useState([]);
  const [currentMeme, setCurrentMeme] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  useEffect(() => {
    const fetchMemePictures = async () => {
      try {
        const response = await axios.get("https://api.imgflip.com/get_memes");
        setMemePictures(response.data.data.memes);
        setCurrentMeme(response.data.data.memes[2]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMemePictures();
  }, []);
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
      {currentMeme && (
        <div>
          <img src={currentMeme.url} alt={currentMeme.name} />
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
    </div>
  );
};

export default MemeGenerator;
