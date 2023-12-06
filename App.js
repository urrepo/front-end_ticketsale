import logo from './logo.svg';
import './App.css';
import React from 'react';
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
      ticketId: 0,
      searchaddress: '',
      message: ''
    }
    this.onButtonEnter = this.onButtonEnter.bind(this);
    this.onButtonEnter2 = this.onButtonEnter2.bind(this);
    this.onButtonEnter3 = this.onButtonEnter3.bind(this);
    this.onButtonEnter4 = this.onButtonEnter4.bind(this);
    this.onButtonEnter5 = this.onButtonEnter5.bind(this);
  }

  onButtonEnter= async (event) =>{
    const accounts = await web3.eth.getAccounts();
    event.preventDefault();
    try{
        const ticketId = parseInt(this.state.ticketId)
        await ticketsale.methods.buyTicket(ticketId).send({
      from: accounts[0], gasPrice: 8000000000, gas: 4700000
    });
    this.setState({message: 'transaction success'});
    
  }catch(error){
    this.setState({message: 'transaction failed'});
  }
  };
  onButtonEnter2= async(event)=>{
    const accounts = await web3.eth.getAccounts();
    this.setState({

      searchaddress: event.target.value});
    await ticketsale.methods.getTicketOf(this.state.searchaddress).send({
      from: accounts[0], gasPrice: 8000000000, gas: 4700000
    });
    
  };
  onButtonEnter3= async(event)=>{
    const accounts = await web3.eth.getAccounts();
    this.setState({

       ticketId: event.target.value});
    await ticketsale.methods.offerSwap(this.state.ticketId).send({
      from: accounts[0], gasPrice: 8000000000, gas: 4700000
    });
  };
  
  onButtonEnter4= async(event)=>{
    const accounts = await web3.eth.getAccounts();
    this.setState({

      ticketId: event.target.value});
    await ticketsale.methods.acceptSwap(this.state.ticketId).send({
      from: accounts[0], gasPrice: 8000000000, gas: 4700000
    });
  };

  onButtonEnter5= async(event)=>{
    const accounts = await web3.eth.getAccounts();
    this.setState({

      ticketId: event.target.value});
    await ticketsale.methods.returnTicket(this.state.ticketId). send({
      from: accounts[0], gasPrice: 8000000000, gas: 4700000
    });
  }
  render() {
    console.log(this.state.message)
    return (
      <div>
        <h1 id='topTitla'>Ticket Shop</h1>
        <form>
          <input
            id='buyTicketEntry'
            placeholder='Enter Ticket Id'
            onChange={(myevent) =>
              this.setState({ ticketId: myevent.target.value })
            }
          />
          <button id='buyTicket' onClick={this.onButtonEnter}>
            buy Ticket
          </button>
        </form>
        <h2 id='notify'>{this.state.message}</h2>
        <form>
          <input
            id='getTicketEntry'
            placeholder='Enter Address'
            onChange={(myevent) =>
              this.setState({ searchaddress: myevent.target.value })
            }
          />
          <button id='getTicket' onClick={this.onButtonEnter2}>
            Get Ticket Status
          </button>
        </form>
        <form>
          <input
            id='offerTicketEntry'
            placeholder='Enter Ticket Id'
            onChange={(myevent) =>
              this.setState({ ticketId: myevent.target.value })
            }
          />
          <button id='offerTicket' onClick={this.onButtonEnter3}>
            Offer Ticket
          </button>
        </form>
        <form>
          <input
            id='acceptTicketEntry'
            placeholder='Enter Ticket Id'
            onChange={(myevent) =>
              this.setState({ ticketId: myevent.target.value })
            }
          />
          <button id='acceptTicket' onClick={this.onButtonEnter4}>
            Accept Ticket
          </button>
        </form>
        <form>
          <input
            id='returnTicketEntry'
            placeholder='Enter Ticket Id'
            onChange={(myevent) =>
              this.setState({ ticketId: myevent.target.value })
            }
          />
          <button id='returnTicket' onClick={this.onButtonEnter5}>
            Return Ticket
          </button>
        </form>
      </div>
    );
  }
}

export default App;
