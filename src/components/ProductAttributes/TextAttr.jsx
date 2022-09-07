import React from 'react';
import { findObjectValues } from '../../functions/findObjectValues';

class TextAttr extends React.Component {
     constructor() {
          super();
          this.type = 'text';
         
     }

     state = {
          activeValueId: "" 
     }

     componentDidMount() {
          if (this.props.selectedAttributes) {
               this.props.selectedAttributes.map(el => {
                    const elId = findObjectValues(el, 'id')
                    const valueId = findObjectValues(el, 'valueId');
                    if (elId === this.props.id) {
                         return this.chooseValue(valueId)
                    }
               })
          }
     }

     chooseValue = (id) => {
          this.setState({activeValueId: id})
     }

     render() {
          const {id, name, items, getAttributes, layoutSize } = this.props;
          return (
               <div className='textAttr' id={id}>
                    <p className={`textAttr__title--${layoutSize}`}>{name.toUpperCase()}:</p>
                    <ul>{items.map(el => {
                         const value = findObjectValues(el, 'value');
                         const valueId = findObjectValues(el, 'id');
                         const displayValue = findObjectValues(el, 'displayValue');

                         return <li key={valueId} className={this.state.activeValueId === valueId ? `textAttr--activeLi textAttr__item--${layoutSize}` : `textAttr__item--${layoutSize}`} onClick={() => {
                              getAttributes({id: id, name: name, type: this.type, items: {value: value, valueId: valueId, displayValue: displayValue}})
                              this.chooseValue(valueId);
                         }}><span className={this.state.activeValueId === valueId ? 'textAttr--activeSpan' : ""}>{value}</span></li>;
                    }
                    )}</ul>

               </div>
          )
     }
}

export {TextAttr};