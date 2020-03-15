import React from 'react';
import '../styles/bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import '../styles/grid.css';
import { BasketPurchase } from '../shop/BasketPurchase';
import { formatMoney } from '../formatters/Currency2';
import { round_tax } from '../calculators/RoundTax';
import { arrBaskets } from '../data/data';

let selectedBasket = 0;

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

export class BasketList extends React.Component<IProps, IState> {                           
  
    constructor(props: IProps) {
      super(props); 
      this.state = {
        basketSelected: 0,
        basketSalesTax: 0,
        basketImportTax: 0,
        basketSubTotal: 0,
        basketTotal: 0
      }              
    }

    componentDidMount() {
        this.prepareBasket(0);
    }

    prepareBasket(basketIndex = 0) {  
    selectedBasket = basketIndex;
    this.setState( {
      basketSelected: basketIndex
    });        
    let sumSalesTax = 0;
    let sumSubTotal = 0;     
    arrBaskets[basketIndex].forEach(item => {
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
    }  

    render() {
        return (
            <>
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
                            <td>
                            <button onClick={(e) => 
                            this.prepareBasket(0)} 
                            type="button" className="btn btn-default btn-sm" >
                            <b>Basket 1:</b> <br/> 
                            {
                                arrBaskets[0].map(item  => {
                                    return (                        
                                    <span key={item.item}>{item.qty} ,                          
                                    {item.name} <br/> {formatMoney(item.price)}<br/></span>   
                                    )                 
                                })                   
                            }
                            </button>
                            </td>
                        </tr>                        
                        <tr>
                            <td>
                            <button onClick={(e) => 
                                this.prepareBasket(1)} 
                                type="button" className="btn btn-default btn-sm">
                                <b>Basket 2:</b> <br/> 
                                {
                                    arrBaskets[1].map(item  => {
                                        return (                        
                                        <span key={item.item}>{item.qty} ,                        
                                        {item.name} <br/> {formatMoney(item.price)}<br/></span>   
                                        )                 
                                    })                   
                                }                                
                            </button>
                            </td>
                        </tr>                        
                        <tr>
                            <td>
                            <button onClick={(e) => 
                                this.prepareBasket(2)} 
                                type="button" className="btn btn-default btn-sm">
                                <b>Basket 3:</b> <br/> 
                                {
                                    arrBaskets[2].map(item  => {
                                        return (                        
                                        <span key={item.item}>{item.qty} ,                        
                                        {item.name} <br/> {formatMoney(item.price)}<br/></span>   
                                        )                 
                                    })                   
                                }
                            </button>
                            </td>
                        </tr>
                    </tbody>
                </table>                
            </div> 
            <BasketPurchase basketSelected={selectedBasket}></BasketPurchase>
            </>
        );
    }
}