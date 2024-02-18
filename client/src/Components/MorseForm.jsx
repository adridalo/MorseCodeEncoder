import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const MorseForm = () => {

    const [regularInput, setRegularInput] = useState("");
    const [morseResult, setMorseResult] = useState("");
    const [translations, setTranslations] = useState(null);

  const [t, i18n] = useTranslation("global")


    async function fetchData() {
        const response = await fetch("/translations")
        if(!response.ok) {
            throw new Error("Error occurred fetching translations");
        }

        const data = await response.json()
        setTranslations(data.results)
    }

    useEffect(() => {
        fetchData()
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const url = `https://api.funtranslations.com/translate/morse.json?text=${regularInput}`;
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error("Error occurred fetching morse translation");
            }
    
            const data = await response.json();
            const translation = data.contents.translated;
            setMorseResult(translation);
    
            await fetch("/translation/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: "cors",
                body: JSON.stringify({
                    regular: regularInput,
                    morse: translation, // Use the translation directly
                }),
            });

            await fetchData()
            setRegularInput("")
            setMorseResult("")
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (  
        <form onSubmit={handleFormSubmit}>
            <div className="input">
                <label htmlFor="reg-input">{t('regularInput.label')}</label>
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
                <label htmlFor="morse-result">{t('morseInput.label')}</label>
                <input 
                    type="text" 
                    name="morse-result" 
                    id="morse-result" 
                    value={morseResult} 
                    disabled={true}
                />
            </div>
            <button>{t('buttons.translate')}</button>
            <div id="translations">
                <h2 style={{ textDecoration: "underline" }}>{t('text.previous')}</h2>
                {translations &&
                    translations.map((translation, index) => (
                        <div key={index} className="translation">
                            <p key={index}>
                                {translation.regular} | {translation.translation}
                            </p>
                            <button className="remove" onClick={async e => {
                                e.preventDefault()

                                try {
                                    await fetch('/translation/delete', {
                                        method: "DELETE",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        mode: "cors",
                                        body: JSON.stringify({ id: translation._id })
                                    })

                                    await fetchData()
                                } catch(error) {
                                    console.error("Error removing translation: ", error)
                                }
                            }}>{t('buttons.remove')}</button>
                        </div>
                    ))
                }
            </div>
        </form>
    );
}
 
export default MorseForm;