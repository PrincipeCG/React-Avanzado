import React, { useEffect, useState } from "react";
import './ArticulosBlogs.css';



export default function ArticulosBlog() {
    const [character, setCharacter] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError]         = useState(null);

    useEffect(()=> {
        fetch('https://rickandmortyapi.com/api/character')
            .then( res => {
                if (!res.ok) throw new Error('Error al obtener los personajes');
                return res.json();
            })
            .then(data => setCharacter(data.results))
            .catch(err => setError(err))
            .finally(()=> setIsLoading(false));
    }, []);

    if (isLoading) return <h1>Cargando Personajes...</h1>;
    if (error) return<h1> Error: {error}</h1>;

    return (
        <div className="articulos">
            <h2>Personajes de Ricardo y Martin</h2>
            {character.map(character => (
                <div className="card" key={character.id}>
                    <h3>{character.name}</h3>
                    <p>{character.species}</p>
                    <img src={character.image} alt={character.name} />
                </div>
            ))}
        </div>
    )
}