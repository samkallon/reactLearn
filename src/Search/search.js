import React, {Component} from "react";

// const Search = ({value, children,onSubmit,onChange}) =>
//   <form onSubmit={onSubmit}>
//     {children}
//     <input
//       type="text"
//       value={value}
//       onChange={onChange}
//     />
//     <button type="submit">搜索</button>
//   </form>

export class Search extends Component {
  componentDidMount() {
    if (this.input) {
      this.input.focus()
    }
  }

  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props
    return (
      <form onSubmit={onSubmit}>
        {children}
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={(node) => {
            this.input = node
          }}
        />
        <button type="submit">搜索</button>
      </form>
    );
  }
}
