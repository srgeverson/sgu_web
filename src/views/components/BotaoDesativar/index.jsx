import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';
import BlockIcon from '@mui/icons-material/Block';

const BotaoDesativar = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <>
            <Button onClick={props.onClick} id="idDesativar" className="btn btn-warning btn-sm m-1">
                <BlockIcon />
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idDesativar" toggle={toggle}>
                Desativar Registro
            </Tooltip>
        </>
    );
};

export default BotaoDesativar;