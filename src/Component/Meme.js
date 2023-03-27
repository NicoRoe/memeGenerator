import React from "react";
import { useState, useEffect } from "react";

function Meme() {

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    });
    // console.log(meme?.data.memes[0].name);

    

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://api.imgflip.com/get_memes');
            const jsonData = await response.json();
            setMeme(jsonData);
        }
        fetchData();
    }, []);

    const [index, setIndex] = useState([]);

    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * meme.data.memes.length);
        const memeImg = meme.data.memes[randomIndex]
        let url = memeImg.url;

        setIndex(randomIndex);

        // setMeme((prevMeme) => ({
        //     ...prevMeme,
        //     randomImage: url,
        // }));
    }

    // function handleChange(event) {
    //     const { name, value } = event.target;
    //     setMeme((prevMeme) => ({
    //         ...prevMeme,
    //         caption: value,
    //     }));
    // }


    return (
        <div>
            <img src={meme?.data.memes[index].url} />
            <button onClick={getRandomImage}>Random</button>
        </div>
    );
}
export default Meme;