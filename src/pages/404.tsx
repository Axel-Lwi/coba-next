import styles from "@/styles/404.module.scss";
import Image from "next/image";
const Custom404 = () => {
  return (
    <div className={styles.error}>
      <Image src = "/404 Error-bro.png" alt = "404" width={400} height={400} className={styles.error__image}/>
      <h1>404 | page not found</h1>
    </div>
  );
 

};

export default Custom404;