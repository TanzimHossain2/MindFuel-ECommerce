import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Welcome to the app!</h1>
      <p>
        This is a simple app to demonstrate how to use ESLint and Prettier with
        TypeScript.
      </p>
    </div>
  );
}
