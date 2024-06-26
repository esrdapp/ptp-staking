/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
export default ({ onClose, children }) => (
  <div>
    <div className="overlay" onClick={onClose} />
    <div className="form-modal">{children}</div>

    <style jsx>{`
      .overlay {
        background-color: rgba(65, 65, 85, 0.58);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 110;
      }
      .form-modal {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 90%; /* Make width responsive */
        max-width: 538px; /* Ensure it doesn't get too wide on larger screens */
        background-color: white;
        box-shadow: 0 1px 27px 0 rgba(0, 0, 0, 0.19);
        border-radius: 3px;
        padding: 14px;
        z-index: 120;
      }
      .modal :global(h3) {
        text-align: center;
        margin: 10px 0;
      }

      /* Adjustments for smaller devices */
      @media (max-width: 600px) {
        .form-modal {
          width: 85%; /* Increase width percentage for very small devices */
          padding: 10px; /* Optionally adjust padding */
        }
      }
    `}</style>
  </div>
);
