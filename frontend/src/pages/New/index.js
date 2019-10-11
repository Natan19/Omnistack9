import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';
import api from '../../services/api';

export default function New({ history }) {
    const [ company, setCompany ] = useState('');
    const [ technologies, setTechnologies ] = useState('');
    const [ dailyfee, setDailyfee ] = useState('');
    const [ thumbnail, setThumbnail ] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail]);

    async function handleSubmit(e) {
        e.preventDefault();
        
        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('techs', technologies);
        data.append('price', dailyfee);
        data.append('company', company);

        await api.post('/spots', data, {
            headers: { user_id }
        }); 

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})`}}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img"/>
            </label>
            <label htmlFor="company">EMPRESA *</label>
            <input 
                id="company"
                placeholder="Sua empresa incrível"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />
            
            <label htmlFor="technologies">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
            <input 
                id="technologies"
                placeholder="Quais tecnologias usam?"
                value={technologies}
                onChange={event => setTechnologies(event.target.value)}
            />
            <label htmlFor="technologies">VALOR DA DIÁRIA <span>(em branco para GRATUITO)</span></label>
            <input 
                id="dailyfee"
                placeholder="Valor cobrado por dia"
                value={dailyfee}
                onChange={event => setDailyfee(event.target.value)}
            />
            <button className="btn" type="submit">Cadastrar</button>
        </form>
    )
}