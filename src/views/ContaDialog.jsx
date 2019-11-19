import React, { useState } from 'react';
import { Button, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Label, Input, FormFeedback, FormText } from 'reactstrap';
import PropTypes from 'prop-types';

const ContaDialog = (props) => {
    const {
        buttonLabel,
        className,
        descricao,
        dtaVencimento,
        valor
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const salvar = (props) => {
        console.log('descricao', descricao);
    }

    return (
        <div>
            <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Cadastro de Conta</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">Descrição</Label>
                            <Input type="text" value={props.descricao}></Input>
                            <FormFeedback>You will not be able to see this</FormFeedback>
                            {/* <FormText>Example help text that remains unchanged.</FormText> */}
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Data de Vencimento</Label>
                            <Input valid />
                            <FormFeedback valid>Sweet! that name is available</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Valor</Label>
                            <Input invalid />
                            <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={salvar}>Salvar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

ContaDialog.propTypes = {
	inputType: PropTypes.oneOf(['text', 'number']).isRequired,
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	changeFunc: PropTypes.func.isRequired,
	blurFunc: PropTypes.func.isRequired,
	focusFunc: PropTypes.func.isRequired,
	descricao: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]).isRequired,
	placeholder: PropTypes.string,
	valid: PropTypes.bool.isRequired,
	colWidth: PropTypes.object.isRequired
};

export default ContaDialog;