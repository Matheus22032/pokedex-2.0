import Select from "./Select";
import logo from "../../assets/pokemon-logo-8 1.png";
import searchIcon from "../../assets/search-icon.png";
import "./index.css";

const Header = () => {
    return (
        <header className="header">
        <img className="logo" src={logo} alt="Logo Pokemon"/>
        <form method="POST" action="" id="formSearch">
            <div className="search-zone">
                <input type="text" id="namePokemon" placeholder="Nome do Pokémon"/>
                <div className="search-type">
                    <Select/>
                    <Select/>
                </div>
                <button id="btn"><img className="search-icon" src={searchIcon} alt="serch-icon"/></button>
            </div>
        </form>
        <div id="errorSearch"></div>
    </header>
    );
}

export default Header;