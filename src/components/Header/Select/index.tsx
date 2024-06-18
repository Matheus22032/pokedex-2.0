import { OPTIONS } from "./const";
import "./index.css";
const Select = () => {

    return (
        <select className="options-style">
            {OPTIONS.map((option: string) => (
                option === "" ? <option key={option} value={option} >
                Selecione um tipo
            </option>:
                
            <option key={option} value={option} >
                {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
           ))}
        </select>
    );
}

export default Select;