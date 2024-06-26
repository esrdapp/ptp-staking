/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
const Button = ({ children, style, onClick, disabled }) => (
  <button style={style} disabled={disabled} onClick={onClick}>
    {children}

    <style jsx>{`
      button {
        background-color: #eeebf5;
        border: none;
        border-radius: 22px;
        font-size: 16px;
        font-weight: 300;
        color: #6b6b8e;
        padding: 13px 28px;
        text-align: center;
        cursor: pointer;
      }
      button:focus {
        outline: none;
      }
      button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `}</style>
  </button>
);

export default Button;
