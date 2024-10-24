import Link from 'next/link';
import styles from './Login.module.scss'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError] = useState("");

  const {push, query} = useRouter();

  const callbackUrl: any = query.callbackUrl ||"/";
  const handleSubmit = async (event :any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const res = await signIn ("credentials", {
        redirect : false,
        email : event.target.email.value,
        password : event.target.password.value,
        callbackUrl,
      });
      
      if(!res?.error){
        setIsLoading(false);
        push(callbackUrl);
      } else {
      setIsLoading(false);
      setError("Email or password is incorrect");
      }
    } catch (error:any) {
      setIsLoading(false);
      setError("Email or password is incorrect");
      }

    
  }
  return(
    <div className={styles.login}> 
      <h1 className={styles.login__title}> Login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className = {styles.login__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.login__form__item}>
            <label className = {styles.login__form__item__label} htmlFor="email">Email</label>
            <input className = {styles.login__form__item__input} type="email" name="email" id="email" placeholder='email'/>
            <label className = {styles.login__form__item__label} htmlFor="password">Password</label>
            <input className = {styles.login__form__item__input} type="password" name="password" id="password" placeholder='Password'/>
          </div>
          <button className = {styles.login__form__item__button} type = "submit" disabled = {isLoading}>
            {isLoading ? "Loading...":"Login"}
          </button>
        </form>
        <button 
            onClick={()=>
              signIn("google", {
                callbackUrl,
                redirect:false
              })
            }
            className={styles.login__form__item__google}
          >
            sign in with google
          </button>
      </div>
      <p>no acc, register <Link className={styles.login__link} href="/auth/register">here</Link></p>
    </div>
  );
};

export default LoginView;
