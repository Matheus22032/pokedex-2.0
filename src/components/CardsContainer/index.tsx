import { useEffect, useState } from "react";
import Card from "../Card";
import "./index.css";
import { CardProps } from "./props"; "./props"

const CardsContainer = () => {
    const [cards, setCards] = useState<CardProps[]>([]);
    let offset = 0;
    const limit = 20;
    const total = 1301;

    const inputPrint = () => {
        const input = document.querySelector('#namePokemon') as HTMLInputElement;
        const namePokemon = input.value;
        setCards(prevsCard => prevsCard.map((card) => {
            if(card.name.includes(namePokemon)){
                return {...card, isVisible: true}
            }
            return {...card, isVisible: false}
        }
        ));
    }

    const fetchPokemon = async (offsetPa: number, limitPa: number) => {
        return await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limitPa}&offset=${offsetPa}`)
            .then(response => response.json())
            .then(data => {
                const  promise =  data.results.map( (pokemon: any) => {
                    return  fetch(pokemon.url)
                        .then(response => response.json())
                        .then(data => {
                            
                            return {
                                id: data.id,
                                name: data.name,
                                type: data.types.map((type: any) => type.type.name),
                                sprite: data.sprites.front_default,
                                isVisible: true
                            };
                        });
                })
                return Promise.all(promise);
            });
    }

    const loadPokemon = async () => {
        await fetchPokemon(offset, limit).then(pokemons => {
                setCards(prevsCard => [...prevsCard, ...pokemons]);
        } 
        ).finally(() => {
            offset += limit;
        });
        if (offset < total) {
            loadMorePokemon();
        }
        
    };

    const loadMorePokemon =  async () => {
        for (let i = offset; i <= total; i += limit) {
            await fetchPokemon( i ,limit)
            .then(pokemons => { 
                console.log(i);
                setCards(prevsCard => [...prevsCard, ...pokemons]);
            });
        }
    }

    useEffect(() => {
        loadPokemon();
        const input = document.querySelector('#namePokemon') as HTMLInputElement;
        input.addEventListener('input', inputPrint);
    }, []);


    return (
        <main className="pokedex-body">
            <ul data-js="pokedex" className="pokedex-content">
                {cards.map(card => (
                    <Card key={card.id} {...card} />
                ))}
            </ul>
        </main>
    );
}

export default CardsContainer;