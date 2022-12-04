import React from "react";

class SwatchAttr extends React.PureComponent {

     constructor() {
          super();
          this.type = "swatch";
     }

     state = {
          activeValueId: ""
     }

     componentDidMount() {
          const { selectedAttributes, id } = this.props;

          if (selectedAttributes) {
               selectedAttributes.forEach(el => {
                    if (el.id === id) {
                         this.chooseValue(el.items.id)
                    }
               })
          }
     }

     chooseValue = (id) => {
          this.setState({ activeValueId: id })
     }

     render() {
          const { name, items, getAttributes, id, layoutSize, isDisabled = false } = this.props;

          return (
               <div className="swatchAttr" id={id}>
                    <p className={`swatchAttr__title--${layoutSize}`}>{name.toUpperCase()}:</p>
                    <ul>{items.map(el => {

                         return isDisabled ? <li disabled key={el.id} className={this.state.activeValueId === el.id ? `swatchAttr--active swatchAttr__item--${layoutSize}` : `swatchAttr__item--${layoutSize}`} style={{ backgroundColor: el.value, cursor: "auto" }}></li> : <li key={el.id} className={this.state.activeValueId === el.id ? `swatchAttr--active swatchAttr__item--${layoutSize}` : `swatchAttr__item--${layoutSize}`} style={{ backgroundColor: el.value }} onClick={() => {
                              getAttributes({ id: id, name: name, type: this.type, items: { value: el.value, id: el.id, displayValue: el.displayValue } })
                              this.chooseValue(el.id);
                         }}></li>;
                    }
                    )}</ul>

               </div>
          )
     }
}

export { SwatchAttr };