import React, { useRef, useState } from 'react'
import './ImageSpark.css';
import sample_img from '../Assets/default_image.svg';
import logo from '../Assets/logo.png';

const ImageSpark = () => {

    const [image_url,setImage_url] = useState("/");

    let inputRef = useRef(null);

    const [loading,setLoading] = useState(false);

    const imageGenerator = async () => {
        if(inputRef.current.value===""){
            return 0;
        }

        setLoading(true);

        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 
                    "Bearer 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",
                    "User-Agent": "Chrome",
                },
                body: JSON.stringify({
                    prompt: inputRef.current.value,
                    n: 1,
                    size: "512x512",
                }),
            }
        );
        let data = await response.json();
        let darta_array = data.data;
        setImage_url(darta_array[0].url);
        setLoading(false);
    }

  return (
    <div className='imagespark-ai'>
        <div className='header-container'>
            <img src={logo} alt="logo" className='logo' />
            <div className='header'>ImageSpark-<span>AI</span></div>
        </div>
      
      <div className='img-loading'>
        <div className='image'>
            <img src={image_url==="/" ? sample_img : image_url} alt='sample_img' />
            <div className='loading'>
                <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                <div className={loading ? "loading-text" : "display-none"}>Loading....</div>
            </div>
        </div>
        <div className='serch-box'>
            <input type="text" ref={inputRef} className='serach-input' placeholder='Desctibe your image'/>
            <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
        </div>
      </div>
    </div>
  )
}

export default ImageSpark
