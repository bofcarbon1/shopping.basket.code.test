import React from 'react';
import './styles/bootstrap/dist/css/bootstrap.css';
import './styles/App.css';
import './styles/grid.css';
import { BasketList } from './shop/BasketList';

interface IProps {
  basketSelected?: number;
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
      basketSelected: props.basketSelected
    }     
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
                <BasketList></BasketList>                        
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
