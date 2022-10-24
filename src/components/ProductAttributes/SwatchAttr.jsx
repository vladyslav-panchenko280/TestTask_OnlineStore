import React from 'react';
import { findObjectValues } from '../../functions/findObjectValues';

class SwatchAttr extends React.PureComponent {

     constructor() {
          super();
          this.type = 'swatch';
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
                         this.chooseValue(valueId)
                    }
               })
          }
     }

     chooseValue = (id) => {
          this.setState({ activeValueId: id })
     }

     render() {
          const { name, items, getAttributes, id, layoutSize, isDisabled=false } = this.props;
         
          return (
               <div className='swatchAttr' id={id}>
                    <p className={`swatchAttr__title--${layoutSize}`}>{name.toUpperCase()}:</p>
                    <ul>{items.map(el => {
                         const value = findObjectValues(el, 'value');
                         const valueId = findObjectValues(el, 'id');
                         const displayValue = findObjectValues(el, 'displayValue');

                         return isDisabled ? <li disabled key={valueId} className={this.state.activeValueId === valueId ? `swatchAttr--active swatchAttr__item--${layoutSize}` : `swatchAttr__item--${layoutSize}`} style={{ backgroundColor: value }}></li> : <li key={valueId} className={this.state.activeValueId === valueId ? `swatchAttr--active swatchAttr__item--${layoutSize}` : `swatchAttr__item--${layoutSize}`} style={{ backgroundColor: value }} onClick={() => {
                              getAttributes({ id: id, name: name, type: this.type, items: { value: value, valueId: valueId, displayValue: displayValue } })
                              this.chooseValue(valueId);
                         }}></li>;
                    }
                    )}</ul>

               </div>
          )
     }
}

export {SwatchAttr};