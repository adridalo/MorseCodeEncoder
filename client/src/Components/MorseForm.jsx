import { useState } from "react";

const MorseForm = () => {

// endpoint: https://api.funtranslations.com/translate/morse.json?text=hello

    const [regularInput, setRegularInput] = useState("");
    const [morseResult, setMorseResult] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const url = `https://api.funtranslations.com/translate/morse.json?text=${regularInput}`;
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("Error occurred fetching morse translation");
        }

        const data = await response.json()
        const translation = data.contents.translated;
        setMorseResult(translation);
    }

    return (  
        <form onSubmit={handleFormSubmit}>
            <div className="input">
                <label htmlFor="reg-input">Regular Text</label>
                <input 
                    type="text" 
                    name="reg-input" 
                    id="reg-input" 
                    value={regularInput}
                    onChange={e => setRegularInput(e.target.value)}
                    required={true}
                />
            </div>
            <div className="input">
                <label htmlFor="morse-result">Morse Code Translation</label>
                <input 
                    type="text" 
                    name="morse-result" 
                    id="morse-result" 
                    value={morseResult} 
                    disabled={true}
                />
            </div>
            <button>Translate</button>
        </form>
    );
}
 
export default MorseForm;