import Popup from "../Popup/Popup";

function SuccessPopup(props) {
  return (
    <Popup
      name="successPopup"
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Пользователь успешно зарегистрирован!"
    >
      <button onClick={props.onClick} className="popup__redirect-button">Войти</button>
    </Popup>
  );
}

export default SuccessPopup;
