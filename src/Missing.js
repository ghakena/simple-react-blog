import { Link } from 'react-router-dom';

const Missing = () => {
    return (
      <main className="Missing">
          <h2>Page Not Found</h2>
          <p>Oops! Better luck next time.</p>
          <p>
            <Link to='/'>Get back home here!</Link>
          </p>
      </main>
    )
}

export default Missing;
