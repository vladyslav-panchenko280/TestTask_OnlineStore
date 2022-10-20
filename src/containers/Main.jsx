import React from 'react';
import BagWidget from '../components/BagWidget/BagWidget';
import UserContext from '../UserContext';

class Main extends React.PureComponent {
     static contextType = UserContext;

     render() {
          const { children } = this.props;
          const { openedBagWidget } = this.context;
          
          return (
               <main className='main'>
                    { openedBagWidget === true ? <BagWidget/ > : false }
                    {children}
               </main>
          )
     }
}

export default Main;