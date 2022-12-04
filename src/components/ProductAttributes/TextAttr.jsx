import React from "react";

class TextAttr extends React.PureComponent {
     constructor() {
          super();
          this.type = "text";

     }

     state = {
          activeValueId: ""
     }

     componentDidMount() {
          const { chooseValue } = this;
          const { selectedAttributes, id } = this.props;

          if (selectedAttributes) {
               selectedAttributes.forEach(el => {
                    if (el.id === id) {
                         chooseValue(el.items.id);
                    }
               })
          }
     }

     chooseValue = (id) => {
          this.setState({ activeValueId: id })
     }

     render() {
          const { id, name, items, getAttributes, layoutSize, isDisabled = false, productId } = this.props;
          const { activeValueId } = this.state;
          const { chooseValue } = this;

          return (
               <div className="textAttr" id={id}>
                    <p className={`textAttr__title--${layoutSize}`}>{name.toUpperCase()}:</p>
                    <ul>{items.map(el => {

                         if (isDisabled) {
                              return (
                                   <li key={`${productId}-${name}-${el.displayValue}`} style={{ cursor: "auto" }} className={this.state.activeValueId === el.id ? `textAttr--activeLi textAttr__item--${layoutSize}` : `textAttr__item--${layoutSize}`} disabled><span className={activeValueId === el.id ? "textAttr--activeSpan" : ""}>{el.value}</span></li>
                              )
                         } else {
                              return (
                                   <li key={`${productId}-${name}-${el.displayValue}`} className={activeValueId === el.id ? `textAttr--activeLi textAttr__item--${layoutSize}` : `textAttr__item--${layoutSize}`} onClick={() => {
                                        getAttributes({ id: id, name: name, type: this.type, items: { value: el.value, id: el.id, displayValue: el.displayValue } })
                                        chooseValue(el.id);
                                   }}><span className={activeValueId === el.id ? "textAttr--activeSpan" : ""}>{el.value}</span></li>
                              );
                         }
                    }
                    )}</ul>

               </div>
          )
     }
}

export { TextAttr };