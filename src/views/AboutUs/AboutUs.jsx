import './AboutUs.css';
import React from 'react';
import TeamCard from '../../components/Card/Card.jsx';
import Consolo0img from '../../../src/assets/img/Consolo0.jpeg';
import AlanSaavedraImg from '../../../src/assets/img/AlanSaavedra.jpeg';
import CARR10NImg from '../../../src/assets/img/CARR10N.jpeg';
import HistoryImg from '../../../src/assets/img/Nuestra Historia.jpeg';
import MissionImg from '../../../src/assets/img/Nuestra Mision.jpeg';
import TeamImg from '../../../src/assets/img/Nuestro Equipo.jpeg';
import GithubImg from '../../../src/assets/img/github-logo-black.jpeg';

const AboutUs = () => {
  const teamInfo = [
    {
      img: AlanSaavedraImg,
      text: 'Estudiante de Ingeniería Civil en Software de la Pontificia Universidad Católica de Chile, \
            generación 2022, con minor en Data Science. Quiero aportar al gran impacto que tiene el \
            software en la sociedad.',
      name: 'Alan Saavedra',
      github_username: 'AlanSaavedra',
      git_profile_url: 'https://github.com/AlanSaavedra',
    },
    {
      img: CARR10NImg,
      text: 'Estudiante de la Licenciatura Ingeniería en Ciencias de la Computación, generación 2023, \
            originario de la 4ta región y con interes en máquinas de Turing y hardware de computadoras.',
      name: 'Alonso Carrion',
      github_username: 'CARR10N',
      git_profile_url: 'https://github.com/CARR10N',
    },
    {
      img: Consolo0img,
      text: 'Estudiante de Ingeniería Civil en Software de la Pontificia Universidad Católica de Chile, \
            generación 2022, con minor en Data Science y un fuerte interés por la innovación tecnológica \
            y el machine learning.',
      name: 'Agustín Consolo',
      github_username: 'Consolo0',
      git_profile_url: 'https://github.com/Consolo0',
    },
  ];

  return (
    <div className="about-container">
      <section className="about-section">
        {/* Bloque 1: Imagen Izquierda */}
        <div className="team-row normal">
          <img
            src={HistoryImg}
            alt="Historia"
            className="team-img"
          />
          <div className="team-text">
            <h2>Nuestra Historia</h2>
            <p>
              Somos un equipo apasionado por el ajedrez y los juegos de
              estrategia, y decidimos ir más allá: fusionamos ambos mundos para
              crear una experiencia única, donde cartas especiales transforman
              cada partida en un duelo impredecible y lleno de sorpresas.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="team-row reverse">
          <img
            src={MissionImg}
            alt="Misión"
            className="team-img"
          />
          <div className="team-text">
            <h2>Nuestra Misión</h2>
            <p>
              Nos proponemos revolucionar lo clásico: convertir cada partida en
              una mezcla vibrante de táctica, sorpresa y pura diversión, donde
              lo inesperado es parte del juego.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="team-row normal">
          <img
            src={TeamImg}
            alt="Equipo"
            className="team-img"
          />
          <div className="team-text">
            <h2>El Equipo</h2>
            <p>
              Somos estudiantes de Ingeniería en Software en la Pontificia
              Universidad Católica de Chile, y en este proyecto del curso
              Tecnologías y Aplicaciones Web unimos nuestras habilidades como
              desarrolladores, diseñadores y amantes de los juegos para crear
              experiencias memorables que mezclan estrategia, tecnología y
              diversión.
            </p>
          </div>
        </div>
      </section>
      <div className="team-box">
        {teamInfo.map((member, index) => (
          <div className="item" key={index}>
            <TeamCard
              img={member.img}
              text={member.text}
              name={member.name}
              github_username={member.github_username}
              github_logo={GithubImg}
              git_profile_url={member.git_profile_url}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
