import Image from 'next/image';
import styles from '../styles/Home.module.css'
import Card from "../components/Card"
// trocar pelo axios

export async function getServerSideProps () {
  const maxPokemons = 252;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxPokemons}`);
  const pokemons = await response.json();

  pokemons.results.forEach((item,index) => {
    item.id = index + 1
  })

  return {
    props: {pokemons: pokemons.results}
  }
}
export default function Home({pokemons}) {    
  return (
    <div className={styles.home}>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Poke<span>next</span></h1>
        <Image src="/images/pokeball.png" width={50} height={50} alt="PokeNext"/>
      </div>
      <div className={styles.pokemon_container}>
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon}/>
      ))}
      </div>
    </div>
  )
}
