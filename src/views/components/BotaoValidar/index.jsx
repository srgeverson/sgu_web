import React, { useState } from 'react';
import { Button, Spinner, Tooltip } from 'reactstrap';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const BotaoValidar = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    if (props.aguardando) {
        return (
            <div>
                <Button
                    id="idValidar"
                    color="primary"
                    className="btn btn-sm" disabled>
                    Aguarde
                    <Spinner className="ml-1" size="sm" color="light" />
                </Button>
                <Tooltip placement="top" isOpen={tooltipOpen} target="idValidar" toggle={toggle}>
                    Processando a autenticação...
                </Tooltip>
            </div>
        );
    }

    return (
        <div>
            <Button id="idValidar"
                color="primary"
                className="btn btn-sm">
                <DoneAllIcon />
                <span className="text-white ms-1">Validar</span>
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idValidar" toggle={toggle}>
                Confirmar Validação
            </Tooltip>
        </div>
    );

};

export default BotaoValidar;