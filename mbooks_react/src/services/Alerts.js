import Swal from "sweetalert2";

export const showMessage = (message, icon, position, timer, showConfirmButton, confirmButtonText='OK', showCancelButton=false) => {
    Swal.fire({
        position: position,
        icon: icon,
        title: message,
        showConfirmButton: showConfirmButton,
        timer: timer,
        confirmButtonText: confirmButtonText,
        showCancelButton: showCancelButton
      })
}
