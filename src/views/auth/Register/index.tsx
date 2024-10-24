import Link from 'next/link';
import styles from './Register.module.scss'
import { useState } from 'react';
import { useRouter } from 'next/router';
const RegisterView = () => {
  const [isLoading, setiIsLoading] = useState(false);
  const [error,setError] = useState("");
  const {push} = useRouter();
  const handleSubmit = async (event :any) => {
    event.preventDefault();
    setError("");
    setiIsLoading(true);
    const data= {
      email : event.target.email.value,
      fullname : event.target.fullname.value,
      password : event.target.password.value
    };
    const result = await fetch ('/api/register',{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(data),
    });

    if(result.status === 200){
      event.target.reset();
      push("/auth/login");
    } else{
      setiIsLoading (false);
      setError(result.status === 400? "email already exists" : "");
    }
  }
  return(
    <div className={styles.register}> 
      <h1 className={styles.register__title}> Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className = {styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label className = {styles.register__form__item__label} htmlFor="email">Email</label>
            <input className = {styles.register__form__item__input} type="email" name="email" id="email" placeholder='email'/>
            <label className = {styles.register__form__item__label} htmlFor="fullname">Fullname</label>
            <input className = {styles.register__form__item__input} type="text" name="fullname" id="fullname" placeholder='Fullname'/>
            <label className = {styles.register__form__item__label} htmlFor="password">Password</label>
            <input className = {styles.register__form__item__input} type="password" name="password" id="password" placeholder='Password'/>
          </div>
          <button className = {styles.register__form__item__button} type = "submit" disabled = {isLoading}>
            {isLoading ? "Loading...":"Register"}
          </button>
        </form>
      </div>
      <p>hab acc alr? click <Link className={styles.register__link} href="/auth/Login">here</Link></p>
    </div>
  );
};

export default RegisterView;
