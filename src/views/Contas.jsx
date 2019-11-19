import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row, Table, Button, Modal } from "reactstrap";
import ContaDialog from "./ContaDialog";


class Contas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      items: []
    };
  }

  componentDidMount() {

    const URL_TO_FETCH = "http://localhost:8080/minhas-contas-na-web/conta-agendada/contas";
    fetch(URL_TO_FETCH, {
      method: 'get' // opcional
    })
      .then((response) => {
        response.json()

          .then((result) => {
            console.log(result);
            this.setState({
              isLoaded: true,
              items: [result]
            });
          });
      })
      .catch(function (err) { console.error(err); });
  }

  renderTableData() {
    if (this.state && this.state.items && Object.keys(this.state.items).length > 0) {
      return this.state.items.map((row, index) => {
        console.log('row', row);

        return Object.keys(row).map((chave, index) => {
          console.log(row[chave]);
          const { dataPagamento, dataVencimento, descricao, periodicidade, status, valor } = row[chave]; //destructuring
          var dtaAux = (new Date(dataVencimento.seconds * 1000));
          var dtaVencimentoFormatada = dtaAux.getDate() + '/' + dtaAux.getMonth() + '/' + dtaAux.getFullYear();

          return <tr key={chave}>
            <td>{descricao}</td>
            <td>{dtaVencimentoFormatada}</td>
            <td>{new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(valor)}</td>
          </tr>
        });
      })
    }
  }


  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Novembro</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Descrição</th>
                        <th>Data de Vencimento</th>
                        <th className="text-right">Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.renderTableData()}
                      <tr>
                        <th></th>
                        <th></th>
                        <th><ContaDialog buttonLabel='Adicionar' /></th>
                      </tr>

                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );

  }
}

export default Contas;
