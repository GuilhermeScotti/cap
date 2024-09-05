import React from "react";

export interface Inputs {
  url: string;
  format: string;
  no_ads: string;
  no_cookie_banners: string;
  width: string;
  height: string;
}

interface APIFormProps {
  inputs: Inputs; // Replace 'any' with the appropriate type
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const inputsInfo = [
  "Input a link to any website you would like to take a screenshot of. Do not include https or any protocol in the URL",
  "Input which image format you would prefer for your screenshot: jpeg, png, or webp",
  "Input true or false if you would like your website screenshot to not contain any ads",
  "Input true or false if you would like your website screenshot to not contain of those annoying 'allow cookies' banners",
  "Choose the width of your screenshot (in pixels)",
  "Choose the height of your screenshot (in pixels)",
];

const APIForm: React.FC<APIFormProps> = (props) => {
  const { inputs, handleChange, onSubmit } = props;

  return (
    <div>
      <h2>Select Your Image Attributes:</h2>
      <form className="form-container">
        {inputs &&
          Object.entries(inputs).map(([category, value], index) => (
            <li className="form" key={index}>
              <h2>{category}</h2>
              <input
                type="text"
                name={category}
                value={value}
                placeholder="Input this attribute..."
                onChange={handleChange}
                className="textbox"
              />
              <br></br>
              <br></br>
              <p> {inputsInfo[index]}</p>
            </li>
          ))}
      </form>
      <button className="button" onClick={onSubmit}>
        Take Pic!
      </button>
    </div>
  );
};

export default APIForm;
