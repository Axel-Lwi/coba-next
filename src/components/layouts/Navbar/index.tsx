import Image from 'next/image';
import styles from './Navbar.module.css';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const {data}:any = useSession();
  return (  
    <div className ={styles.navbar}>
      <div className = "big">Navbar</div>
      <div className = {styles.profile}>
        {data?.user?.image && (
          <Image
            className = {styles.avatar}
            src ={data.user.image}
            width={40}
            height={40} 
            alt = {data.user.fullname}
            />
        )}
        {data && data.user.fullname}{" "}
        {data ? (
          <button className={styles.button} onClick={() => signOut()}>Sign Out</button>
        ) : (
          <button className={styles.button} onClick={()=> signIn()}>Sign In</button>
        )}
      </div>   
    </div>
  );
};


export default Navbar;