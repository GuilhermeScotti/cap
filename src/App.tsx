import { useState } from "react";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import APIForm, { Inputs } from "./components/APIForm.tsx";
import "./App.css";
import Gallery from "./components/Galery.tsx";

interface Quota {
  remaining: number;
  limit: number;
}

const App = () => {
  const [inputs, setInputs] = useState<Inputs>({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [prevImages, setPrevImages] = useState<string[]>([]);
  const [quota, setQuota] = useState<Quota>();

  const getQuota = async () => {
    const response = await fetch(
      "https://api.apiflash.com/v1/urltoimage/quota?access_key=" + ACCESS_KEY
    );
    const result = await response.json();

    setQuota(result);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = () => {
    let defaultValues: Inputs = {
      url: "",
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "400",
      height: "300",
    };

    if (inputs.url == "" || inputs.url == " ") {
      alert("You forgot to submit an url!");
    } else {
      Object.keys(inputs).forEach((key) => {
        if (inputs[key as keyof Inputs] === "") {
          inputs[key as keyof Inputs] = defaultValues[key as keyof Inputs];
        }
      });
    }

    makeQuery();
  };

  const callAPI = async (query: string) => {
    const response = await fetch(query);
    const json = await response.json();

    if (json.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!");
    } else {
      setCurrentImage(json.url);
      setPrevImages((images) => [...images, json.url]);
      reset();
      getQuota();
    }
  };

  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;

    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);
  };

  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  };

  return (
    <>
      {quota ? (
        <div className="quota">
          {"Remaining API calls: "}
          {quota.remaining} out of {quota.limit}
        </div>
      ) : (
        <div className="quota"> capture to get quota</div>
      )}
      <div className="whole-page">
        <h1>Build Your Own Screenshot! 📸</h1>
        <APIForm
          inputs={inputs}
          handleChange={handleChange}
          onSubmit={onSubmit}
        />
        {currentImage ? (
          <img
            className="screenshot"
            src={currentImage}
            alt="Screenshot returned"
          />
        ) : (
          <div> </div>
        )}
        <div className="container">
          <h3> Current Query Status: </h3>
          <p>
            https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY
            <br></br>
            &url={inputs.url} <br></br>
            &format={inputs.format} <br></br>
            &width={inputs.width}
            <br></br>
            &height={inputs.height}
            <br></br>
            &no_cookie_banners={inputs.no_cookie_banners}
            <br></br>
            &no_ads={inputs.no_ads}
            <br></br>
          </p>
        </div>
        <br></br>
        <div className="container">
          <Gallery images={prevImages} />
        </div>
      </div>
    </>
  );
};

export default App;
