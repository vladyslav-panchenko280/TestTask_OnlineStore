import React from "react";
import UserContext from "../../UserContext";
import { TextAttr } from "../ProductAttributes/TextAttr";
import { SwatchAttr } from "../ProductAttributes/SwatchAttr";

class AttributesComponent extends React.PureComponent {
     static contextType = UserContext;

     render() {
          const { selectedAttributes, layoutSize, attributes, isDisabled, className, getAttributes, productId } = this.props;

          return (
               <div className={className}>
                    {
                         attributes.map(el => {
                              const { id, type, name, items } = el;

                              switch (type) {
                                   case "text": {
                                        return <TextAttr key={`${productId}-${id}`} id={id} name={name} items={items} getAttributes={getAttributes} selectedAttributes={selectedAttributes ? selectedAttributes : false} layoutSize={layoutSize} isDisabled={isDisabled} productId={productId} />
                                   }
                                   case "swatch": {
                                        return <SwatchAttr key={`${productId}-${id}`} id={id} name={name} items={items} getAttributes={getAttributes} selectedAttributes={selectedAttributes ? selectedAttributes : false} layoutSize={layoutSize} isDisabled={isDisabled} productId={productId} />
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