import React from 'react';
import { Button, Tooltip } from 'reactstrap';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const Relatorio = (props) => {
    return (
        <>
            <Button id="idRelatorio" className="btn btn-secondary btn-sm">
                <PictureAsPdfIcon />
                <span className="text-white"> Relatório</span>
            </Button>
            <Tooltip placement="top" target="idRelatorio">
                Relatório
            </Tooltip>
        </>
    );
};

export default Relatorio;