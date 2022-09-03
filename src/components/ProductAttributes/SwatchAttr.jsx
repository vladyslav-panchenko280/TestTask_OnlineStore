import React from 'react';
import { findObjectValues } from '../../functions/findObjectValues';

class SwatchAttr extends React.Component {
     constructor() {
          super();
          this.type = 'swatch';
         
     }

     render() {
         
          const {name, items} = this.props;
          return (
               <div className='swatchAttr'>
                    <p>{name.toUpperCase()}:</p>
                    <ul>{items.map(el => {
                         const value = findObjectValues(el, 'value');
                         const id = findObjectValues(el, 'id');

                         return <li key={id} style={{backgroundColor: value}}></li>;
                    }
                    )}</ul>

               </div>
          )
     }
}

export default SwatchAttr;