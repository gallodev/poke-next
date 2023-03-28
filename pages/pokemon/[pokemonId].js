import Image from "next/image";

import styles from '../../styles/Pokemon.module.css'

export async function getStaticPaths() {
    const maxPokemons = 252;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxPokemons}`);
    const pokemons = await response.json();
  
    const paths = pokemons.results.map((pokemon,index) => {
        return {
            params: {pokemonId: (index + 1).toString()}
        }
    })

    return {
        paths:paths,
        fallback:false
    }
}
export async function getStaticProps(ctx){
    const id = ctx.params.pokemonId;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json()
    return {
        props:{
             pokemon: data
        }
    }
}


export default function pokemon({pokemon}) {
    return (
        <div className={styles.pokemon_container}>
            <h1>{pokemon.name}</h1>
            <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                width={200}
                height={200}
                alt={pokemon.name}
             />
             <div>
                <h3>Número:</h3>
                <p>#{pokemon.id}</p>
             </div>
             <div className={styles.type_container}>
                <h3>Tipo:</h3>
                <div>
                    {pokemon.types.map((item,index) => (
                        <span key={index} className={`${styles.type} ${styles.type['type_' + item.type.name]}`}>{item.type.name}</span>
                    ))}
                </div>
             </div>
             <div className={styles.data_container}>
                <div className={styles.data_height}>
                    <h4>Altura</h4>
                    <p>{pokemon.height * 10} cm</p>
                </div>
                <div className={styles.data_weight}>
                    <h4>Peso</h4>
                    <p>{pokemon.weight / 10} kg</p>
                </div>
             </div>
        </div>
    )
}