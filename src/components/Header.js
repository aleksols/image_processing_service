import { Link } from "react-router-dom"


const Header = ({ onClick }) => {

  return (
    <div className="header">
      {/* Use Link instead of a and to instead of href in order to not refresh on click */}
      <a href='/cloud' className='headerLink' onClick={onClick}>Cloud Computing Services</a>

      <a href='/big-data' className='headerLink' onClick={onClick}>Big Data Visualization </a>

    </div>
  )
}

export default Header

