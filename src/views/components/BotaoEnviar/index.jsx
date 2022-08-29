import React, { useState } from 'react';
import { Button, Spinner, Tooltip } from 'reactstrap';
import SendIcon from '@mui/icons-material/Send';

const BotaoEnviar = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    if (props.aguardando) {
        return (
            <div>
                <Button
                    id="idEnviar"
                    color="primary"
                    className="btn btn-sm" disabled>
                    Aguarde
                    <Spinner className="ml-1" size="sm" color="light" />
                </Button>
                <Tooltip placement="top" isOpen={tooltipOpen} target="idEnviar" toggle={toggle}>
                    Processando a envio...
                </Tooltip>
            </div>
        )
    }

    return (
        <div>
            <Button id="idEnviar"
                color="primary"
                className="btn btn-sm">
                <SendIcon />
                <span className="text-white ml-1">Enviar</span>
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idEnviar" toggle={toggle}>
                Confirmar Enviar
            </Tooltip>
        </div>
    )

};

export default BotaoEnviar;