import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CiMenuBurger } from 'react-icons/ci';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle clicks outside the sidebar to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) && 
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
  ref={buttonRef}
  className="fixed top-2.5 left-6 focus:outline-none z-50 text-2xl text-white border rounded-lg p-2"
  onClick={() => setIsOpen(!isOpen)}
>
  <CiMenuBurger />
</button>

      
      <div
        ref={sidebarRef}
        className={`w-64 h-screen bg-gray-900 text-white p-6 flex flex-col shadow-lg fixed top-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        {/* <h2 className="text-xl font-bold text-center mb-6 tracking-wide">NAVIGATION</h2> */}
        <nav className='mt-12'>
          <ul className="space-y-3 ">
          <li>
              <Link
                to="/"
                className="flex items-center  justify-center py-3 px-5 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-all duration-200"
              >
                <span className="text-lg font-medium">Home </span>
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="flex items-center  justify-center py-3 px-5 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-all duration-200"
              >
                <span className="text-lg font-medium">Add Employee</span>
              </Link>
            </li>
            <li>
              <Link
                to="/read"
                className="flex items-center  justify-center py-3 px-5 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-all duration-200"
              >
                <span className="text-lg font-medium">View Employees</span>
              </Link>
            </li>
            <li>
              <Link
                to="/update"
                className="flex items-center  justify-center py-3 px-5 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-all duration-200"
              >
                <span className="text-lg font-medium">Update Employees</span>
              </Link>
            </li>
            <li>
              <Link
                to="/delete"
                className="flex items-center  justify-center py-3 px-5 rounded-lg hover:bg-gray-700 hover:text-amber-300 transition-all duration-200"
              >
                <span className="text-lg font-medium">Delete Employees</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default SideBar;
