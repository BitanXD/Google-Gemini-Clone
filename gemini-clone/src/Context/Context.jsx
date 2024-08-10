import { createContext, useState } from "react";
import run from "../Config/Gemini";

export const Context = createContext();

const contextProvider = (props) => {

    const[input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompts, setPreviousPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("")

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        const response = await run(input);
        setResultData(response);
        setLoading(false);
        setInput("");
    }

    
    const contextValue = {
        previousPrompts, setPreviousPrompts,
        onSent,
        setRecentPrompt, recentPrompt,
        showResult,
        loading,
        input, setInput,
        resultData
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default contextProvider;