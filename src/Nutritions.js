export const Nutritions = ({label, quantity, unit}) => {
    return (<div>
        <p><b>{label}</b> - {quantity} {unit}</p>
    </div>
    )
}