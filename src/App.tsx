import React from 'react';
import './styles/bootstrap/dist/css/bootstrap.css';
import './styles/App.css';
import './styles/grid.css';
const nameBasket1 = "Shopping Basket 1";
const nameBasket2 = "Shopping Basket 2";
const nameBasket3 = "Shopping Basket 3";
const arrBasket1 = [
  {"item": 1, "b": "Shopping Basket 1", "qty":1, 
  "name": "16lb bag of Skittles", "price": 16.00, 
  "st": false, "it": false }, 
  {"item": 2, "b": "Shopping Basket 1", "qty":1,  
  "name": "Walkman", "price": 99.99, 
  "st": true, "it": false }, 
  {"item": 3, "b": "Shopping Basket 1", "qty":1,  
  "name": "bag of microwave Popcorn", "price": 0.99,
  "st": false, "it": false }];
const arrBasket2 = [
    {"item": 4, "b": "Shopping Basket 2", "qty":1, 
    "name": "imported bag of Vanilla-Hazelnut Coffee", "price": 11.00, 
    "st": false, "it": true },
    {"item": 5, "b": "Shopping Basket 2", "qty":1, 
    "name": "Imported Vespa ", "price": 15001.25, 
    "st": true, "it": true }];
const arrBasket3 = [ 
    {"item": 6, "b": "Shopping Basket 3", "qty":1, 
    "name": "imported crate of Almond Snickers", "price": 75.99, 
    "st": false, "it": true },
    {"item": 7, "b": "Shopping Basket 3", "qty":1, "name": "Discman", "price": 55.00, 
    "st": true, "it": false },
    {"item": 8, "b": "Shopping Basket 3", "qty":1, 
    "name": "Imported Bottle of Wine", "price": 10.00, 
    "st": true, "it": true },
    {"item": 9, "b": "Shopping Basket 3", "qty":1, 
    "name": "300# bag of Fair-Trade Coffee ", "price": 997.99, 
    "st": false, "it": false }];
const arrBasket4 = [ {"item": 10,  "b": "Shopping Basket 4", "qty":0, 
"name": "Select a basket please from the list", "price": 0.0, 
"st": false, "it": false }]
const baskets = [nameBasket1, nameBasket2, nameBasket3];
const arrBaskets = [arrBasket1, arrBasket2, arrBasket3, arrBasket4];
let selectedBasket = 3;
let doReceipt = false;
let printReceipt = false;

interface IProps {

}

interface IState {
  basketSelected?: number;
  doReceipt?: boolean;
  printReceipt?: boolean;
  basketSalesTax?: number;
  basketImportTax?: number;
  basketSubTotal?: number;
  basketTotal?: number;  
}

class App extends React.Component<IProps, IState> {                           
  
  constructor(props: IProps) {
    super(props);
    this.state = {
      basketSelected: 0,
      doReceipt: false,
      printReceipt: false,
      basketSalesTax: 0,
      basketImportTax: 0,
      basketSubTotal: 0,
      basketTotal: 0
    }    
  } 

  componentWillMount() {
    this.prepareBasket(selectedBasket);
  }
 
  prepareBasket(basketIndex = 0) {
    doReceipt = false;
    printReceipt = false;
    selectedBasket = basketIndex;
    this.setState( {
      basketSelected: basketIndex
    });    
    let sumSalesTax = 0;
    let sumSubTotal = 0;     
    arrBaskets[basketIndex].forEach(item => {
      sumSubTotal = sumSubTotal + item.price;
      if (item.st === true) {
        let salesTax = this.round_tax(item.price * .10, .05);       
        sumSalesTax = sumSalesTax + salesTax;
        sumSubTotal = sumSubTotal + salesTax;   
      }
      if (item.it === true) {
        let importTax = this.round_tax(item.price * .05, .05);
        sumSalesTax = sumSalesTax + importTax;
        sumSubTotal = sumSubTotal + importTax;
      }
      this.sum_sales_tax(sumSalesTax);
      this.sum_sub_total(sumSubTotal); 
    });      
  }

  round_tax(x = 0, precision = 0.0) {
    var y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
  }

  sum_sub_total(amount = 0.0) {    
    this.setState( {
      basketTotal: amount
    });    
  }

  sum_sales_tax(sumSalesTax = 0.0) {
    this.setState( {
      basketSalesTax: sumSalesTax
    });    
  }    

