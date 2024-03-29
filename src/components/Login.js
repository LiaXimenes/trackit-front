import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import Loader from "react-loader-spinner";

import UserContext from '../context/UserContext';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [charging, setCharging] = useState(false);

    const { setUser } = useContext(UserContext);

    const history = useHistory();

    function onLogin() {
        setCharging(true);

        const body = {
            email,
            password
        }

        const request = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", body)
        request.then((response) => { setUser(response.data); history.push("/Today") });
        request.catch(() => { alert("Ocorreu um erro!"); setCharging(false); setEmail(""); setPassword("") });
    }

    return (
        <Whitebody>
            <Top>
                <Growth src="plant-growth.jpg" />
                <div>
                    <Logo>TrackIt</Logo>
                </div>
            </Top>

            <Inputs>
                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={charging} />
                <input type="password" placeholder="senha" onChange={(e) => setPassword(e.target.value)} value={password} disabled={charging} />

                <button onClick={onLogin}>{charging === true ? <Loader type="ThreeDots" color="#fff" height={45} width={60} /> : "Entrar"}</button>

                <Link to="/Register">
                    <p>Não tem conta? Cadastre-se</p>
                </Link>

            </Inputs>
        </Whitebody>
    )
}

const Whitebody = styled.div`
    width: 100%;
    height: 700px;
    background: #ffffff;
`

const Top = styled.div`
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 68px;
    margin-bottom: 32px;
`;

const Growth = styled.img`
    width: 200px;
    height: 120px; 
`;

const Logo = styled.p`
    font-size: 70px;
    font-family: 'Playball', cursive;
    color: #126BA5;
`;

const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    input{
        width: 303px;
        height: 45px;
        border-radius: 5px;
        border: solid 1px #D4D4D4;
        margin-bottom: 6px;
        padding-left: 10px;
        font-size: 18px;
        color:black;
        :disabled{
            background-color: #f2f2f2 ;
        }

    }

    button{
        width: 315px;
        height: 45px;
        border-radius: 5px;
        background: #52B6FF;
        font-size: 20px;
        color: #FFFFFF;
        margin-bottom: 25px;
        font-family: 'Lexend Deca', sans-serif;
    }

    p{
        color: #52B6FF;
        font-family: 'Lexend Deca', sans-serif;
    }

`;