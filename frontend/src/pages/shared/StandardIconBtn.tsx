import { useMemo, type ElementType } from "react";
import styles from "./StandardIconBtn.module.css";

interface StandardIconBtnProps {
   Icon: ElementType;
   onClick: (() => void) | (() => Promise<void>);
   disabled?: boolean;
   styleType?: "danger" | "warning" | "success" | "grey" | "standard" | "info";
}

export default function StandardIconBtn({
   Icon,
   onClick,
   disabled = false,
   styleType,
}: StandardIconBtnProps) {
   // memoized values
   const btnClassName = useMemo(() => {
      const classNames = [styles.btn];

      if (disabled) {
         classNames.push(styles.disabled);
      }

      switch (styleType) {
         case "danger":
            classNames.push(styles.danger);
            break;
         case "warning":
            classNames.push(styles.warning);
            break;
         case "success":
            classNames.push(styles.success);
            break;
         case "grey":
            classNames.push(styles.grey);
            break;
         case "info":
            classNames.push(styles.info);
            break;
         default:
            classNames.push(styles.standard);
            break;
      }

      return classNames.join(" ");
   }, [disabled, styleType]);

   return (
      <button className={btnClassName} onClick={onClick} disabled={disabled}>
         <Icon />
      </button>
   );
}
