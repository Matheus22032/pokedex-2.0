import { CardProps } from "../CardsContainer/props";
import "./colors.css";
import "./index.css";


const Card = ({id,name,type,sprite, isVisible}: CardProps) => {
    return (
        <li className={`card ${type[0]}  ${isVisible ? "": "hidden"}`} >
            <p className="pokemon-id" >#{id.toString().padStart(3, "0")}</p>
            <img className="pokemon-sprite" src={sprite} alt="" id="spritePokemon"/>
            <h2 className="pokemon-name">{name}</h2>
            <p className="pokemon-type">{type.join(" | ")}</p>
        </li>
    );
}
export default Card;