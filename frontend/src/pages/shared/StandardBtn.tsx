import { useMemo, type ElementType } from "react";

import styles from "./StandardBtn.module.css";

interface StandardBtnProps {
   text: string;
   onClick: (() => void) | (() => Promise<void>);
   LeftIcon?: ElementType;
   RightIcon?: ElementType;
   disabled?: boolean;
   filled?: boolean;
   styleType?: "danger" | "warning" | "success" | "grey";
}

export default function StandardBtn({
   text,
   onClick,
   LeftIcon,
   RightIcon,
   disabled = false,
   filled = true,
   styleType,
}: StandardBtnProps) {
   // memoized values
   const btnClassName = useMemo(() => {
      const baseClasses = [styles.btn];

      if (disabled) {
         baseClasses.push(styles.disabled);
      }

      if (filled) {
         switch (styleType) {
            case "danger":
               baseClasses.push(styles.filledDanger);
               break;
            case "warning":
               baseClasses.push(styles.filledWarning);
               break;
            case "success":
               baseClasses.push(styles.filledSuccess);
               break;
            case "grey":
               baseClasses.push(styles.filledGrey);
               break;
            default:
               baseClasses.push(styles.filled);
               break;
         }
      } else {
         switch (styleType) {
            case "danger":
               baseClasses.push(styles.danger);
               break;
            case "warning":
               baseClasses.push(styles.warning);
               break;
            case "success":
               baseClasses.push(styles.success);
               break;
            case "grey":
               baseClasses.push(styles.grey);
               break;
            default:
               baseClasses.push(styles.outlined);
               break;
         }
      }

      return baseClasses.join(" ");
   }, [disabled, filled, styleType]);

   return (
      <button className={btnClassName} onClick={onClick} disabled={disabled}>
         {LeftIcon ? <LeftIcon className={styles.icon} /> : null}
         <span className={styles.text}>{text}</span>
         {RightIcon ? <RightIcon className={styles.icon} /> : null}
      </button>
   );
}
