import { request, gql } from "graphql-request";

const query = gql`
    {
      pokemons(first: 40) {
        id
        number
        name
        image
        classification
        weight {
          minimum
          maximum
        }
        height {
          minimum
          maximum
        }
      }
    }
  `;

export const fetchPokemons = () => {
    return request("https://graphql-pokemon2.vercel.app/", query)
};