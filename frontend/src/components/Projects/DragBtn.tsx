import React from "react";
import "./DragBtn.css";

interface DragBtnProps {
  dragging: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  variant?: "light" | "dark";
}

const DragBtn = React.forwardRef<HTMLDivElement, DragBtnProps>(
  ({ dragging, onMouseDown, variant = "light" }, ref) => (
    <div
      ref={ref}
      className={`pms-drag-btn ${dragging ? "pms-dragging" : ""} ${
        variant === "dark" ? "pms-drag-btn--dark" : ""
      }`}
      onMouseDown={onMouseDown}
    >
      <span
        className="pms-drag-outline pms-drag-outline-1"
        aria-hidden="true"
      ></span>
      <span
        className="pms-drag-outline pms-drag-outline-2"
        aria-hidden="true"
      ></span>
      <span className="pms-drag-label">DRAG</span>
    </div>
  )
);

DragBtn.displayName = "DragBtn";

export default DragBtn;


