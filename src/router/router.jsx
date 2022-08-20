import { Routes, Route, Navigate } from 'react-router-dom';

function Router() {
     return (
          <Routes>
               <Route exact path='./' element={
                    <Navigate to='/All' />
               } />
          </Routes>
     )
}

export default Router;