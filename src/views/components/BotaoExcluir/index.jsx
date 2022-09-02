import React, { useState } from 'react';
import { Button, Tooltip } from 'reactstrap';
import DeleteIcon from '@mui/icons-material/Delete';

const BotaoExcluir = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <>
            <Button onClick={props.onClick} id="idApagar" className="btn btn-danger btn-sm m-1">
                <DeleteIcon />
            </Button>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idApagar" toggle={toggle}>
                Excluir Cadastro!
            </Tooltip>
        </>
    );
};

export default BotaoExcluir;