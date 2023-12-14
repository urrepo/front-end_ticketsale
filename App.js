import logo from './logo.svg';
import './App.css';
import React, { memo } from 'react';
import web3 from './web3';
import ticketsale from './ticketsale';
/*function App(){
  console.log(web3.version);
  web3.eth.getAccounts().then(console.log);
  //web3.eth.getAccounts().then((accounts)=>{
 //console.log(accounts[0]);
};*/
class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      ticketId: '',
      searchaddress: '',
      message: '',
      message2: '',
      message3: '',
      message4: '',
      message5: ''
    }
    this.onButtonEnter = this.onButtonEnter.bind(this);
    this.handlesubmit1 = this.handlesubmit1.bind(this);
    this.onButtonEnter2 = this.onButtonEnter2.bind(this);
    this.handlesubmit2 = this.handlesubmit2.bind(this);
    this.onButtonEnter3 = this.onButtonEnter3.bind(this);
    this.handlesubmit3 =  this.handlesubmit3.bind(this);
    this.onButtonEnter4 = this.onButtonEnter4.bind(this);
    this.handlesubmit4 =  this.handlesubmit4.bind(this);
    this.onButtonEnter5 = this.onButtonEnter5.bind(this);
    this.handlesubmit5 = this.handlesubmit5.bind(this);
  }
  onButtonEnter(event){
    this.setState({ticketId: event.target.value});
  }
  onButtonEnter2=  async(event)=>{
    this.setState({searchaddress: event.target.value});
  }
  onButtonEnter3(event){
    this.setState({ticketId: event.target.value});
  }
  onButtonEnter4(event){
    this.setState({ticketId: event.target.value});
  }
  onButtonEnter5(event){
    this.setState({ticketId: event.target.value});
  }
  handlesubmit1  = async(event)=>{
    event.preventDefault();
    
    const accoutns = await web3.eth.getAccounts();
    try {
      await ticketsale.methods.buyTicket(this.state.ticketId).send({from:accoutns[0]});
    alert('you have bought ticket')
    } catch (error) {
      alert("transaction failed. please make sure you or someone hasn't already purchase the ticket")
    }
    
  }
  handlesubmit2  = async(event)=>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    const ticketId = await ticketsale.methods.getTicketOf(this.state.searchaddress).call();
    alert(`this person has ${ticketId}`)
  }
  handlesubmit3  = async(event)=>{
    event.preventDefault();
    const accounts =  await web3.eth.getAccounts();
    try {
      await ticketsale.methods.offerSwap(this.state.ticketId).send({from: accounts[0]});
    alert('you have offered ticket')
    } catch (error) {
      alert('offer swap transaction has failed')
    }
    
  }
  handlesubmit4  = async(event)=>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    try {
      await ticketsale.methods.offerSwap(this.state.ticketId).send({from: accounts[0]});
    alert('you have accept ticket')
    } catch (error) {
      alert("accter swap transaction has failed")
    }
    
  }
  handlesubmit5  = async(event)=>{
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await ticketsale.methods.returnTicket(this.state.ticketId).send({from: accounts[0]});alert('you have return ticket')
  }

  render() {
    return (
      <div>
        <h1 id='topTitla'>Ticket Shop</h1>
        <form onSubmit={this.handlesubmit1}>
          <input
            id='buyTicketEntry'
            placeholder='Enter Ticket Id'
            onChange={this.onButtonEnter
            }
          />
          <button id='buyTicket'>
            buy Ticket
          </button>
        </form>
        <form onSubmit={this.handlesubmit2}>
          <input
            id='getTicketEntry'
            placeholder='Enter Address'
            onChange={this.onButtonEnter2}
          />
          <button id='getTicket'>
            Get Ticket Status
          </button>
        </form>
        <form onSubmit={this.handlesubmit3}>
          <input
            id='offerTicketEntry'
            placeholder='Enter Ticket Id'
            onChange={this.onButtonEnter3
            }
          />
          <button id='offerTicket'>
            Offer Ticket
          </button>
        </form>
        <form onSubmit={this.handlesubmit4}>
          <input
            id='acceptTicketEntry'
            placeholder='Enter Ticket Id'
            onChange={this.onButtonEnter4
            }
          />
          <button id='acceptTicket'>
            Accept Ticket
          </button>
        </form>
        <form onSubmit={this.handlesubmit5}>
          <input
            id='returnTicketEntry'
            placeholder='Enter Ticket Id'
            onChange={this.onButtonEnter5
            }
          />
          <button id='returnTicket'>
            Return Ticket
          </button>
        </form>
      </div>
    );
  }
}

export default App;
