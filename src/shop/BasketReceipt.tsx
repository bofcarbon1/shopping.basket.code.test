import React from 'react';
import '../styles/bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import '../styles/grid.css';
import { formatMoney } from '../formatters/Currency2';

interface IProps {
  doReceipt?: boolean;
  basketName?: string;
  basketTotal?: number;
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

let doReceipt = false;
let printReceipt = false;  
let basketName = ""; 
let basketTotal = 0;

export class BasketReceipt extends React.Component<IProps, IState> {                           
  
    constructor(props: IProps) {
        super(props); 
        this.state = {
            basketSelected: 0,
            doReceipt: props.doReceipt,
            printReceipt: false,
            basketSalesTax: 0,
            basketImportTax: 0,
            basketSubTotal: 0,
            basketTotal: 0
          }  
    }

    UNSAFE_componentWillReceiveProps(props: IProps) {
      this.setState({ doReceipt: props.doReceipt}); 
      this.prepareReceipt(props.doReceipt, props.basketName, props.basketTotal);         
    } 

    prepareReceipt(isReceipt = false, name = "", total = 0) {
      doReceipt = isReceipt;      
      basketName = name;
      basketTotal = total;
    }

    printReceipt() {
        printReceipt = true;
        this.setState( {
            printReceipt: true
        });
    }

    render() {
        return (
            <div className="col-3">                  
            {doReceipt.valueOf() === true && 
             <div>
               <h4>Basket Receipt</h4>
               <p>Thanks for your purchase.</p>
               <table className="table">
                 <tbody>
                 <tr>
                   <td>Order: TASC002948397</td>
                 </tr>
                 <tr>
                   <td>Item: {basketName}</td>
                 </tr>
                 <tr>
                   <td>Total Cost: {formatMoney(basketTotal)}</td>
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
                 </tbody> 
               </table>
             </div>
            }                             
            </div>            
        );
    }

}    