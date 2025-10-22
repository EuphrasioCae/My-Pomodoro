interface Props{
    text: string;
    onClick?: () => void;
    className?: string;
}

export function Btn(props: Props): JSX.Element{
    return(
        <button onClick={props.onClick} className={props.className}>
            {props.text}
        </button>
    )
}