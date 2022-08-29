import React, { useState } from 'react';
import { Button, Spinner, Tooltip } from 'reactstrap';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const BotaoLogin = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    if (props.aguardando) {
        return (
            <div>
                <Button
                    id="idEntrar"
                    color="primary"
                    className="btn btn-sm" disabled>
                    Aguarde
                    <Spinner className="ml-1" size="sm" color="light" />
                </Button>
                <Tooltip placement="top" isOpen={tooltipOpen} target="idEntrar" toggle={toggle}>
                    Processando a autenticação...
                </Tooltip>
            </div>
        );
    }

    return (
        <div>
            <Button id="idEntrar"
                color="primary"
                className="btn btn-sm">
                <LockOpenIcon />
                <span className="text-white">Entrar</span>
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idEntrar" toggle={toggle}>
                Confirmar Autenticação
            </Tooltip>
        </div>
    );

};

export default BotaoLogin;