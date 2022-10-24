import React from "react";
import UserContext from "../../UserContext";
import { findObjectValues } from '../../functions/findObjectValues';
import { TextAttr } from '../ProductAttributes/TextAttr';
import { SwatchAttr } from '../ProductAttributes/SwatchAttr';

class AttributesComponent extends React.PureComponent {
     static contextType = UserContext;

     render() {
          const { selectedAttributes, layoutSize, attributes, isDisabled, className, getAttributes } = this.props
          return (
               <div className={className}>
                    {
                         attributes.map(el => {
                              const id = findObjectValues(el, 'id');
                              const type = findObjectValues(el, 'type');
                              const name = findObjectValues(el, 'name');
                              const items = findObjectValues(el, 'items');

                              switch (type) {
                                   case "text": {
                                        return <TextAttr key={id} id={id} name={name} items={items} getAttributes={getAttributes} selectedAttributes={selectedAttributes ? selectedAttributes : false} layoutSize={layoutSize} isDisabled={isDisabled} />
                                   }
                                   case "swatch": {
                                        return <SwatchAttr key={id} id={id} name={name} items={items} getAttributes={this.getAttributes} selectedAttributes={selectedAttributes ? selectedAttributes : false} layoutSize={layoutSize} isDisabled={isDisabled} />
                                   }
                                   default: {
                                        return false
                                   }
                              }
                         })
                    }
               </div>
          )
     }
}

export default AttributesComponent;