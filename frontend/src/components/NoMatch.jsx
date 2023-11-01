import { Link } from 'react-router-dom';
import NotFound from '../assets/not_found.jpeg';

const NoMatch = () => {
  return (
    <div className='w-100 h-100 position-relative'>
      <img
        src={NotFound}
        alt='Not_Found'
        className='object-fit-cover w-100 h-100'
      />

      <Link
        type='button'
        className='btn btn-dark position-absolute start-50 translate-middle'
        style={{ top: '75%' }}
        to='/'
      >
        Go to the home page
      </Link>
    </div>
  );
};

export default NoMatch;
