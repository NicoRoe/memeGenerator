import React from "react";
import { useState, useEffect } from "react";

function Memegenerator() {
    const [meme, setMeme] = useState();
    const [topText, setTopText] = useState("");
    // console.log(meme?.data.memes[0].url);


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://api.imgflip.com/get_memes');
            const jsonData = await response.json();
            setMeme(jsonData);
        }
        fetchData();
    }, []);

    const [index, setIndex] = useState([0]);

    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * meme.data.memes.length);
        const memeImg = meme.data.memes[randomIndex]
        let url = memeImg.url;

        setIndex(randomIndex);

        setMeme((prevMeme) => ({
            ...prevMeme,
            randomImage: url,
        }));

        function handleChange(event) {
            const { value } = event.target;
            setMeme((prevMeme) => ({
                ...prevMeme,
                caption: value,
            }));
        }
    }
    return (
        <div>
            <input type="text" placeholder="topText" value="" />
            <input type="text" placeholder="bottomText" value="" />
            <h4>{meme?.data.memes[index].name}</h4>
            <img src={meme?.data.memes[index].url} />
            <button onClick={getRandomImage}>Random</button>
        </div>
    )
};

export default Memegenerator;