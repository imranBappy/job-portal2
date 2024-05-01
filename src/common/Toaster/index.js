import { toast } from 'react-toastify';
const Toaster = (props) => {
  const option = {
    position: 'bottom-left',
    duration: 4000,
  }
  if (props.type) return toast[props.type](props.message, option)
  return toast(props.message, option)
}

export default Toaster