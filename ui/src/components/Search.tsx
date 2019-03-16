import React, { Component } from 'react';
import {
    Button,
    Container,
    Dimmer,
    Form,
    Icon,
    Input,
    Loader,
    Segment,
    Select,
    Statistic,
    Table
} from 'semantic-ui-react';

import messagesService from '../services/MessagesService';
import SGMessage from '../models/SGMessage';
import {toast} from 'react-toastify';
import {STATUSES} from '../constants';
import {DatesRangeInput} from 'semantic-ui-calendar-react';
import StatusCell from "./StatusCell";
import CompareModal from "./CompareModal";

export interface ISearchRequest {
    ref: string;
    status: string;
    tradeDateRange: string;
}

export interface ISearchState {
    isSearching: boolean;
    searchRequest: ISearchRequest;
    searchResults: SGMessage[];
    countMatched: number;
    countClosefit: number;
    selectedResult: SGMessage | undefined;
}

class Search extends Component<{}, ISearchState> {

    constructor(props: {}) {
        super(props);

        this.state = {
            isSearching: false,
            searchRequest: {
                ref: '',
                status: '',
                tradeDateRange: '',
            },
            searchResults: [],
            countMatched: 0,
            countClosefit: 0,
            selectedResult: undefined
        };

        this.handleRefInputChange = this.handleRefInputChange.bind(this);
        this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
        this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
        this.handleStatusSelectChange = this.handleStatusSelectChange.bind(this);
        this.handleTradeRangeChange = this.handleTradeRangeChange.bind(this);
        this.onCompareModalClose = this.onCompareModalClose.bind(this);
    }

    handleRefInputChange(value: string): void {
        this.setState(prevState => {
            const searchReq = prevState.searchRequest;
            searchReq.ref = value;
            return {
                searchRequest: searchReq
            };
        });
    }

    handleStatusSelectChange(value: string): void {
        console.log(value);
        this.setState(prevState => {
            const searchReq = prevState.searchRequest;
            searchReq.status = value;
            return {
                searchRequest: searchReq
            };
        });
    }

    handleTradeRangeChange(event: any, {name, value}: any): void {
        console.log(value);
        this.setState(prevState => {
            const searchReq = prevState.searchRequest;
            searchReq.tradeDateRange = value;
            return {
                searchRequest: searchReq
            };
        });
    }

    handleSearchButtonClick(): void {
        this.search();
    }

    handleClearButtonClick(): void {
        this.setState({
            searchRequest: {
                ref: '',
                status: '',
                tradeDateRange: '',
            }
        });
    }

    handleResultDoubleClick(result: SGMessage): void {
        this.setState({
            selectedResult: result
        });
    }

    onCompareModalClose(): void {
        this.setState({
            selectedResult: undefined
        });
    }

    private search(): void {
        this.setState({
            isSearching: true
        }, () => {
            messagesService.search(this.state.searchRequest).then(response => {
                this.setState({
                    isSearching: false,
                    searchResults: response,
                    countMatched: response.filter(item => item.status === 'matched').length,
                    countClosefit: response.filter(item => item.status === 'closefit').length,
                });
            }).catch(error => {
                toast.error(error.status + ':' + error.statusText);
                this.setState({
                    isSearching: false
                });
            });
        });
    }

    componentDidMount(): void {
        this.search();
    }

    render() {
        const {isSearching, searchRequest, searchResults, countMatched, countClosefit, selectedResult} = this.state;

        return(
            <Container style={{paddingTop: 10, paddingBottom: 50}}>
                { selectedResult && <CompareModal onModalClose={this.onCompareModalClose} sgRef={selectedResult.Key_20} clientRef={selectedResult.clientRef}/> }
                <Segment>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field control={Input} label='Reference' placeholder='06997FXJ1343375A..' value={searchRequest.ref} onChange={(event: any) => this.handleRefInputChange(event.target.value)} />
                            <Form.Field control={Select} label='Status' placeholder='06997FXJ1343375A..' value={searchRequest.status} onChange={(event: any) => this.handleStatusSelectChange(event.target.value)} options={STATUSES} />
                            <Form.Field>
                                <label>Trade Date</label>
                                <DatesRangeInput
                                    name='datesRange'
                                    placeholder='From - To'
                                    dateFormat='DD/MM/YYYY'
                                    value={searchRequest.tradeDateRange}
                                    iconPosition='left'
                                    popupPosition='bottom center'
                                    onChange={this.handleTradeRangeChange}
                                />
                            </Form.Field>
                        </Form.Group>
                        <div style={{textAlign: 'right'}}>
                            <Button basic content='Clear' onClick={this.handleClearButtonClick}/>
                            <Button basic color='blue' disabled={isSearching} loading={isSearching} onClick={this.handleSearchButtonClick}><Icon name='search' />Search</Button>
                        </div>
                    </Form>
                </Segment>
                <Segment disabled={isSearching} basic>
                    <Statistic.Group widths='four' size='mini'>
                        <Statistic>
                            <Statistic.Value>{searchResults.length}</Statistic.Value>
                            <Statistic.Label>Results</Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>{countMatched}</Statistic.Value>
                            <Statistic.Label>Matched</Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>{countClosefit}</Statistic.Value>
                            <Statistic.Label>Close fit</Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>{0}</Statistic.Value>
                            <Statistic.Label>Under Review</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </Segment>
                <Segment loading={isSearching}>
                    <Table basic='very' selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Reference</Table.HeaderCell>
                                <Table.HeaderCell>Trade Date</Table.HeaderCell>
                                <Table.HeaderCell>Party A</Table.HeaderCell>
                                <Table.HeaderCell>Party B</Table.HeaderCell>
                                <Table.HeaderCell>Client Ref.</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                searchResults.length === 0 &&
                                <Table.Row>
                                    <Table.Cell>No results found.</Table.Cell>
                                </Table.Row>
                            }
                            {
                                searchResults.map(result =>
                                    <Table.Row key={result.Key_20} onDoubleClick={() => {this.handleResultDoubleClick(result)}}>
                                        <Table.Cell>{result.Key_20}</Table.Cell>
                                        <Table.Cell>{result.Key_30T}</Table.Cell>
                                        <Table.Cell>{result.Key_82A}</Table.Cell>
                                        <Table.Cell>{result.Key_87A}</Table.Cell>
                                        <Table.Cell>{result.clientRef}</Table.Cell>
                                        { <StatusCell status={result.status} /> }
                                    </Table.Row>
                                )
                            }
                        </Table.Body>
                    </Table>
                </Segment>
            </Container>
        );
    }
}

export default Search;
