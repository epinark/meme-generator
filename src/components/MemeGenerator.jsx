import { useState, useEffect } from 'react';
import axios from 'axios';

const MemeGenerator = () => {
const [memePictures, setMemePictures] = useState([]);
const [currentMeme, setCurrentMeme] = useState(null);

useEffect(() => {
    const fetchMemePictures = async () => {
        try {
            const response = await axios.get('https://api.imgflip.com/get_memes');
            setMemePictures(response.data.data.memes);
            setCurrentMeme(response.data.data.memes[1]);
        } catch (error) {
            console.error(error);
        }
    };

    fetchMemePictures();
}, []);
return (
    <div>
        {currentMeme && <img src={currentMeme.url} alt={currentMeme.name} />}
    </div>
);
}

export default MemeGenerator;