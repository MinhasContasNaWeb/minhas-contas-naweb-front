import React, { useState } from 'react';
import { Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const ContaDialog = (props) => {
    const {
        buttonLabel,
        className,
    } = props;

    let teste = "";
    teste = 1;


    const [modal, setModal] = useState(false);
    const [descricao, setDescricao] = useState("");
    const [descricaoValid, setDescricaoValid] = useState(false);
    const [descricaoInvalid, setDescricaoInvalid] = useState(false);

    const [dtaVencimento, setDtaVencimento] = useState(new Date());
    const [dtaVencimentoValid, setDtaVencimentoValid] = useState(false);
    const [dtaVencimentoInvalid, setDtaVencimentoInvalid] = useState(false);

    const [valor, setValor] = useState("");
    const [valorValid, setValorValid] = useState(false);
    const [valorInvalid, setValorInvalid] = useState(false);

    const toggle = () => setModal(!modal);

    const salvar = () => {
        console.log('descricao', descricao);
        console.log('dtaVencimento', dtaVencimento);
        console.log('valor', valor);

        // valid={ this.state.validate.emailState === 'has-success' }
        // invalid={ this.state.validate.emailState === 'has-danger' }

        const URL_TO_FETCH = "http://localhost:8080/minhas-contas-na-web/contas";
        fetch(URL_TO_FETCH, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                descricao: descricao,
                dtaVencimento: dtaVencimento,
                valor: valor,
            })
        })
        .then((response) => {
            response.json()

                .then((result) => {
                    console.log(result);
                    if (result.error) {
                        alert(result.error)
                    } else {
                        this.setState({
                            isLoaded: true,
                            items: [result]
                        });
                    }
                });
        })
        .catch(function (err) { console.error(err); });
    }

    const validaInput = (setInput, e, setInputValid, setInputInvalid) => {
        setInput(e.target.value);
        if (e.target.value) {
            setInputValid(true);
            setInputInvalid(false);
        }
        else {
            setInputValid(false);
            setInputInvalid(true);
        }
    }

    return (
        <div>
            <Button color="primary" onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Cadastro de Conta</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="">Descrição</Label>
                            <Input type="text"
                                valid={descricaoValid}
                                invalid={descricaoInvalid}
                                value={descricao}
                                onChange={e => {
                                    validaInput(setDescricao, e, setDescricaoValid, setDescricaoInvalid);
                                }}></Input>
                            <FormFeedback>Campo Obrigatório</FormFeedback>
                            {/* <FormText>Example help text that remains unchanged.</FormText> */}
                        </FormGroup>
                        <FormGroup>
                            <Label for="">Data de Vencimento2</Label>
                            <Input type="date"  pattern="dd"
                                valid={dtaVencimentoValid}
                                invalid={dtaVencimentoInvalid}
                                value={dtaVencimento}
                                onChange={e => {
                                    validaInput(setDtaVencimento, e, setDtaVencimentoValid, setDtaVencimentoInvalid);
                                }}></Input>
                            <FormFeedback>Campo Obrigatório</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Valor</Label>
                            <Input type="number"
                                valid={valorValid}
                                invalid={valorInvalid}
                                value={valor}
                                onChange={e => {
                                    validaInput(setValor, e, setValorValid, setValorInvalid);
                                }}></Input>
                            <FormFeedback>Campo Obrigatório</FormFeedback>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={!(descricao && valor && dtaVencimento)} onClick={salvar}>Salvar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancelar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ContaDialog;

// function validaInput(setInput, e, setInputValid, setInputInvalid) {
//     setInput(e.target.value);
//     if (e.target.value) {
//         setInputValid(true);
//         setInputInvalid(false);
//     }
//     else {
//         setInputValid(false);
//         setInputInvalid(true);
//     }
// }
