
import React from 'react';
import { FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

import BotaoCancelar from '../BotaoCancelar';
import BotaoConfirmar from '../BotaoConfirmar';

const ModalDesativar = (props) => {
    return (
        <div>
            <Modal isOpen={props.isOpen} toggle={props.toogle}>
                <ModalHeader toggle={props.toogle}>Desativar {props.desativar}</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <div>
                            <Alert color="warning">
                                <h4 className="alert-heading">Atenção!</h4>
                                <p>
                                    Após a confirmação desta operação, os dados não poderão ser ultilizados no sistema!
                                </p>
                                <hr />
                                <p className="mb-0">
                                    Tem certeza que quer desativar?
                                </p>
                            </Alert>
                        </div>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <BotaoCancelar className="m-1" onClickCancelar={props.toogle} />
                    <span onClick={() => props.desativarObjeto()}>
                        <BotaoConfirmar className="m-1" aguardando={props.aguardando} />
                    </span>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalDesativar;