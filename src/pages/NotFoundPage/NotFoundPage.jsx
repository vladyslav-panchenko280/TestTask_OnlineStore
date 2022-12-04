import React from "react";
import UserContext from "../../UserContext";
import { Link } from "react-router-dom";

class NotFoundPage extends React.PureComponent {
     static contextType = UserContext;

     render() {
          const { pageNames, setCategory } = this.context;

          return (
               <section className="notFoundPage">
                    <div>
                         <h3>404</h3>
                         <p>Page not found</p>
                         <button><Link to={pageNames[0]} onClick={() => {
                              setCategory(pageNames[0]);
                         }}>Go to the home</Link></button>
                    </div>
               </section>
          )
     }
}

export default NotFoundPage;