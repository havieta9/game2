import React, { Component } from "react";
import Web3 from "web3";
import { ButtonGroup, Button } from "react-bootstrap";
import "./app.css";
import Token from "../abis/Token.json";
import hatch from "../hatch.png";

class App extends Component {
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.Web3.currentProvider);
    } else {
      window.alert("Non-Ethereum browser detected");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    // Load the contract
    const networkId = await web3.eth.net.getId();
    const networkData = Token.networks[networkId];
    if (networkData) {
      const address = networkData.address;
      const abi = Token.abi;
      const token = new web3.eth.Contract(abi, address);
      this.setState({ token });
      console.log(token);
      const totalSupply = await token.methods.getTotalSupply().call();
      this.setState({ totalSupply });
    } else {
      window.alert("The Contract is not deployed to the network.");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      account: "0x0",
      token: {},
      totalSupply: null,
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={hatch}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            &nbsp; CryptoMon
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-muted">
                <span id="account">{this.state.account}</span>
              </small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1 className="d-4">Welcome to the Monster Farm!</h1>
                <div className="row">
                  <div id="menu" className="col-md-3 d-flex">
                    <ButtonGroup vertical>
                      <Button>Hatchery</Button>
                      <Button>Nursery</Button>
                      <Button>Battle Ring</Button>
                      <Button>Item Shop</Button>
                    </ButtonGroup>
                  </div>
                  <div id="screen" className="col-md-9 d-flex">
                    {/** Hatchery */}
                    {/** Nursery */}
                    {/** The Ring */}
                    {/** Item shop */}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
