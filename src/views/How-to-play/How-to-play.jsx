import './How-to-play.css';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BotonesImg from '../../../src/assets/img/Botones partida.png';
import HowtoPlayImg from '../../../src/assets/img/How_to_play.png';
import ImagenNoDisponibleImg from '../../../src/assets/img/Imagen_no_disponible.png';

const section1 = () => {
  return (
        <div className="team-row normal">
          <img
            src={BotonesImg}
            alt="Botones de partida"
            title='Elige una de las opciones para jugar'
            className="button-img"
          />
          <div className="team-text">
            <h2>1. Empezar una Partida</h2>
            <p>
              Para empezar a jugar tienes dos(2) opciones:
                <ol>
                    <li>Buscar una partida contra otro jugador en el mundo: <br />Te conectarás automaticamente con otro jugador que busque partida.</li>
                    <li>Crear una sala e invitar a un amigo a jugar: <br />Serás enviado a la página de juego y tendrás un código con el que podrás invitar a alguien a tu partida.</li>
                </ol>
                <br />
              Presiona alguna de las opciones en la página principal y comienza a jugar.
            </p>
          </div>
        </div>)};

const section2 = () => {
  return (
        <div className="team-row reverse">
          <img
            src={HowtoPlayImg}
            alt="Juego de ejemplo"
            title='Usa tus cartas para mejorar tus piezas'
            className="game-img"
          />
          <div className="team-text">
            <h2>2. ¿Cómo jugar?</h2>
            <p>
              ¡Muy sencillo!
                <ol>
                    <li>Elige una poder: esto te permitirá hacer nuevos movimientos que serían imposibles en un juego normal de ajedrez</li>
                    <li>Usa la habilidad que escogiste y haz tu movimiento.</li>
                </ol>
                <br />
              Y listo, usa los poderes para idear nuevas e ingeniosas estrategias para vencer a tu oponente.
            </p>
          </div>
        </div>)};

const section3 = () => {
  return (
        <div className="team-row normal">
          <img
            src={ImagenNoDisponibleImg}
            alt="Función pendiente"
            title='Función pendiente'
            className="pending-img"
          />
          <div className="team-text">
            <h2>3. Tu perfil <span className='grey-text'>(Pendiente)</span> </h2>
            <p>
              Para llegar a tu perfil solo tienes que hacer click en el botón de tu perfil que se encuentra en la barra de navegación en la parte superior de tu pantalla.<br />
              <br />
              En tu perfil serás capaz de ver tu estadísticas, como tus victorias, derrotas y cuantas partidas has jugado.
              <br />
              <br />
              Aquí mismo también podrás ver algunas de tus partidas pasadas y ver los movimientos realizados en cada una de ellas.
            </p>
          </div>
        </div>)};

const sections = [section1, section2, section3];

const How_to_play = () => {
  const navigate = useNavigate();
    const [animacion, setAnimacion] = useState('');
    const [index, setIndex] = useState(0);
    const CurrentSection = sections[index];
    const handleNext = () => {
      setAnimacion('fade-out')
      setTimeout(() => {
        if (index < sections.length - 1) {
            setIndex(index + 1);
        }
        setAnimacion('fade-in');
      }, 250);
    };
    
    const handlePrevious = () => {
      setAnimacion('fade-out')
      setTimeout(() => {
        if (index > 0) {
            setIndex(index - 1);
        }
      setAnimacion('fade-in')
      }, 250);
    };

    const volverAlInicio = () => {
      navigate('/');
    }
    return(
    <div className="instructions-container">
      <section className={`instructions-section ${animacion}`}>
        <CurrentSection />
      </section>
      <section className='navigation'>
        <button style={{color : 'white'}} onClick={handlePrevious} disabled={index === 0}>
          Anterior
        </button>
        {index === 2 ? (
          <button style={{color : 'white'}} onClick={volverAlInicio}>¡A jugar!</button>
        ) : (
          <button style={{color : 'white'}} onClick={handleNext}>Siguiente</button>
        )}
      </section>
    </div>
    );
}

export default How_to_play;