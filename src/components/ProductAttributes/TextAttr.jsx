import React from 'react';
import { findObjectValues } from '../../functions/findObjectValues';

class TextAttr extends React.Component {
     constructor() {
          super();
          this.type = 'text';
         
     }

     render() {

          const {id, name, items} = this.props;
          return (
               <div className='textAttr' id={id}>
                    <p>{name.toUpperCase()}:</p>
                    <ul>{items.map(el => {
                         const value = findObjectValues(el, 'value');
                         const id = findObjectValues(el, 'id');

                         return <li key={id}><span>{value}</span></li>;
                    }
                    )}</ul>

               </div>
          )
     }
}

export default TextAttr;