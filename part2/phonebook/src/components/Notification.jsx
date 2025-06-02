const Notification = ({ message, type }) => {
  const style = {
    background: 'lightgrey',
    fontSize: '40',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    style.background = 'white';
    style.borderStyle = 'none';
    return null;
  }
  switch (type) {
    case 'success':
      style.color = 'green';
      break;
    case 'update':
      style.color = 'blue';
      break;
    case 'error':
      style.color = 'red';
      break;
    default:
  }
  return <div style={style}>{message}</div>;
};

export default Notification;
