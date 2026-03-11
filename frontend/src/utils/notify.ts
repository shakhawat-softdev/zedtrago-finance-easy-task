import Swal from "sweetalert2";

const toastConfig = {
  toast: true,
  position: "top-end" as const,
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
};

export function toastSuccess(message: string): void {
  void Swal.fire({
    ...toastConfig,
    icon: "success",
    title: message,
  });
}

export function toastError(message: string): void {
  void Swal.fire({
    ...toastConfig,
    icon: "error",
    title: message,
  });
}

export function toastWarning(message: string): void {
  void Swal.fire({
    ...toastConfig,
    icon: "warning",
    title: message,
  });
}

export async function confirmDelete(itemLabel = "this item"): Promise<boolean> {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: `You are about to delete ${itemLabel}.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#0e7490",
    confirmButtonText: "Yes, delete",
    cancelButtonText: "Cancel",
  });

  return result.isConfirmed;
}
