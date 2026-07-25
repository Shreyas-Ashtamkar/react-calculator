import { useState, type MouseEventHandler } from "react";
import "./index.css";

import { Button } from "./components/ui/button";

interface CalculatorButtonProps {
  value: string;
  onClickHandler?: Function;
}

const BUTTONS = [
  "AC", "C", "←", "/",
  "7", "8", "9", "*",
  "4", "5", "6", "+",
  "1", "2", "3", "-",
  ".", "0", "%", "="
];

const BUTTON_PROPERTIES: Record<string, Record<string, string>> = {
  "1234567890.":{
    type: "n",
    style : "bg-white text-black hover:text-white"
  },
  "=":{
    type: "r",
    style : "bg-green-400 text-white"
  },
  "+-*/%":{
    type: "o",
    style : "bg-blue-400 text-white"
  },
  "AC":{
    type: "c",
    style : "bg-red-500 text-white"
  },
  "←":{
    type: "b",
    style : "bg-gray-400 text-white"
  }
}

function CalculatorButton({ value, onClickHandler = (e: any) => { console.log(e) } }: CalculatorButtonProps) {
  const style = Object.entries(BUTTON_PROPERTIES).find(([key]) => key.includes(value))?.[1]?.style || "bg-white text-black";

  return (
    <Button
      className={`border h-25 rounded-xl grid place-items-center text-3xl ${style}`}
      key={value}
      onClick={() => onClickHandler(value)}
    >
      {value}
    </Button>
  );
}

export function App() {
  const [value, setValue] = useState("0");

  const evaluate = (equation:string) => {
    let result = "";
    try{
      result = "" + parseFloat(eval(equation).toFixed(6));
    } catch(e){
      console.log(e);
      if(e instanceof SyntaxError)
        result = equation.slice(0,-1)
      else
        result = equation
    }
    return result;
  }

  const btnClickHandler = (btn: string) => {
    const btnType = Object.entries(BUTTON_PROPERTIES).find(([key]) => key.includes(btn))?.[1]?.type || "-" ;

    let finalValue = value === "0"? "": value;

    switch(btnType){
      case "c":
        finalValue = "";
        break;

      case "n":
        finalValue = (btn==="."?"0":"")+finalValue+btn;
        break;

      case "o":
        finalValue = evaluate(finalValue)
        finalValue = finalValue === ""? btn==="-"?"-":"": finalValue+btn;
        break;

      case "r":
        finalValue = evaluate(finalValue);
        break;
      
      case "b":
        finalValue = finalValue.slice(0,-1);
        break
        
    }

    finalValue = finalValue === ""? "0": finalValue;

    setValue(finalValue);
  }

  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <div className="w-150 h-200 bg-white rounded-2xl shadow-2xl">
        <div className="font-bold text-5xl m-4 pt-2 heading">Calculator</div>
        <div className="h-33 bg-black m-4 p-4 flex items-center justify-end rounded-2xl">
          <div className="text-white text-7xl result">{value}</div>
        </div>
        <div className="grid grid-cols-4 gap-4 m-4 h-auto">
          {BUTTONS.map((btn, i) => <CalculatorButton value={btn} key={i} onClickHandler={btnClickHandler} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
