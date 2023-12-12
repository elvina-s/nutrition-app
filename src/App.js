import { useState } from "react";
import { useEffect } from "react";
import { LoaderPage } from "./LoaderPage";
import { Nutritions } from "./Nutritions";

function App() {
// https://api.edamam.com/api/nutrition-details?app_id=c40b5955&app_key=360e05468e78ddc1631a83a4c96cf7fe

  const MY_ID = "c40b5955";
  const MY_KEY = "360e05468e78ddc1631a83a4c96cf7fe";
  const apiLink = "https://api.edamam.com/api/nutrition-details";

  const [results, setResults] = useState();
  const [inputData, setInputData] = useState();
  const [wordSubmitted, setWordSubmitted] = useState("");
  const [stateLoader, setStateLoader] = useState(false);

  const displayInputData = (e) => {
    setInputData(e.target.value);
  }

  const submitInputData = (e) => {
    e.preventDefault();
    setWordSubmitted(inputData);
  }

  useEffect(() => {
    if (wordSubmitted !== "") {
      let ingr = wordSubmitted.split(/[,,;,\n,\r]/);
      fetchAPI(ingr);
    }
  }, [wordSubmitted])

  const fetchAPI = async (ingr) => {
    setStateLoader(true);

    const response = await fetch(`${apiLink}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingr })
    })

    if(response.ok) {
      setStateLoader(false);
      const data = await response.json();
      setResults(data);
    }
    else {
      setStateLoader(false);
      alert(`You've enetered ingredients incorrectly!`);
    }
  }

  return (<div>
    {stateLoader && <LoaderPage/>}
    <h1>Nutrition Analysis</h1>
    <form onSubmit={submitInputData}>
      <input onChange={displayInputData} value={inputData}></input>
      <button onClick={submitInputData}>Search</button>
    </form>
    {results && <p>{results.calories} kcal</p>}
    {results && Object.values(results.totalNutrients).map(({ label, quantity, unit}) => 
    <Nutritions
    label = {label}
    quantity = {quantity}
    unit = {unit}/>)}
  </div>
  );
}

export default App;