import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Tooltip } from 'reactstrap';
import VisibilityIcon from '@mui/icons-material/Visibility';

const BotaoVisualizar = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);
    return (
        <>
            <Link to={props.uri}>
                <Button
                    id="idVisualizar"
                    className="btn btn-info btn-sm m-1">
                    <VisibilityIcon />
                </Button>
            </Link>
            <Tooltip placement="top" isOpen={tooltipOpen} target="idVisualizar" toggle={toggle}>
                Visualizar Cadastro!
            </Tooltip>
        </>
    );
};

export default BotaoVisualizar;