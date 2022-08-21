import React from "react";

const UserContext = React.createContext();

class UserProvider extends React.Component {
     state = {
          currentCategory: "all",
          currentCurrency: "USD",
          productId: ""
     }

     setProductId = (id) => {
          this.setState({productId: id})
     }

     setCategory = (category) => {
          this.setState({ currentCategory: category });
     }

     setCurrency = (label) => {
          this.setState({ currentCurrency: label });
     }

     render() {
          const { children } = this.props;
          const { currentCategory, currentCurrency, productId } = this.state;
          const { setCategory, setCurrency, setProductId } = this;

          return (
               <UserContext.Provider value={{
                    currentCategory,
                    currentCurrency,
                    productId,
                    setProductId,
                    setCurrency,
                    setCategory
               }}>
                    {children}
               </UserContext.Provider>
          )
     }
}

export default UserContext;

export { UserProvider }