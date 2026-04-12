const MODAL_LOCK_COUNT_ATTR = "data-modal-lock-count";
const MODAL_LOCK_CHANGE_EVENT = "modal-lock-change";

function getLockCount(): number {
  if (typeof document === "undefined") return 0;
  const raw = document.body.getAttribute(MODAL_LOCK_COUNT_ATTR);
  const count = raw ? Number.parseInt(raw, 10) : 0;
  return Number.isFinite(count) && count > 0 ? count : 0;
}

function setLockCount(count: number) {
  if (typeof document === "undefined") return;

  if (count <= 0) {
    document.body.removeAttribute(MODAL_LOCK_COUNT_ATTR);
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  } else {
    document.body.setAttribute(MODAL_LOCK_COUNT_ATTR, String(count));
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px";
  }

  window.dispatchEvent(
    new CustomEvent(MODAL_LOCK_CHANGE_EVENT, {
      detail: { count: Math.max(0, count) },
    }),
  );
}

export function lockModalScroll() {
  setLockCount(getLockCount() + 1);
}

export function unlockModalScroll() {
  setLockCount(getLockCount() - 1);
}

export const modalLockEventName = MODAL_LOCK_CHANGE_EVENT;
