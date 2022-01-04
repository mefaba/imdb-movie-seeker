import React from "react";

export const Navbar = () => {
  return (
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#1">
          Active
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#1">
          Link
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#1">
          Link
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#1" tabIndex={-1} aria-disabled="true">
          Disabled
        </a>
      </li>
    </ul>
  );
};
