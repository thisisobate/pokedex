import { css } from "@emotion/css";
import React, { useEffect, useState } from "react";
import { ButtonCard } from "../components/Button/ButtonCard";
import { Pagination } from "../components/Pagination";
import { Avatar } from "../components/Avatar";
import { Link } from "react-router-dom";
import logoutIcon from "../images/logout.png";
import { fetchPokemons } from "../utils/api";

interface PokemonSchema {
  number?: string;
  name?: string;
  image?: string;
  classification?: string;
  height?: { [key: string]: string };
  weight?: { [key: string]: string };
}

export const Dashboard = () => {
  const styles = getDashboardStyles();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [activePokemon, setActivePokemon] = useState<PokemonSchema | null>(
    null
  );

  const offset = (page - 1) * 10;

  const handleClick = (event: Event, id: string) => {
    event.stopPropagation();
    const selectedPokemon = posts.find(
      (pokemon: { id: string }) => pokemon.id === id
    );
    console.log(selectedPokemon);
    setActivePokemon(selectedPokemon!);
  };

  useEffect(() => {
    fetchPokemons().then((data) => {
      setPosts(data.pokemons);
      setActivePokemon(data.pokemons[0]);
    });
  }, [setActivePokemon]);

  return (
    <main className={styles.background}>
      <Link to="/">
        <button className={styles.logout}>
          <img src={logoutIcon} width="40" height="40" alt="logout" />
        </button>
      </Link>
      <div className={styles.outerDiv}>
        <aside className={styles.leftSection}>
          <div className={styles.listPane}>
            {posts
              .slice(offset, offset + 10)
              .map(({ id, number, name, image }) => (
                <ButtonCard
                  key={id}
                  id={id}
                  onClick={(e) => handleClick(e, id)}
                  number={number}
                  name={name}
                  imgSrc={image}
                  imgAlt={name}
                  size="lg"
                />
              ))}
          </div>
          <Pagination
            total={posts.length / 3}
            limit={4}
            page={page}
            setPage={setPage}
          />
        </aside>
        <section className={styles.rightSection}>
          <header className={styles.header}>
            <h4>{activePokemon?.name ?? ""}</h4>
            <h4 className={styles.textYellow}>
              {activePokemon?.number && `#${activePokemon.number}`}
            </h4>
          </header>
          {activePokemon && (
            <div className={styles.display}>
              <Avatar
                src={activePokemon.image}
                alt={activePokemon.name}
                size="lg"
              />
              <div>
                <h2>Details</h2>

                <p>
                  <b>Classification:</b> {activePokemon.classification}
                </p>
                <p>
                  <b>Minimum Height:</b> {activePokemon?.height?.minimum}
                </p>
                <p>
                  <b>Maximum Height:</b> {activePokemon?.height?.maximum}
                </p>
                <p>
                  <b>Minimum Width:</b> {activePokemon?.weight?.minimum}
                </p>
                <p>
                  <b>Minimum Width:</b> {activePokemon?.weight?.maximum}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

const getDashboardStyles = () => ({
  background: css`
    min-height: 100vh;
    background-color: #484d57;
    background-attachment: fixed;
  `,
  outerDiv: css`
    @media (max-width: 720px) {
      flex-direction: column;
    }
    width: 80vw;
    height: 80vh;
    display: flex;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
  leftSection: css`
    background-color: #2c2f36;
    color: #fff;
    padding-top: 10px;
    flex: 1;
    border-top-left-radius: 10px 10px;
    border-bottom-left-radius: 10px 10px;
  `,
  rightSection: css`
    background-color: #3b3e45;
    color: #fff;
    flex: 1.5;
    border-top-right-radius: 10px 10px;
    border-bottom-right-radius: 10px 10px;
  `,
  listPane: css`
    height: 70vh;
    margin: 0 auto;
    overflow-y: auto;
    & > button {
      margin: 20px auto;
    }
  `,
  display: css`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding-top: 20px;
    & > div:first-child {
      align-self: center;
    }

    & > div:last-child {
      margin-left: 20px;
    }
  `,
  textYellow: css`
    color: #f2c94c;
    font-weight: bold;
  `,
  logout: css`
    border: none;
    background: none;
    border-radius: 4px;
    float: right;
    margin-right: 40px;
    margin-top: 20px;
  `,
  header: css`
    justify-content: space-between;
    display: flex;
    padding: 30px;
    border-bottom: 1px solid #000;
    font-size: 1.4rem;
  `,
});
