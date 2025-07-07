import './Card.css';
import { useState } from 'react';

const TeamCard= ({img, name, text, github_username, github_logo, git_profile_url}) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const HandleFlip = ()=> {
		setIsFlipped(!isFlipped)
	};

	return (
		<div className='card' onClick={HandleFlip}>
			<div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>

				<div className='card-face front'>
					<div className='vertical-container'>
						<button 
							className='image-button' 
							style={{backgroundImage:`url(${github_logo})`}}
							onClick={() => window.open(`${git_profile_url}`, "_blank")}
						></button>
						<h2>{github_username}</h2>
					</div>
				</div>

				<div className='card-face back'>
					<div className='card-content'>
						<div className='card-header'>
							<img className='profile-picture' src={img}/>
							<h2>{name}</h2>
						</div>
						<div className='card-body'>
							<p>{text}</p>
						</div>
					</div>
				</div>

			</div>
		</div>
	)
};

export default TeamCard;