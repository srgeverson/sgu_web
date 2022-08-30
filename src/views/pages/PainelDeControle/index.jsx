import React, { useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { FormGroup, Input, Label } from 'reactstrap';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import BotaoPesquisar from '../../components/BotaoPesquisar';
import BotaoRelatorio from '../../components/BotaoRelatorio';
import { Chart } from "react-google-charts";

const PainelDeControle = () => {

    const [dataInicio, setDataInicio] = useState(format(new Date(), 'yyyy-MM-dd', { locale: pt }));

    const ajustaDataInicio = (dataOriginal) => {
        dataOriginal ? setDataInicio(format(new Date(dataOriginal), 'yyyy-MM-dd', { locale: pt })) : setDataInicio("");
    }

    const [dataFim, setDataFim] = useState(format(new Date(), 'yyyy-MM-dd', { locale: pt }));

    const ajustaDataFim = (dataOriginal) => {
        dataOriginal ? setDataFim(format(new Date(dataOriginal), 'yyyy-MM-dd', { locale: pt })) : setDataFim("");
    }

    const [atendimentos] = useState({ concluidos: 100, pendentes: 400, urgentes: 200, });

    const options = {
        title: "Quantidade vs. Período",
        hAxis: { title: "Periodo", viewWindow: { min: 0, max: 12 } },
        vAxis: { title: "Quantidade", viewWindow: { min: 0, max: 1000 } },
        legend: "none"
    };

    const data = [
        ["Periodo", "Quantidade"],
        [8, 12],
        [4, 5.5],
        [11, 14],
        [4, 5],
        [3, 3.5],
        [6.5, 7]
    ];

    const [graficoPizza] = useState({
        title: 'Gráfico de Pizza',
        slices: [
            {
                color: "#D91E48"//DANGER
            },
            {
                color: "#FFC107"//WARNING
            },
            {
                color: "#007FAD"//INFO
            },
        ],
    });

    const [graficoBarra] = useState({
        title: 'Gráfico de Barra'
    });

    const [dadosPizza] = useState([
        ['Atendimentos', 'Quantidade'],
        ['Urgentes', atendimentos.urgentes],
        ['Pendentes', atendimentos.pendentes],
        ['Concluídos', atendimentos.concluidos],
    ]);

    const [dadosBarra] = useState([
        ['Clientes', 'Atendimentos 2020', 'Atendimentos 2021'],
        ['Darlan Guerreiro', 500500, 60060],
        ['Geverson Souza', 31000, 15001],
        ['Vitor Souza', 30000, 30000],
        ['Carlos Gondim', 300040, 500550],
        ['Outros', 1000567, 150000],
    ])

    return (
        <div>
            <div className="d-flex">
                <div className="mr-auto p-2">
                    <h2 className="display-4 titulo">Painel de Controle</h2>
                </div>
            </div>
            <hr />
            <div className="form-group row">
                <div className="col-sm-5">
                    <FormGroup>
                        <Label for="nomeCliente">Nome do cliente</Label>
                        <Input
                            type="text"
                            //value={nomeCliente}
                            name="nomeCliente"
                            id="nomeCliente"
                            autoComplete="nomeCliente"
                            //onChange={(ev) => this.onChangeInput("nomeCliente", ev)}
                            placeholder="Filtar por cliente" />
                    </FormGroup>
                </div>
                <div className="col-sm-3">
                    <FormGroup>
                        <Label for="tecnico">Técnico</Label>
                        <Input
                            id="tecnico"
                            name="tecnico"
                            //onChange={(ev) => this.onChangeInput("tecnico", ev)}
                            type="text"
                            //value={tecnico}
                            autoComplete="tecnico"
                            placeholder="Filtrar por técnico" />
                    </FormGroup>
                </div>
                <div className="col-sm-2">
                    <FormGroup>
                        <Label for="dataInicio">Início</Label>
                        <Input type="date" name="dataInicio" id="dataInicio" placeholder="Data inicial" value={dataInicio} onChange={(ev) => ajustaDataInicio(ev.target.value)} />
                    </FormGroup>
                </div>
                <div className="col-sm-2">
                    <FormGroup>
                        <Label for="dataFim">Fim</Label>
                        <Input type="date" name="dataFim" id="dataFim" placeholder="Data final" value={dataFim} onChange={(ev) => ajustaDataFim(ev.target.value)} />
                    </FormGroup>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-2">
                    <FormGroup>
                        <BotaoPesquisar onClickPesquisar={() => {
                            //this.props.limparUsuarios();
                            //this.pesquisarUsuarios();
                        }} />
                    </FormGroup>
                </div>
                <div className="col-sm-2">
                    <FormGroup>
                        <BotaoRelatorio />
                    </FormGroup>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-lg-3 col-sm-6 mt-1">
                    <div className="card bg-success text-white">
                        <div className="card-body">
                            <span className="row">
                                <ThumbUpIcon />
                                <h6 className="card-title ml-1">Atendimentos</h6>
                            </span>
                            <h2 className="lead">{atendimentos.concluidos + atendimentos.pendentes + atendimentos.urgentes}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 mt-1">
                    <div className="card bg-danger text-white">
                        <div className="card-body">
                            <span className="row">
                                <ErrorIcon fontSize='default' />
                                <h6 className="card-title ml-1">Urgentes</h6>
                            </span>
                            <h2 className="lead">{atendimentos.urgentes}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 mt-1">
                    <div className="card bg-warning text-white">
                        <div className="card-body">
                            <span className="row">
                                <WarningIcon />
                                <i className="fas fa-eye fa-3x"></i>
                                <h6 className="card-title ml-1">Pendentes</h6>
                            </span>
                            <h2 className="lead">{atendimentos.pendentes}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-6 mt-1">
                    <div className="card bg-info text-white">
                        <div className="card-body">
                            <span className="row">
                                <DoneAllIcon />
                                <h6 className="card-title ml-1">Concluídos</h6>
                            </span>
                            <h2 className="lead">{atendimentos.concluidos}</h2>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-lg-3 col-sm-6 mt-1">
                        <Chart
                            chartType="ScatterChart"
                            data={data}
                            options={options}
                            width="100%"
                            height="100%"
                            legendToggle
                        />
                    </div>
                    <div className="col-lg-4 col-sm-6 mt-1">
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="PieChart"
                            data={dadosPizza}
                            options={graficoPizza}
                        />
                    </div>
                    <div className="col-lg-4 col-sm-6 mt-1">
                        <Chart
                            width={'100%'}
                            height={'100%'}
                            chartType="BarChart"
                            data={dadosBarra}
                            options={graficoBarra} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PainelDeControle;