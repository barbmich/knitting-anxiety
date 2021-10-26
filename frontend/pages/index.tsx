import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const getHello = async () => {
    try {
      const response = await fetch("/api/hello");
      const message = await response.json();
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  const getGoodbye = async () => {
    try {
      const response = await fetch("/api/goodbye");
      const message = await response.json();
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={getHello}>Hello</button>
      <button onClick={getGoodbye}>Goodbye</button>
    </div>
  );
};

export default Home;
