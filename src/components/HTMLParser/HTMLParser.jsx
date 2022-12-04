import React from "react";

class HTMLParser extends React.PureComponent {
     constructor(props) {
          super(props);
          this.aRef = React.createRef();
     }

     componentDidMount() {
          this.aRef.current.innerHTML = this.props.data;
     }

     render() {
          const { className } = this.props;
          const { aRef } = this;

          return <div className={className} ref={aRef} />
     }
}

export { HTMLParser };