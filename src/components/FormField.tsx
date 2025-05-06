import style from "../styles/UserForm.module.css"
import Image from "next/image";

type Option = {
    value: string;
    label: string;
};

type Props = {
    label: string;
    name: string;
    type?: string;
    // onChange?: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
    options?: Option[]
  };


export default function FormField({label, name, type, options=[]}: Props){
    return(
        <div className={style.inputField}>
            <label htmlFor={name}>{label}</label>
            {type=='select' ? (
                <div className={style.selectWrapper}>
                    <select name={name} className={`${style.input} ${style.select}`}>
                        <option value="" hidden >Choose a role</option>
                        {options.map( (ops) => (
                            <option key={ops.value} value={ops.value}>
                                {ops.label}
                            </option>
                        ))}
                    </select>
                    <Image 
                     src="/arrow-bottom.png"
                     alt="back arrox"
                     width={16}
                     height={16}
                    />
                </div>
            ) : (
                <div className={style.inputWrapper}>
                    <input
                    type={type}
                    id={name}
                    name={name}
                    placeholder={label}
                    className={style.input}
                    />
                    {type === 'password' && (
                        <Image 
                        src="/fi-ss-eye.png"
                        alt="back arrox"
                        width={18}
                        height={18}
                        className={style.eye}
                       />
                    )}
              </div>
            )}
       </div>
    )
}