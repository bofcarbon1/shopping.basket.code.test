import React from 'react';
import '../styles/bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import '../styles/grid.css';
import { formatMoney } from '../formatters/Currency2';
import { round_tax } from '../calculators/RoundTax';
import { BasketReceipt } from  '../shop/BasketReceipt';
import { arrBaskets } from '../data/data';

let doReceipt = false;
let selectedBasket = 0;
let basketName = "";
let basketTotal = 0;

interface IProps {
  basketSalesTax?: number;
  basketSelected?: number;
  basketTotal?: number;
}

interface IState {
    basketSelected?: number;
    doReceipt?: boolean;
    basketSalesTax?: number;
    basketImportTax?: number;
    basketSubTotal?: number;
    basketTotal?: number;  
}

export class BasketPurchase extends React.Component<IProps, IState> {                           
  
    constructor(props: IProps) {
        super(props);
        this.state = {
            basketSelected: props.basketSelected,
            doReceipt: false,
            basketSalesTax: 0,
            basketImportTax: 0,
            basketSubTotal: 0,
            basketTotal: 0
          }   
    }

    UNSAFE_componentWillReceiveProps(props: IProps) {
      this.setState({ basketSelected: props.basketSelected}); 
      if (props.basketSelected === undefined) {
        this.prepareBasket(0);
      } else{
        this.prepareBasket(props.basketSelected);
      }     
    } 

    //Proposed replacement for 'componentWillReceiveProps'
    //Note that calling a user function is not allowed 
    //Some alternative option must be coupled to start the user function

    //static getDerivedStateFromProps(props: IProps, state: IState) {
    //  if (props.basketSelected !== state.basketSelected) {
    //    return { basketSelected: props.basketSelected }
    //  }      
    //}
    
    prepareBasket(basketIndex = 0) {
      doReceipt = false;
      selectedBasket = basketIndex;
      this.setState( {
        basketSelected: basketIndex
      });    
      let sumSalesTax = 0;
      let sumSubTotal = 0;    
     
      arrBaskets[basketIndex].forEach(item => {
        basketName = item.b; 
        sumSubTotal = sumSubTotal + item.price;
        if (item.st === true) {
          let salesTax = round_tax(item.price * .10, .05);       
          sumSalesTax = sumSalesTax + salesTax;
          sumSubTotal = sumSubTotal + salesTax;   
        }
        if (item.it === true) {
          let importTax = round_tax(item.price * .05, .05);
          sumSalesTax = sumSalesTax + importTax;
          sumSubTotal = sumSubTotal + importTax;
        }
        this.sum_sales_tax(sumSalesTax);
        this.sum_sub_total(sumSubTotal); 
      });      
    }

    sum_sales_tax(sumSalesTax = 0.0) {
        this.setState( {
          basketSalesTax: sumSalesTax
        });    
    } 

    sum_sub_total(amount = 0.0) {    
      this.setState( {
          basketTotal: amount
      });  
      basketTotal = amount;  
    } 

    prepareReceipt() {
      doReceipt = true;
      this.setState( {
        doReceipt: true
      });
    }

    render() {
        return (
          <>
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
                let salesTax = round_tax(item.price * .10, .05);
                adjustedPrice = (adjustedPrice + salesTax);                                                            
              }
              if (item.it === true) {
                let importTax = round_tax(item.price * .05, .05);
                adjustedPrice = (adjustedPrice + importTax);
              } 
              return (
                <tr key={item.item}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>                        
                  <td>{formatMoney(adjustedPrice)}</td>                        
             </tr>
              )                
          })               
          }                 
            <tr>
              <td></td>
              <td>Tax:</td><td>{formatMoney(this.state.basketSalesTax)}</td>
            </tr>                 
            <tr>
              <td></td>
              <td>Total:</td><td>{formatMoney(basketTotal)}</td>
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
          <BasketReceipt doReceipt={doReceipt} basketName={basketName}
           basketTotal={basketTotal}>
          </BasketReceipt> 
          </>
        );
    }

}