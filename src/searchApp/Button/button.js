import React from "react";
import PropTypes from "prop-types";

const Button = ({onClick, className = '', children}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>


const Loading = () =>
  <div>Loading...</div>

// HOC 高阶组件
// function withFoo() {
//   return function (props) {
//     return <Component { ...props}/>
//   }
// }

const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loading/> : <Component {...rest}/>

const ButtonWithLoading = withLoading(Button)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

export {Button, ButtonWithLoading}
