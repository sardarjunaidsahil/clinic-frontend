import { useConfirmContext } from "../context/ConfirmContext";

export function useConfirm() {
  return useConfirmContext();
}

export default useConfirm;
