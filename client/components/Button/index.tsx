import { ButtonProps } from "../../interfaces/button";

export function Button({type,children, onClick, ...rest }: ButtonProps) {
  return (
    
    <button type={type} onClick={onClick}{...rest}  className="w-[106px] h-[40px] bg-[#27AE60] rounded-lg font-[Inter] text-[white] mt-[15px] ml-[20px]">
         {children}
    </button>
     
    
  );
}