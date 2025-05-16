import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const showPasswordError = (text: string) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    width:400
  });
  Toast.fire({
    icon: "error",
    title: text,
  });
};

export { showPasswordError };
