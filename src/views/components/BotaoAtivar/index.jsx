import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';
import CheckIcon from '@mui/icons-material/Check';

const BotaoAtivar = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <>
            <Button onClick={props.onClick} id="idAtivar" className="btn btn-success btn-sm m-1">
                <CheckIcon />
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idAtivar" toggle={toggle}>
                Ativar Registro
            </Tooltip>
        </>
    );
};

export default BotaoAtivar;