  formatMoney(number = 0) {
    return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  prepareReceipt() {
    doReceipt = true;
    this.setState( {
      doReceipt: true
    });
  }

  printReceipt() {
    printReceipt = true;
    this.setState( {
      printReceipt: true
    });
  }
  
  render() {
    return (
      <div className="App">
        <div className="grid-container">
          <div className="grid-item-header">
            <header className="grid-item-header">
              <h3>TASC Shopping Basket</h3>            
            </header>
          </div>
          <div className="grid-item-content">
            <main>
              <div className="row">
                <div className="col-4">           
                  <h4>Basket List</h4> 
                  <table className="table table-bordered ">
                    <thead>
                      <tr>                                            
                        <th>Item</th>
                      </tr>    
                    </thead>
                    <tbody>
                      <tr>
                        <button onClick={(e) => 
                          this.prepareBasket(0)} 
                          type="button" className="btn btn-default btn-sm">
                            <b>Basket 1:</b> <br/> 
                        {
                          arrBaskets[0].map(item  => {
                            return (                        
                          <span>{item.qty} ,                          
                           {item.name} <br/> {this.formatMoney(item.price)}<br/></span>   
                            )                 
                          })                   
                        }
                        </button>
                      </tr>
                      <br/>
                      <tr>
                        <button onClick={(e) => 
                          this.prepareBasket(1)} 
                          type="button" className="btn btn-default btn-sm">
                            <b>Basket 2:</b> <br/> 
                        {
                          arrBaskets[1].map(item  => {
                            return (                        
                          <span>{item.qty} ,                        
                           {item.name} <br/> {this.formatMoney(item.price)}<br/></span>   
                            )                 
                          })                   
                        }
                        </button>
                      </tr>
                      <br/>
                      <tr>
                        <button onClick={(e) => 
                          this.prepareBasket(2)} 
                          type="button" className="btn btn-default btn-sm">
                            <b>Basket 3:</b> <br/> 
                        {
                          arrBaskets[2].map(item  => {
                            return (                        
                          <span>{item.qty} ,                        
                           {item.name} <br/> {this.formatMoney(item.price)}<br/></span>   
                            )                 
                          })                   
                        }
                        </button>
                      </tr>
                    </tbody>
                  </table>                
                </div>
                <div className="col-5">
                  <h4>Basket Details</h4> 
                  <table className="table">
                    <thead>
                      <tr>                                             
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                      </tr>    
                    </thead>
                    <tbody>
                  {          
                                                           
                  arrBaskets[selectedBasket].map(item  => {
                    let adjustedPrice = item.price;                    
                    if (item.st === true) {
                      let salesTax = this.round_tax(item.price * .10, .05);
                      adjustedPrice = (adjustedPrice + salesTax);                                                            
                    }
                    if (item.it === true) {
                      let importTax = this.round_tax(item.price * .05, .05);
                      adjustedPrice = (adjustedPrice + importTax);
                    } 
                    return (
                      <tr key={item.item}>
                        <td>{item.name}</td>
                        <td>{item.qty}</td>                        
                        <td>{this.formatMoney(adjustedPrice)}</td>                        
                   </tr>
                    )                
                })               
                }                 
                  <tr>
                    <td></td>
                    <td>Tax:</td><td>{this.formatMoney(this.state.basketSalesTax)}</td>
                  </tr>                 
                  <tr>
                    <td></td>
                    <td>Total:</td><td>{this.formatMoney(this.state.basketTotal)}</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <button onClick={() => 
                      this.prepareReceipt()} 
                      type="button" className="btn btn-default">Purchase
                      </button>
                    </td>
                  </tr>
                 </tbody>
                  </table>
                </div>
                <div className="col-3">                  
                   {doReceipt.valueOf() === true && 
                    <div>
                      <h4>Basket Receipt</h4>
                      <p>Thanks for your purchase.</p>
                      <table className="table">
                        <tr>
                          <td>Order: TASC002948397</td>
                        </tr>
                        <tr>
                          <td>Item: {baskets[selectedBasket]}</td>
                        </tr>
                        <tr>
                          <td>Total Cost: {this.formatMoney(this.state.basketTotal)}</td>
                        </tr>
                        <tr>
                          <td>
                            <button onClick={() => 
                            this.printReceipt()} 
                            type="button" className="btn btn-default">Print
                            </button>
                          </td>
                        </tr>
                        {printReceipt.valueOf() === true &&
                          <tr>
                            <td>Just kidding we don't have a printer silly!</td>
                          </tr>             
                        } 
                      </table>
                    </div>
                   }                             
                                     
                </div>
              </div>   
            </main>
          </div>  
          <div className="grid-item-footer">
            <p>@shopping-basket 2020 Brian Quinn all rights reserved</p>
          </div> 
        </div>
      </div>
    );
  }
}
export default App;
